import { registerPopups } from "../hooks/useGlobalPopup/core/popup-managers";
import { createPopupHook } from "../hooks/useGlobalPopup/useGlobalPopup";
import UserFormDialog from "./UserFormDialog.vue";
import TestDialog from "./TestDialog.vue";

// 弹窗配置
const POPUP_CONFIGS = {
  "user-form": {
    component: UserFormDialog,
    defaultOptions: {
      title: "用户信息",
      width: "600px",
      closeOnClickModal: false,
      draggable: true,
    },
  },
  "test-dialog": {
    component: TestDialog,
    defaultOptions: {
      title: "测试弹窗",
    },
  },
};

// 注册所有弹窗
registerPopups(POPUP_CONFIGS);

// 导出特定弹窗的 Hooks
export const useUserFormDialog = createPopupHook("user-form");

export const useTestDialog = createPopupHook("test-dialog");
