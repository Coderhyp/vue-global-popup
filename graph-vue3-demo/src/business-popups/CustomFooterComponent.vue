<template>
  <div class="custom-footer">
    <div class="footer-left">
      <el-button size="small" @click="handleReset">重置</el-button>
      <el-button size="small" @click="handlePreview">预览</el-button>
    </div>
    <div class="footer-right">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">保存</el-button>
      <el-button type="success" @click="handleSaveAndClose"
        >保存并关闭</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

// 接收弹窗实例作为 prop
const props = defineProps<{
  popup: any;
}>();

const emit = defineEmits<{
  close: [result?: any];
  cancel: [reason?: any];
  confirm: [result?: any];
}>();

const handleReset = () => {
  ElMessage.info("重置表单");
  // 这里可以添加重置逻辑
};

const handlePreview = () => {
  ElMessage.info("预览功能");
  // 这里可以添加预览逻辑
};

const handleCancel = () => {
  emit("cancel", "用户取消");
};

const handleConfirm = () => {
  emit("confirm", { action: "save" });
};

const handleSaveAndClose = () => {
  emit("confirm", { action: "saveAndClose" });
};
</script>

<style scoped>
.custom-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.footer-left {
  display: flex;
  gap: 8px;
}

.footer-right {
  display: flex;
  gap: 8px;
}
</style>
