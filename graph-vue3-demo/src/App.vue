<script setup>
import ForceGraph from "./views/risk-relation/modules/RelationGraph.vue";
import GlobalPopupContainer from "./hooks/useGlobalPopup/components/GlobalPopupContainer.vue";
</script>

<template>
  <div>
    <router-view />
    <GlobalPopupContainer></GlobalPopupContainer>
  </div>
</template>

<style scoped></style>
