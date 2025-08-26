<template>
  <el-dialog
    v-model="dialogVisible"
    v-bind="$attrs"
    :before-close="handleBeforeClose"
    @close="handleClose"
    @closed="handleClosed"
    @open="handleOpen"
    @opened="handleOpened"
  >
    <div class="test-dialog-content">
      <p>{{ message }}</p>
    </div>
    <el-button type="primary" @click="openTestDrawer"> 打开抽屉</el-button>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PopupInstance } from "../hooks/useGlobalPopup/types/popup";
import { useTestDrawer } from "./popup-registry";
interface Props {
  popup: PopupInstance;
  visible?: boolean;
  message?: string;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  message: "这是一个测试弹窗",
});
const { show } = useTestDrawer();
const openTestDrawer = async () => {
  await show({ title: "这是嵌套 drawer" });
};
const emit = defineEmits<{
  close: [];
  cancel: [reason?: any];
  confirm: [result?: any];
  "update:visible": [visible: boolean];
}>();

const dialogVisible = defineModel(false);

const handleBeforeClose = (done: () => void) => {
  done();
};

const handleClose = () => {
  emit("close");
};

const handleCancel = () => {
  emit("cancel", "user_cancelled");
};

const handleConfirm = () => {
  emit("confirm", { ok: true, at: Date.now() });
};

const handleClosed = () => {};
const handleOpen = () => {};
const handleOpened = () => {};
</script>

<style scoped>
.test-dialog-content {
  padding: 8px 0 0;
}

.dialog-footer {
  text-align: right;
}

.dialog-footer .el-button + .el-button {
  margin-left: 10px;
}
</style>
