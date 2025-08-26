import { registerPopups } from "../hooks/useGlobalPopup/core/popup-managers";
import { createPopupHook } from "../hooks/useGlobalPopup/useGlobalPopup";
import UserFormDialog from "./UserFormDialog.vue";
import TestDialog from "./TestDialog.vue";
import TestDrawer from "./TestDrawer.vue";
import CustomHeaderDialog from "./CustomHeaderDialog.vue";

// 弹窗配置
const POPUP_CONFIGS = {
  "user-form": {
    component: UserFormDialog,
    defaultOptions: {
      title: "用户信息",
      // UI相关的配置由组件自行处理
    },
  },
  "test-dialog": {
    component: TestDialog,
    defaultOptions: {
      title: "测试弹窗",
    },
  },
  "test-drawer": {
    component: TestDrawer,
    defaultOptions: {
      title: "测试抽屉",
      // UI相关的配置由组件自行处理
    },
  },
  "custom-header-dialog": {
    component: CustomHeaderDialog,
    defaultOptions: {
      title: "自定义弹窗",
      // UI相关的配置由组件自行处理
    },
  },
};

// 注册所有弹窗
registerPopups(POPUP_CONFIGS);

// 导出特定弹窗的 Hooks
export const useUserFormDialog = createPopupHook("user-form");
export const useTestDialog = createPopupHook("test-dialog");
export const useTestDrawer = createPopupHook("test-drawer");
export const useCustomHeaderDialog = createPopupHook("custom-header-dialog");
