<template lang="pug">
.risk-relation
    GraphFilter
    RelationGraph
</template>

<script setup>
import RelationGraph from "./modules/RelationGraph.vue";
import GraphFilter from "./modules/GraphFilter.vue";
</script>

<style scoped>
.risk-relation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
