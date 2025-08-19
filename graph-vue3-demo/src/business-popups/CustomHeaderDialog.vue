<template>
  <div class="custom-header-dialog">
    <div class="dialog-content">
      <h3>这是一个自定义 Header 的弹窗</h3>
      <p>你可以在这里放置任何内容</p>
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="form.age" :min="0" :max="120" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  name: "",
  age: 18,
});

// 暴露表单数据给父组件
defineExpose({
  form,
});
</script>

<style scoped>
.custom-header-dialog {
  padding: 20px;
}

.dialog-content h3 {
  margin-bottom: 16px;
  color: #303133;
}

.dialog-content p {
  margin-bottom: 20px;
  color: #606266;
}
</style>
