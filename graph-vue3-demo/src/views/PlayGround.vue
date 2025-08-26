<template>
  <el-cascader
    v-model="value"
    :options="options"
    :props="cascaderProps"
    clearable
  />
</template>

<script setup>
import { ref, watch } from "vue";

const value = ref([]);

const cascaderProps = {
  multiple: true, // 允许多选
  checkStrictly: false, // 父子联动，选中父级自动全选子级
  emitPath: false, // 返回最后一级的值（根据需要配置）
};
watch(
  () => value.value,
  () => {
    console.log(value.value, "------");
  }
);

const options = [
  {
    value: "a",
    label: "一级 A",
    children: [
      { value: "a1", label: "二级 A1" },
      { value: "a2", label: "二级 A2" },
    ],
  },
  {
    value: "b",
    label: "一级 B",
    children: [
      { value: "b1", label: "二级 B1" },
      { value: "b2", label: "二级 B2" },
    ],
  },
];
</script>
