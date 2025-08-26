import { ref, reactive, markRaw, nextTick } from "vue";
import type {
  PopupInstance,
  PopupOptions,
  PopupRegistry,
} from "../types/popup";

// 弹窗缓存
const popupCache = new Map<string, PopupInstance>();
// 弹窗注册表
const popupRegistry: PopupRegistry = {};
// 当前活跃的弹窗实例
const activePopups = reactive<PopupInstance[]>([]);

// 全局配置

export function bindDefaultEvents(popId: string) {
  return {
    "@close": function () {
      setTimeout(() => {
        hidePopup(popId);
      }, 300);
    },
  };
}
const globalConfig = reactive({
  destroyOnClose: true,
});

/**
 * 注册弹窗组件
 */
export const registerPopup = (
  id: string,
  component: any,
  defaultOptions?: Partial<PopupOptions>
) => {
  popupRegistry[id] = {
    component: markRaw(component),
    defaultOptions,
  };
};

/**
 * 批量注册弹窗组件
 */
export const registerPopups = (
  popups: Record<
    string,
    { component: any; defaultOptions?: Partial<PopupOptions> }
  >
) => {
  Object.entries(popups).forEach(([id, { component, defaultOptions }]) => {
    registerPopup(id, component, defaultOptions);
  });
};

/**
 * 创建弹窗实例
 */
const createPopupInstance = (
  id: string,
  options: Partial<PopupOptions> = {},
  props: Record<string, any> = {}
): PopupInstance => {
  const registry = popupRegistry[id];
  if (!registry) {
    throw new Error(`Popup with id "${id}" is not registered`);
  }

  const finalOptions: PopupOptions = {
    // 默认事件优先级最低（放最前，后续可覆盖）
    ...bindDefaultEvents(id),
    ...globalConfig,
    ...registry.defaultOptions,
    ...options,
    ...props,
  } as PopupOptions;

  const { on, props: cmpProps } = splitProps(finalOptions);

  return {
    id,
    component: registry.component,
    visible: false,
    options: finalOptions,
    props: cmpProps,
    on,
  } as PopupInstance;
};

export function isEvent(propName) {
  const rule = /^@/;
  return rule.test(propName);
}

// @click => click
export function eventNameTransition(name) {
  return name.replace("@", "");
}

// 拆分事件与属性
export function splitProps(cmpProps) {
  return Object.entries(cmpProps).reduce(
    (acc, [propName, propValue]) => {
      if (isEvent(propName)) {
        // 自定义事件（仅接受函数）
        if (typeof propValue === "function") {
          acc.on[eventNameTransition(propName)] = propValue;
        } else if (propValue != null) {
          console.warn(
            `[useGlobalPopup] Event prop "${propName}" expects a function, got ${typeof propValue}`
          );
        }
      } else {
        acc.props[propName] = propValue;
      }

      return acc;
    },
    { on: {}, props: {} }
  );
}

/**
 * 显示弹窗
 */
export const showPopup = async (
  id: string,
  options: Partial<PopupOptions> = {},
  props: Record<string, any> = {}
): Promise<any> => {
  return new Promise((resolve, reject) => {
    let instance = popupCache.get(id);

    // 若无实例，或旧实例在关闭时会销毁（不复用），则创建新实例
    if (!instance || instance.options?.destroyOnClose !== false) {
      instance = createPopupInstance(id, options, props);
      popupCache.set(id, instance);
    } else {
      // 复用实例：合并配置与属性，并允许调用方覆盖
      const registry = popupRegistry[id];
      const mergedOptions: PopupOptions = {
        ...bindDefaultEvents(id),
        ...globalConfig,
        ...registry?.defaultOptions,
        ...instance.options,
        ...options,
        ...props,
      } as PopupOptions;
      const { on, props: cmpProps } = splitProps(mergedOptions);
      instance.options = mergedOptions;
      instance.props = { ...instance.props, ...cmpProps };
      instance.on = { ...instance.on, ...on };
    }

    // 并发等待者收集（避免覆盖前一次的 resolve/reject）
    if (!instance.waiters) instance.waiters = [];
    instance.waiters.push({ resolve, reject });
    instance.resolve = resolve;
    instance.reject = reject;
    instance.visible = true;

    // 添加到活跃列表
    removeFromActiveList(id);
    activePopups.push(instance);
  });
};

/**
 * 隐藏弹窗
 */
export const hidePopup = (id: string, result?: any) => {
  const instance = popupCache.get(id);
  if (!instance) return;

  instance.visible = false;

  // 从活跃列表中移除
  // removeFromActiveList(id);

  // 解析 Promise：优先批量解析 waiters
  if (Array.isArray(instance.waiters) && instance.waiters.length > 0) {
    instance.waiters.forEach((w) => w.resolve(result));
    instance.waiters = [];
  } else if (instance.resolve) {
    instance.resolve(result);
  }

  // 销毁实例
  if (instance.options.destroyOnClose) {
    nextTick(() => {
      popupCache.delete(id);
    });
  }
};

/**
 * 关闭弹窗（带拒绝）
 */
export const closePopup = (id: string, reason?: any) => {
  const instance = popupCache.get(id);
  if (!instance) return;

  instance.visible = false;

  // 从活跃列表中移除
  removeFromActiveList(id);

  if (Array.isArray(instance.waiters) && instance.waiters.length > 0) {
    instance.waiters.forEach((w) => w.reject(reason));
    instance.waiters = [];
  } else if (instance.reject) {
    instance.reject(reason);
  }

  if (instance.options.destroyOnClose) {
    nextTick(() => {
      popupCache.delete(id);
    });
  }
};

/**
 * 从活跃列表中移除弹窗
 */
const removeFromActiveList = (id: string) => {
  const index = activePopups.findIndex((p) => p.id === id);
  if (index > -1) {
    activePopups.splice(index, 1);
  }
};

/**
 * 获取活跃弹窗
 */
export const getActivePopups = () => activePopups;

/**
 * 更新全局配置
 */
export const updateGlobalConfig = (config: Partial<typeof globalConfig>) => {
  Object.assign(globalConfig, config);
};

/**
 * 获取弹窗实例
 */
export const getPopupInstance = (id: string) => {
  return popupCache.get(id);
};

/**
 * 检查弹窗是否可见
 */
export const isPopupVisible = (id: string) => {
  const instance = popupCache.get(id);
  return instance?.visible || false;
};

/**
 * 取消注册并清理缓存
 */
export const unregisterPopup = (id: string) => {
  delete popupRegistry[id];
  const instance = popupCache.get(id);
  if (instance && !instance.visible) {
    popupCache.delete(id);
  }
};

/**
 * 清理缓存（可选条件）
 */
export const clearPopupCache = (predicate?: (p: PopupInstance) => boolean) => {
  Array.from(popupCache.entries()).forEach(([key, inst]) => {
    if (!inst.visible && (!predicate || predicate(inst))) {
      popupCache.delete(key);
    }
  });
};
