<template>
  <div class="global-popup-container">
    <el-dialog
      v-for="popup in activePopups"
      :key="popup.id"
      v-model="popup.visible"
      v-bind="popup.options"
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
    <!-- <el-drawer
      v-for="popup in activePopups"
      :key="popup.id"
      v-model="popup.visible"
      v-bind="popup.options"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { getActivePopups, hidePopup, closePopup } from "../core/popup-managers";
import type { PopupInstance } from "../types/popup";

const props = defineProps<{
  activePopups: PopupInstance[];
}>();

// 事件处理
const handleClose = (id: string) => {
  console.log(`Dialog ${id} is closing`);
};

const handleClosed = (id: string) => {
  console.log(`Dialog ${id} has closed`);
  // 清理实例
  const instance = props.activePopups.find((p) => p.id === id);
  if (instance?.options.destroyOnClose) {
    const index = props.activePopups.findIndex((p) => p.id === id);
    if (index > -1) {
      props.activePopups.splice(index, 1);
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

<style scoped></style>
