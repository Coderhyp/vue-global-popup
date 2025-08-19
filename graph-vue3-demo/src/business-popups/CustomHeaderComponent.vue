<template>
  <div class="custom-header">
    <div class="header-left">
      <el-icon class="header-icon"><User /></el-icon>
      <span class="header-title">用户信息编辑</span>
    </div>
    <div class="header-right">
      <el-tag type="info" size="small">编辑模式</el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";

// 接收弹窗实例作为 prop
defineProps<{
  popup: any;
}>();
</script>

<style scoped>
.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon {
  font-size: 18px;
  color: #409eff;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
}
</style>
