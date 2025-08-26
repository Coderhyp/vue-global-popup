<template>
  <el-dialog
    v-model="dialogVisible"
    v-bind="$attrs"
    :before-close="handleBeforeClose"
    @close="handleClose"
    @closed="handleClosed"
  >
    <div class="user-form-dialog">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        @change="dataChange"
        label-width="80px"
      >
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

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { PopupInstance } from "../hooks/useGlobalPopup/types/popup";

interface Props {
  popup: PopupInstance;
  visible?: boolean;
  initialData?: {
    username?: string;
    email?: string;
    age?: number;
  };
  mode?: "create" | "edit";
}

const props = withDefaults(defineProps<Props>(), {
  mode: "create",
  visible: false,
});

const emit = defineEmits<{
  dataChange: any;
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

// 初始化表单
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      Object.assign(formData, newData);
    }
  },
  { immediate: true }
);
const dialogVisible = defineModel(false);

const handleBeforeClose = (done: () => void) => {
  done();
};
const handleCancel = () => {
  dialogVisible.value = false;
};

const handleConfirm = async () => {
  if (!formRef.value) return;
  try {
    await formRef.value.validate();
    dialogVisible.value = false;
  } catch (error) {
    console.error("表单验证失败:", error);
  }
};

const dataChange = (data) => {
  emit("dataChange", data);
};
</script>

<style scoped>
.user-form-dialog {
  padding: 8px 0 0;
}

.dialog-footer {
  text-align: right;
}

.dialog-footer .el-button + .el-button {
  margin-left: 10px;
}
</style>
