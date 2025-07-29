<template>
  <button @click="openDialog">打开弹窗</button>
</template>
<script setup lang="ts">
import { useUserFormDialog } from "../business-popups/popup-registry";
const { show } = useUserFormDialog();
const openDialog = () => {
  show();
};
</script>
