<template>
  <el-dialog
    v-model="dialogVisible"
    :title="popup.options.title || '自定义弹窗'"
    :before-close="handleBeforeClose"
    @close="handleClose"
    @closed="handleClosed"
    @open="handleOpen"
    @opened="handleOpened"
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
    <div class="dialog-content">
      <h3>这是一个自定义弹窗</h3>
      <p>弹窗ID: {{ popup.id }}</p>
      <p>弹窗属性: {{ JSON.stringify(popup.props, null, 2) }}</p>

      <!-- 可以在这里添加更多的业务逻辑 -->
      <el-input v-model="inputValue" placeholder="请输入内容" class="mb-3" />

      <el-button @click="handleTestAction" type="primary"> 测试操作 </el-button>
    </div>

    <!-- 自定义 Footer -->
    <template #footer v-if="popup.options.footer?.show !== false">
      <div v-if="popup.options.footer?.component">
        <component
          :is="popup.options.footer.component"
          v-bind="popup.options.footer.props || {}"
          :popup="popup"
          @close="handleClose"
          @cancel="handleCancel"
          @confirm="handleConfirm"
        />
      </div>
      <div v-else>
        <!-- 默认 footer -->
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
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
const inputValue = ref("");

// 计算属性
const dialogVisible = computed({
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
    inputValue: inputValue.value,
    timestamp: Date.now(),
    message: "用户确认操作",
  };
  emit("confirm", result);
};

const handleBeforeClose = (done: () => void) => {
  // 可以在这里添加关闭前的验证逻辑
  console.log("弹窗即将关闭");
  done();
};

const handleClosed = () => {
  console.log("弹窗已关闭");
};

const handleOpen = () => {
  console.log("弹窗正在打开");
};

const handleOpened = () => {
  console.log("弹窗已打开");
};

const handleTestAction = () => {
  console.log("测试操作被触发", inputValue.value);
  // 这里可以添加具体的业务逻辑
};
</script>

<style scoped>
.dialog-content {
  padding: 20px 0;
}

.mb-3 {
  margin-bottom: 12px;
}

/* 可以添加更多自定义样式 */
</style>
