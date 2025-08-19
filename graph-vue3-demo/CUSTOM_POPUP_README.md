# 自定义弹窗系统使用指南

## 概述

这个弹窗系统现在支持自定义 `header` 和 `footer`，让你可以完全控制弹窗的外观和行为。

## 新功能特性

### 1. 自定义 Header

- 可以指定自定义的 header 组件
- 支持传递 props 给 header 组件
- 可以隐藏 header

### 2. 自定义 Footer

- 可以指定自定义的 footer 组件
- 支持传递 props 给 footer 组件
- 可以隐藏 footer
- 提供默认的取消/确定按钮

### 3. 完全自定义模板

- 启用 `customTemplate: true` 时，弹窗内容完全由组件控制
- 支持更复杂的弹窗布局

## 使用方法

### 基础用法

```typescript
import { useGlobalPopup } from "../hooks/useGlobalPopup/useGlobalPopup";

const { open } = useGlobalPopup();

// 显示弹窗
const result = await open(
  "popupId",
  {
    title: "弹窗标题",
    width: "600px",
  },
  {
    // 弹窗内容的 props
  }
);
```

### 自定义 Header

```typescript
const result = await open(
  "customHeaderDialog",
  {
    width: "600px",
    header: {
      component: "CustomHeaderComponent", // 组件名称
      props: {
        // 传递给 header 组件的 props
        title: "自定义标题",
        icon: "user",
      },
      show: true, // 是否显示 header
    },
  },
  {
    // 弹窗内容的 props
  }
);
```

### 自定义 Footer

```typescript
const result = await open(
  "customFooterDialog",
  {
    width: "600px",
    footer: {
      component: "CustomFooterComponent", // 组件名称
      props: {
        // 传递给 footer 组件的 props
        showReset: true,
        showPreview: true,
      },
      show: true, // 是否显示 footer
    },
  },
  {
    // 弹窗内容的 props
  }
);
```

### 完全自定义模板

```typescript
const result = await open(
  "fullyCustomDialog",
  {
    width: "700px",
    customTemplate: true, // 启用完全自定义模板
    header: {
      component: "CustomHeaderComponent",
    },
    footer: {
      component: "CustomFooterComponent",
    },
  },
  {
    // 弹窗内容的 props
  }
);
```

### 使用专用 Hook

```typescript
import { createPopupHook } from "../hooks/useGlobalPopup/useGlobalPopup";

// 创建特定弹窗的 Hook
const useCustomPopup = createPopupHook("customPopup");
const { show, hide, dismiss } = useCustomPopup();

// 显示弹窗
const result = await show(
  {
    width: "500px",
    title: "专用 Hook 弹窗",
  },
  {
    message: "这是使用专用 Hook 显示的弹窗",
  }
);
```

## 组件开发指南

### Header 组件

```vue
<template>
  <div class="custom-header">
    <div class="header-left">
      <el-icon><User /></el-icon>
      <span>{{ title }}</span>
    </div>
    <div class="header-right">
      <el-tag>{{ status }}</el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
// 接收弹窗实例作为 prop
defineProps<{
  popup: any;
  title?: string;
  status?: string;
}>();
</script>
```

### Footer 组件

```vue
<template>
  <div class="custom-footer">
    <div class="footer-left">
      <el-button @click="handleReset">重置</el-button>
    </div>
    <div class="footer-right">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: [result?: any];
  cancel: [reason?: any];
  confirm: [result?: any];
}>();

const handleCancel = () => {
  emit("cancel", "用户取消");
};

const handleConfirm = () => {
  emit("confirm", { action: "save" });
};
</script>
```

## 配置选项

### PopupOptions 接口

```typescript
export interface PopupOptions {
  // 基础属性
  id: string;
  title?: string;
  width?: string | number;

  // Header 配置
  header?: {
    component?: any; // 自定义 header 组件
    props?: Record<string, any>; // header 组件的 props
    slot?: string; // 插槽名称
    show?: boolean; // 是否显示 header
  };

  // Footer 配置
  footer?: {
    component?: any; // 自定义 footer 组件
    props?: Record<string, any>; // footer 组件的 props
    slot?: string; // 插槽名称
    show?: boolean; // 是否显示 footer
  };

  // 完全自定义模板
  customTemplate?: boolean; // 是否使用完全自定义模板

  // 其他 el-dialog 属性...
}
```

## 注意事项

1. **组件名称**: 使用字符串形式的组件名称，系统会自动解析
2. **Props 传递**: header 和 footer 组件会接收到 `popup` 实例作为 prop
3. **事件处理**: footer 组件需要 emit 相应的事件来关闭弹窗
4. **样式隔离**: 建议使用 scoped 样式避免样式冲突

## 示例项目

查看 `src/views/Popup.vue` 文件，了解完整的使用示例。

## 扩展建议

1. 支持更多的插槽配置
2. 添加动画效果配置
3. 支持拖拽和调整大小
4. 添加主题配置支持
