<template>
  <div class="user-form-dialog">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="formData.age" :min="1" :max="120" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";

interface Props {
  userData?: {
    username?: string;
    email?: string;
    age?: number;
  };
  mode?: "create" | "edit";
}

const props = withDefaults(defineProps<Props>(), {
  mode: "create",
});

const emit = defineEmits<{
  confirm: [result?: any];
  cancel: [reason?: any];
}>();

const formRef = ref<FormInstance>();
const formData = reactive({
  username: "",
  email: "",
  age: 18,
});

const rules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 2,
      max: 20,
      message: "用户名长度在 2 到 20 个字符",
      trigger: "blur",
    },
  ],
};

// 监听 props 变化，初始化表单数据
watch(
  () => props.userData,
  (newData) => {
    if (newData) {
      Object.assign(formData, newData);
    }
  },
  { immediate: true }
);

const handleCancel = () => {
  emit("cancel", "user_cancelled");
};

const handleConfirm = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    emit("confirm", { ...formData });
  } catch (error) {
    console.error("表单验证失败:", error);
  }
};
</script>

<style scoped>
.user-form-dialog {
  padding: 20px;
}

.dialog-footer {
  text-align: right;
  margin-top: 20px;
}

.dialog-footer .el-button {
  margin-left: 10px;
}
</style>
