import {
  showPopup,
  hidePopup,
  closePopup,
  getPopupInstance,
  isPopupVisible,
} from "./core/popup-managers";
import type { PopupOptions } from "./types/popup";

/**
 * 全局弹窗 Hook
 */
export const useGlobalPopup = () => {
  const open = async (
    id: string,
    options: Partial<PopupOptions> = {},
    props: Record<string, any> = {}
  ) => {
    try {
      return await showPopup(id, options, props);
    } catch (error) {
      console.error(`Failed to open popup ${id}:`, error);
      throw error;
    }
  };

  const close = (id: string, result?: any) => {
    hidePopup(id, result);
  };

  const cancel = (id: string, reason?: any) => {
    closePopup(id, reason);
  };

  const getInstance = (id: string) => {
    return getPopupInstance(id);
  };

  const isVisible = (id: string) => {
    return isPopupVisible(id);
  };

  return {
    open,
    close,
    cancel,
    getInstance,
    isVisible,
  };
};

/**
 * 创建特定弹窗的 Hook
 */
export const createPopupHook = (popupId: string) => {
  return () => {
    const { open, close, cancel, getInstance, isVisible } = useGlobalPopup();

    const show = async (
      options: Partial<PopupOptions> = {},
      props: Record<string, any> = {}
    ) => {
      return await open(popupId, options, props);
    };

    const hide = (result?: any) => {
      close(popupId, result);
    };

    const dismiss = (reason?: any) => {
      cancel(popupId, reason);
    };

    const instance = () => {
      return getInstance(popupId);
    };

    const visible = () => {
      return isVisible(popupId);
    };

    return {
      show,
      hide,
      dismiss,
      instance,
      visible,
    };
  };
};
