import { registerPopups } from "../hooks/useGlobalPopup/core/popup-managers";
import { createPopupHook } from "../hooks/useGlobalPopup/useGlobalPopup";
import UserFormDialog from "./UserFormDialog.vue";
import TestDialog from "./TestDialog.vue";
import TestDrawer from "./TestDrawer.vue";
import CustomHeaderComponent from "./CustomHeaderComponent.vue";

// 弹窗配置
const DIALOG_POPUP_CONFIGS = {
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
      header: {
        component: CustomHeaderComponent,
        show: true,
      },
    },
  },
};
const DRAWER_POPUP_CONFIGS = {
  "test-drawer": {
    component: TestDrawer,
    defaultOptions: {
      title: "测试弹窗",
      uiType: "drawer" as const,
    },
  },
};
const POPUP_CONFIGS = {
  ...DIALOG_POPUP_CONFIGS,
  ...DRAWER_POPUP_CONFIGS,
};
// 注册所有弹窗
registerPopups(POPUP_CONFIGS);

// 导出特定弹窗的 Hooks
//  ----dialog----
export const useUserFormDialog = createPopupHook("user-form");

export const useTestDialog = createPopupHook("test-dialog");
//  ----drawer----
export const useTestDrawer = createPopupHook("test-drawer");
