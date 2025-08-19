export interface PopupOptions {
  id: string;
  title?: string;
  width?: string | number;
  fullscreen?: boolean;
  top?: string;
  modal?: boolean;
  appendToBody?: boolean;
  lockScroll?: boolean;
  customClass?: string;
  openDelay?: number;
  closeDelay?: number;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  showClose?: boolean;
  beforeClose?: (done: () => void) => void;
  center?: boolean;
  alignCenter?: boolean;
  destroyOnClose?: boolean;
  draggable?: boolean;
  overflow?: boolean;
  props?: Record<string, any>;
  // 新增：用于区分弹窗呈现形式
  uiType?: "dialog" | "drawer";

  // 新增：支持自定义 header 和 footer
  header?: {
    component?: any; // 自定义 header 组件
    props?: Record<string, any>; // header 组件的 props
    slot?: string; // 插槽名称
    show?: boolean; // 是否显示 header
  };
  footer?: {
    component?: any; // 自定义 footer 组件
    props?: Record<string, any>; // footer 组件的 props
    slot?: string; // 插槽名称
    show?: boolean; // 是否显示 footer
  };
  // 支持完全自定义模板
  customTemplate?: boolean; // 是否使用完全自定义模板
}

export interface PopupInstance {
  id: string;
  component: any;
  options: PopupOptions;
  visible: boolean;
  props: Record<string, any>;
  resolve?: (value?: any) => void;
  reject?: (reason?: any) => void;
}

export interface PopupRegistry {
  [key: string]: {
    component: any;
    defaultOptions?: Partial<PopupOptions>;
  };
}
