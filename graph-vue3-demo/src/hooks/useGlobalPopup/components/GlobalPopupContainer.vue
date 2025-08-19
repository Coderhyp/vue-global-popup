<template>
  <div class="global-popup-container">
    <el-dialog
      v-for="popup in activePopups.dialog"
      :key="popup.id"
      v-model="popup.visible"
      v-bind="getDialogProps(popup)"
      @close="handleClose(popup.id)"
      @closed="handleClosed(popup.id)"
      @open="handleOpen(popup.id)"
      @opened="handleOpened(popup.id)"
    >
      <!-- 自定义 Header -->
      <template #header v-if="popup.options.header?.show !== false">
        <div v-if="popup.options.header?.component">
          <component
            :is="popup.options.header.component"
            v-bind="popup.options.header.props || {}"
            :popup="popup"
          />
        </div>
        <div v-else>
          {{ popup.options.title }}
        </div>
      </template>

      <!-- 弹窗内容 -->
      <div>
        <!-- 完全自定义模板 -->
        <component
          :is="popup.component"
          v-bind="popup.props"
          :popup="popup"
          @close="handleClose(popup.id)"
          @cancel="handleCancel(popup.id)"
          @confirm="handleConfirm(popup.id, $event)"
        />
      </div>

      <!-- 自定义 Footer -->
      <template #footer v-if="popup.options.footer?.show !== false">
        <div v-if="popup.options.footer?.component">
          <component
            :is="popup.options.footer.component"
            v-bind="popup.options.footer.props || {}"
            :popup="popup"
            @close="handleClose(popup.id)"
            @cancel="handleCancel(popup.id)"
            @confirm="handleConfirm(popup.id, $event)"
          />
        </div>
        <div v-else>
          <!-- 默认 footer -->
          <el-button @click="handleCancel(popup.id)">取消</el-button>
          <el-button type="primary" @click="handleConfirm(popup.id)"
            >确定</el-button
          >
        </div>
      </template>
    </el-dialog>
    <el-drawer
      v-for="popup in activePopups.drawer"
      :key="popup.id"
      v-model="popup.visible"
      v-bind="popup.options"
    >
      <component :is="popup.component" v-bind="popup.props" :popup="popup" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { getActivePopups, hidePopup, closePopup } from "../core/popup-managers";
import type { PopupInstance } from "../types/popup";

const props = defineProps<{
  activePopups: {
    dialog: PopupInstance[];
    drawer: PopupInstance[];
  };
}>();

// 事件处理
const handleClose = (id: string) => {
  console.log(`Dialog ${id} is closing`);
};

const handleClosed = (id: string) => {
  console.log(`Dialog ${id} has closed`);
  // 清理实例（按类型）
  const lists = [props.activePopups.dialog, props.activePopups.drawer];
  for (const list of lists) {
    const instance = list.find((p) => p.id === id);
    if (instance?.options.destroyOnClose) {
      const index = list.findIndex((p) => p.id === id);
      if (index > -1) list.splice(index, 1);
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

// 获取 el-dialog 的绑定属性
const getDialogProps = (popup: PopupInstance) => {
  const { options } = popup;
  return {
    width: options.width,
    fullscreen: options.fullscreen,
    top: options.top,
    center: options.center,
    modal: options.modal,
    lockScroll: options.lockScroll,
    customClass: options.customClass,
    closeOnClickModal: options.closeOnClickModal,
    closeOnPressEscape: options.closeOnPressEscape,
    showClose: options.showClose,
    beforeClose: options.beforeClose,
    destroyOnClose: options.destroyOnClose,
    draggable: options.draggable,
    overflow: options.overflow,
    appendToBody: options.appendToBody,
    openDelay: options.openDelay,
    closeDelay: options.closeDelay,
    alignCenter: options.alignCenter,
  };
};
</script>

<style scoped></style>
