import { registerPopups } from "./core/popup-managers";
import { createPopupHook } from "./composables/useGlobalPopup";

// 导入所有业务弹窗组件
import UserFormDialog from "./components/UserFormDialog.vue";
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
};

// 注册所有弹窗
registerPopups(POPUP_CONFIGS);

// 导出特定弹窗的 Hooks
export const useUserFormDialog = createPopupHook("user-form");
