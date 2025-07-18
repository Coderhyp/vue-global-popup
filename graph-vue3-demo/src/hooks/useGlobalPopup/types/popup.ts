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
