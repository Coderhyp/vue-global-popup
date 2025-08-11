<template>
  <div>
    <button @click="openDialog">打开用户弹窗</button>
    <button @click="openTestDialog">打开测试弹窗</button>
  </div>
</template>
<script setup lang="ts">
import {
  useUserFormDialog,
  useTestDialog,
} from "../business-popups/popup-registry";
const { show } = useUserFormDialog();
const { show: showTestDialog } = useTestDialog();
const openDialog = () => {
  show();
  // console.log("openDialog");
  // showTestDialog();
};

const openTestDialog = () => {
  showTestDialog();
};
</script>
