<template lang="pug">
.graph-filter-container
  el-tabs(v-model="currentScene" type="card")
    el-tab
</template>

<script setup lang="ts">
import { ref } from "vue";

// 这里可以添加 props、emits、逻辑等
const filterConfig = [
  {
    value: "caseJudge",
    name: "11",
    relationFilters: [
      {
        label: "aa",
        value: "virtualRealRelation",
        enable: true,
        children: [
          {
            label: "xx",
            value: "phoneDeviceRelation",
            enable: true,
          },
          {
            label: "yy",
            value: "computerDeviceRelation",
            enable: true,
          },
          {
            label: "zz",
            value: "socialAccountRelation",
            enable: true,
          },
        ],
      },
    ],
    nodeRiskFilters: [
      {
        label: "bb",
        value: "caseRelated",
        enable: true,
      },
    ],
  },
  {
    value: "personRelation",
    name: "22",
    relationFilters: [
      {
        label: "33",
        value: "riskBehaviorRelation",
        enable: true,
        children: [
          {
            label: "qq",
            value: "riskBehaviorRelation",
            enable: true,
          },
        ],
      },
    ],
    nodeRiskFilters: [
      {
        label: "mm",
        value: "caseRelated",
        enable: true,
      },
    ],
  },
];
const currentScene = ref("caseJudge");
</script>

<style scoped>
.graph-filter-container {
  width: 256px;
  min-height: 100vh;
  background: #f5f7fa;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
  padding: 16px;
  box-sizing: border-box;
}
</style>
