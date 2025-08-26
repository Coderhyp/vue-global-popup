<template>
  <div class="popup-demo">
    <h1>弹窗系统演示</h1>

    <div class="demo-section">
      <h2>基础弹窗（Dialog）</h2>
      <el-button class="btn-modern" @click="showUserForm" type="primary">
        用户信息弹窗
      </el-button>
      <el-button class="btn-modern" @click="showTestDialog" type="success">
        测试弹窗(嵌套 drawer)
      </el-button>
      <el-button
        class="btn-modern"
        @click="showConfirmCancelDialog"
        type="warning"
      >
        对话框：确认/取消回调
      </el-button>
      <el-button
        class="btn-modern"
        @click="showAsyncDialog"
        type="primary"
        plain
      >
        对话框：异步确认（2s）
      </el-button>
    </div>

    <div class="demo-section">
      <h2>抽屉弹窗（Drawer）</h2>
      <el-button class="btn-modern" @click="showTestDrawer" type="warning">
        测试抽屉
      </el-button>
      <el-button
        class="btn-modern"
        @click="showLeftDrawer"
        type="primary"
        plain
      >
        左侧抽屉（large）
      </el-button>
      <el-button
        class="btn-modern"
        @click="showRightDrawer"
        type="success"
        plain
      >
        右侧抽屉（small）
      </el-button>
    </div>

    <div class="demo-section">
      <h2>复用策略与状态</h2>
      <p>当前活跃弹窗数量: {{ activePopupCount }}</p>
      <el-button class="btn-modern" @click="refreshStatus" size="small">
        刷新状态
      </el-button>
      <el-button
        class="btn-modern"
        @click="showReusableDialog"
        size="small"
        type="success"
      >
        复用实例（destroyOnClose=false）
      </el-button>
      <el-button
        class="btn-modern"
        @click="showFreshDialog"
        size="small"
        type="primary"
      >
        每次新建（destroyOnClose=true）
      </el-button>
    </div>

    <div class="demo-section">
      <h2>弹窗操作</h2>
      <el-button
        class="btn-modern"
        @click="closeAllPopups"
        type="danger"
        size="small"
      >
        关闭所有弹窗
      </el-button>
      <el-button
        class="btn-modern"
        @click="openNested"
        type="warning"
        size="small"
      >
        打开嵌套（Dialog 内再开 Drawer）
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  useUserFormDialog,
  useTestDialog,
  useTestDrawer,
} from "../business-popups/popup-registry";
import {
  getActivePopups,
  hidePopup,
  closePopup,
} from "../hooks/useGlobalPopup/core/popup-managers";

// 弹窗 hooks
const userFormDialog = useUserFormDialog();
const testDialog = useTestDialog();
const testDrawer = useTestDrawer();

// 状态管理
const activePopupCount = computed(() => {
  return getActivePopups().length;
});

// 弹窗显示方法
const showUserForm = async () => {
  try {
    const result = await userFormDialog.show(
      {},
      {
        fullscreen: true,
        initialData: {
          username: "张三",
          age: 25,
          email: "zhangsan@example.com",
        },
        "@dataChange": (data) => {
          console.log("监听数据变化了", data);
        },
        "@confirm": (data) => {
          console.log("确认: ", data);
        },
        "@cancel": () => {
          console.log("取消");
        },
      }
    );
    console.log("用户表单结果:", result);
  } catch (error) {
    console.log("用户表单被取消:", error);
  }
};

const showTestDialog = async () => {
  try {
    const result = await testDialog.show(
      {
        title: "测试弹窗tes",
      },
      {
        message: "这是一个测试弹窗",
        timestamp: Date.now(),
        "@opened": () => {
          // 在对话框打开后，自动打开一个右侧抽屉
          showRightDrawer();
        },
      }
    );
    console.log("测试弹窗结果:", result);
  } catch (error) {
    console.log("测试弹窗被取消:", error);
  }
};

const showTestDrawer = async () => {
  try {
    const result = await testDrawer.show(
      {
        title: "测试抽屉",
      },
      {
        message: "这是一个测试抽屉",
        timestamp: Date.now(),
      }
    );
    console.log("测试抽屉结果:", result);
  } catch (error) {
    console.log("测试抽屉被取消:", error);
  }
};

// 进阶示例：确认/取消
const showConfirmCancelDialog = async () => {
  try {
    const result = await userFormDialog.show(
      { title: "确认/取消演示" },
      {
        initialData: { username: "ConfirmUser" },
        "@confirm": (payload) => console.log("onConfirm:", payload),
        "@cancel": () => console.log("onCancel"),
      }
    );
    console.log("resolved:", result);
  } catch (e) {
    console.log("rejected:", e);
  }
};

