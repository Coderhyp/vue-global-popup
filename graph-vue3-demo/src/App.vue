<script setup>
import ForceGraph from "./views/risk-relation/modules/RelationGraph.vue";
import GlobalPopupContainer from "./hooks/useGlobalPopup/components/GlobalPopupContainer.vue";
import { getActivePopups } from "./hooks/useGlobalPopup/core/popup-managers";
const activePopups = getActivePopups();
</script>

<template>
  <div>
    <router-view />
    <GlobalPopupContainer :active-popups="activePopups" />
  </div>
</template>

<style scoped></style>
