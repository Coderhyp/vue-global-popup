<template>
  <div class="global-popup-container">
    <!-- 渲染所有活跃的弹窗实例 -->
    <component
      v-for="popup in activePopups"
      v-model="popup.visible"
      :key="popup.id"
      :is="popup.component"
      :popup="popup"
      v-bind="popup.props"
      v-on="popup.on"
    />
  </div>
</template>

<script setup lang="ts">
import { getActivePopups, hidePopup, closePopup } from "../core/popup-managers";
import type { PopupInstance } from "../types/popup";

// 获取活跃弹窗列表
const activePopups = getActivePopups();
</script>

<style scoped></style>