// 异步确认（模拟 2s）
const showAsyncDialog = async () => {
  try {
    const result = await userFormDialog.show(
      { title: "异步确认（2s）" },
      {
        initialData: { username: "AsyncUser" },
        "@confirm": async () => {
          await new Promise((r) => setTimeout(r, 2000));
          console.log("async confirm done");
        },
      }
    );
    console.log("async resolved:", result);
  } catch (e) {
    console.log("async rejected:", e);
  }
};

// Drawer
const showLeftDrawer = async () => {
  try {
    await testDrawer.show(
      { title: "左侧抽屉" },
      {
        direction: "ltr",
        size: "60%",
        message: "左侧进入的大抽屉",
      }
    );
  } catch {}
};

const showRightDrawer = async () => {
  try {
    await testDrawer.show(
      { title: "右侧抽屉" },
      {
        direction: "rtl",
        size: "30%",
        message: "右侧进入的小抽屉",
      }
    );
  } catch {}
};

// 复用策略演示
const showReusableDialog = async () => {
  try {
    await userFormDialog.show({ title: "复用实例（destroyOnClose=false)" }, {
      fullscreen: false,
      // 让实例保留，下一次 show 复用并保留数据
      destroyOnClose: false,
      initialData: { username: "Reusable" },
    } as any);
  } catch {}
};

const showFreshDialog = async () => {
  try {
    await userFormDialog.show({ title: "每次新建（destroyOnClose=true）" }, {
      fullscreen: false,
      destroyOnClose: true,
      initialData: { username: "Fresh" },
    } as any);
  } catch {}
};

// 嵌套演示：Dialog 内打开 Drawer
const openNested = async () => {
  try {
    await testDialog.show(
      { title: "父级 Dialog" },
      {
        message: "Dialog 打开后立即弹出 Drawer",
        "@opened": () => showLeftDrawer(),
      }
    );
  } catch {}
};

// 工具方法
const refreshStatus = () => {
  // 状态会自动更新，这里只是触发重新计算
  console.log("状态已刷新");
};

const closeAllPopups = () => {
  const activePopups = getActivePopups();
  activePopups.slice().forEach((popup) => {
    // 统一使用 closePopup，调用方将收到 reject
    closePopup(popup.id, "bulk-close");
  });
  console.log("所有弹窗已关闭");
};

// 生命周期
onMounted(() => {
  console.log("弹窗演示页面已加载");
});
</script>

<style scoped>
.popup-demo {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  background: linear-gradient(135deg, #f6f8ff 0%, #f9fbff 40%, #ffffff 100%);
  border-radius: 18px;
}

.popup-demo > h1 {
  grid-column: 1 / -1;
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2;
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.demo-section {
  position: relative;
  padding: 22px 20px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), #ffffff);
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.06), 0 2px 10px rgba(2, 6, 23, 0.04);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  overflow: hidden;
}

.demo-section::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
      1200px 200px at -10% -20%,
      rgba(79, 70, 229, 0.08),
      transparent
    ),
    radial-gradient(
      800px 160px at 110% 0%,
      rgba(6, 182, 212, 0.08),
      transparent
    );
  pointer-events: none;
}

.demo-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.08), 0 4px 16px rgba(2, 6, 23, 0.06);
}

.demo-section h2 {
  margin: 0 0 14px 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
}

.demo-section .el-button {
  margin-right: 12px;
  margin-bottom: 10px;
}

.demo-section p {
  margin: 8px 0 12px;
  color: #475569;
}

/* Modern button styles */
.btn-modern {
  border-radius: 12px;
  padding: 10px 14px;
  font-weight: 700;
  letter-spacing: 0.2px;
  border: 1px solid transparent !important;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.08);
  transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
}

.btn-modern:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 26px rgba(2, 6, 23, 0.12);
  filter: brightness(1.02);
}

.btn-modern:active {
  transform: translateY(0);
}

/* Variants */
.btn-modern.el-button--primary {
  background: linear-gradient(135deg, #4f46e5, #6366f1) !important;
  color: #fff !important;
}

.btn-modern.el-button--success {
  background: linear-gradient(135deg, #059669, #10b981) !important;
  color: #fff !important;
}

.btn-modern.el-button--warning {
  background: linear-gradient(135deg, #f59e0b, #f97316) !important;
  color: #fff !important;
}

.btn-modern.el-button--danger {
  background: linear-gradient(135deg, #ef4444, #f43f5e) !important;
  color: #fff !important;
}

/* Ghost/small */
.btn-modern.el-button--small {
  border-radius: 10px;
  padding: 6px 10px;
  box-shadow: 0 4px 12px rgba(2, 6, 23, 0.08);
}

@media (max-width: 768px) {
  .popup-demo {
    padding: 20px 16px;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .popup-demo > h1 {
    font-size: 24px;
  }

  .demo-section {
    padding: 18px 16px;
    border-radius: 14px;
  }
}
</style>
