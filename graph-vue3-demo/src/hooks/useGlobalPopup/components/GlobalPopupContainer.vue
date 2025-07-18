<template>
  <div class="global-popup-container">
    <el-dialog
      v-for="popup in activePopups"
      :key="popup.id"
      v-model="popup.visible"
      :title="popup.options.title"
      :width="popup.options.width"
      :fullscreen="popup.options.fullscreen"
      :top="popup.options.top"
      :modal="popup.options.modal"
      :append-to-body="popup.options.appendToBody"
      :lock-scroll="popup.options.lockScroll"
      :custom-class="popup.options.customClass"
      :open-delay="popup.options.openDelay"
      :close-delay="popup.options.closeDelay"
      :close-on-click-modal="popup.options.closeOnClickModal"
      :close-on-press-escape="popup.options.closeOnPressEscape"
      :show-close="popup.options.showClose"
      :before-close="popup.options.beforeClose"
      :center="popup.options.center"
      :align-center="popup.options.alignCenter"
      :destroy-on-close="popup.options.destroyOnClose"
      :draggable="popup.options.draggable"
      :overflow="popup.options.overflow"
      @close="handleClose(popup.id)"
      @closed="handleClosed(popup.id)"
      @open="handleOpen(popup.id)"
      @opened="handleOpened(popup.id)"
    >
      <component
        :is="popup.component"
        v-bind="popup.props"
        @close="handleClose(popup.id)"
        @cancel="handleCancel(popup.id)"
        @confirm="handleConfirm(popup.id, $event)"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getActivePopups, hidePopup, closePopup } from "../core/popup-managers";
import type { PopupInstance } from "../types/popup";

const activePopups = getActivePopups();

// 事件处理
const handleClose = (id: string) => {
  console.log(`Dialog ${id} is closing`);
};

const handleClosed = (id: string) => {
  console.log(`Dialog ${id} has closed`);
  // 清理实例
  const instance = activePopups.find((p) => p.id === id);
  if (instance?.options.destroyOnClose) {
    const index = activePopups.findIndex((p) => p.id === id);
    if (index > -1) {
      activePopups.splice(index, 1);
    }
  }
};

const handleOpen = (id: string) => {
  console.log(`Dialog ${id} is opening`);
};

const handleOpened = (id: string) => {
  console.log(`Dialog ${id} has opened`);
};

const handleCancel = (id: string, reason?: any) => {
  closePopup(id, reason);
};

const handleConfirm = (id: string, result?: any) => {
  hidePopup(id, result);
};
</script>

<style scoped>
.global-popup-container {
  /* 可以在这里添加全局弹窗样式 */
}

/* 自定义 Element Plus Dialog 样式 */
:deep(.el-dialog) {
  /* 自定义样式 */
}

:deep(.el-dialog__header) {
  /* 自定义头部样式 */
}

:deep(.el-dialog__body) {
  /* 自定义内容样式 */
}
</style>
