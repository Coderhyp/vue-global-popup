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

// 事件绑定
const bindPopupEvents = () => {};
// 全局配置

export function bindDefaultEvents(popId: string) {
  return {
    "@close": function () {
      console.log("bindDefaultEvents", popId);
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
    ...globalConfig,
    ...registry.defaultOptions,
    ...options,
    ...props,
    ...bindDefaultEvents(id),
  };

  return {
    id,
    component: registry.component,
    visible: false,
    ...splitProps(finalOptions),
  };
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
        // 自定义事件
        acc.on[eventNameTransition(propName)] = propValue;
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
    if (!instance || options.destroyOnClose !== false) {
      instance = createPopupInstance(id, options, props);
      console.log(instance, "_----_");
      popupCache.set(id, instance);
    } else {
      // 更新现有实例的属性
      instance.props = { ...instance.props, ...props };
      instance.options = { ...instance.options, ...options };
    }

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
  removeFromActiveList(id);

  // 解析 Promise
  if (instance.resolve) {
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

  if (instance.reject) {
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
