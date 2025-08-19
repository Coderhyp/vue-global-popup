<template>
  <div class="popup-demo">
    <div class="popup-card">
      <div class="popup-actions">
        <button class="btn btn--primary" @click="openDialog">
          打开用户弹窗
        </button>
        <button class="btn btn--secondary" @click="openTestDialog">
          打开测试弹窗
        </button>
        <button class="btn btn--secondary" @click="showTestDrawer">
          打开测试抽屉
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  useUserFormDialog,
  useTestDialog,
  useTestDrawer,
} from "../business-popups/popup-registry";
const { show } = useUserFormDialog();
const { show: showTestDialog } = useTestDialog();
const { show: showTestDrawer } = useTestDrawer();
const openDialog = async () => {
  try {
    const res = await show({ title: "用户信息test" });
    console.log("获取到关闭后的值", res);
  } catch (error) {
    console.error("openDialog失败了", error);
  }
};

const openTestDialog = () => {
  showTestDialog();
};
</script>
<style scoped>
.popup-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.popup-card {
  width: 100%;
  max-width: 720px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 28px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.popup-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
}

.btn {
  appearance: none;
  cursor: pointer;
  user-select: none;
  border: none;
  outline: none;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 1.2;
  transition: box-shadow 0.2s ease, transform 0.08s ease,
    background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
}

.btn:focus-visible {
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15);
}

.btn:active {
  transform: translateY(1px);
}

.btn--primary {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.28);
}

.btn--primary:hover {
  filter: brightness(1.05);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
}

.btn--secondary {
  background: #f8fafc;
  color: #334155;
  border: 1px solid #e2e8f0;
}

.btn--secondary:hover {
  background: #f1f5f9;
  border-color: #d8dee4;
}

@media (max-width: 480px) {
  .popup-card {
    padding: 20px;
    border-radius: 14px;
  }

  .btn {
    width: 100%;
  }
}
</style>
