export interface PopupOptions {
  id: string;
  title?: string;
  /**
   * Element Plus 对话框/抽屉等 UI 组件的原生属性
   * 在调用 showPopup/show 时通过此处透传
   */
  popupProps?: Record<string, any>;

  // 弹窗管理相关属性
  destroyOnClose?: boolean;
  props?: Record<string, any>;

  // 支持完全自定义模板
  customTemplate?: boolean; // 是否使用完全自定义模板
}

export interface PopupInstance {
  id: string;
  component: any;
  options: PopupOptions;
  visible: boolean;
  props: Record<string, any>;
  on: Record<string, (...args: any[]) => void>;
  resolve?: (value?: any) => void;
  reject?: (reason?: any) => void;
  waiters?: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }>;
}

export interface PopupRegistry {
  [key: string]: {
    component: any;
    defaultOptions?: Partial<PopupOptions>;
  };
}
