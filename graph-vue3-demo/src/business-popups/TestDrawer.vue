<template>
  <el-drawer
    v-model="drawerVisible"
    v-bind="$attrs"
    :before-close="handleBeforeClose"
    @close="handleClose"
    @closed="handleClosed"
    @open="handleOpen"
    @opened="handleOpened"
  >
    <!-- 抽屉内容 -->
    <div class="drawer-content">
      <h3>这是一个自定义抽屉</h3>
      <p>抽屉ID: {{ popup.id }}</p>
      <p>抽屉属性: {{ JSON.stringify(popup.props, null, 2) }}</p>

      <!-- 可以在这里添加更多的业务逻辑 -->
      <el-form :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="form.age" :min="0" :max="120" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
      </el-form>

      <div class="drawer-actions">
        <el-button @click="handleTestAction" type="primary">
          测试操作
        </el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { PopupInstance } from "../hooks/useGlobalPopup/types/popup";

// 定义组件属性
interface Props {
  popup: PopupInstance;
  visible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
});

// 定义事件
const emit = defineEmits<{
  close: [];
  cancel: [reason?: any];
  confirm: [result?: any];
  "update:visible": [visible: boolean];
}>();

// 本地状态
const form = ref({
  name: "",
  age: 18,
  email: "",
});

// 计算属性
const drawerVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => {
    emit("update:visible", value);
  },
});

// 事件处理
const handleClose = () => {
  emit("close");
};

const handleCancel = () => {
  emit("cancel", "用户取消");
};

const handleConfirm = () => {
  const result = {
    form: { ...form.value },
    timestamp: Date.now(),
    message: "用户确认操作",
  };
  emit("confirm", result);
};

const handleBeforeClose = (done: () => void) => {
  // 可以在这里添加关闭前的验证逻辑
  console.log("抽屉即将关闭");
  done();
};

const handleClosed = () => {
  console.log("抽屉已关闭");
};

const handleOpen = () => {
  console.log("抽屉正在打开");
};

const handleOpened = () => {
  console.log("抽屉已打开");
};

const handleTestAction = () => {
  console.log("测试操作被触发", form.value);
  // 这里可以添加具体的业务逻辑
};

const handleReset = () => {
  form.value = {
    name: "",
    age: 18,
    email: "",
  };
  console.log("表单已重置");
};
</script>

<style scoped>
.drawer-content {
  padding: 20px 0;
}

.drawer-actions {
  margin-top: 20px;
  text-align: center;
}

.drawer-actions .el-button {
  margin: 0 8px;
}

/* 可以添加更多自定义样式 */
</style>
