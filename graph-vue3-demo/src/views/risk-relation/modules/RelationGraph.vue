<template>
  <!-- 图渲染的容器，id 用于 G6 挂载 -->
  <div id="graphView"></div>
</template>

<script setup>
// import { onMounted } from "vue";
// import { Graph } from "@antv/g6";
// import { data } from "@/views/risk-relation/modules/graphData";

// onMounted(() => {
// 文字长度限制
//   const lengthLimit = 6;

//   // 创建 G6 图实例
//   const graph = new Graph({
//     container: document.getElementById("graphView"), // 挂载点
//     data, // 图数据
//     node: {
//       style: {
//         // 节点填充色
//         fill: (d) => "#F6FFED",
//         // 节点描边色
//         stroke: (d) => "red",
//         lineWidth: 1.5,
//         // 节点图标
//         iconSrc:
//           "https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ",
//         iconWidth: 20,
//         iconHeight: 20,
//         // 徽标样式
//         badgeFill: "#fff",
//         badgePalette: (d) => ["blue"],
//         badges: (d) =>
//           d.id === "badges"
//             ? [
//                 {
//                   text: "Notice",
//                   placement: "bottom",
//                   backgroundRadius: 4,
//                 },
//               ]
//             : [],
//         badgeFontSize: 8,
//         badgePadding: [1, 4],
//         // 标签样式
//         labelFill: (d) => "pink",
//         labelText: (d) => d.id,
//         // 节点大小
//         size: 40,
//         // 光晕效果
//         haloStroke: "#227eff",
//         haloLineWidth: 104,
//         halo: (d) => d.id === "halo",
//       },
//     },
//     edge: {
//       style: {
//         stroke: "#7e3feb",
//         lineWidth: 2,
//         labelText: (d) =>
//           d.text?.length > 6 ? d.text.slice(0, 6) + "..." : d.text,
//         labelBackground: true,
//         labelBackgroundFill: "#f9f0ff",
//         labelBackgroundOpacity: 1,
//         labelBackgroundLineWidth: 2,
//         labelBackgroundStroke: "#7e3feb",
//         labelPadding: [1, 10],
//         labelBackgroundRadius: 4,
//       },
//     },
//     // 力导向布局
//     layout: {
//       type: "force",
//     },
//     // 其他配置...
//     plugins: [
//       {
//         type: "tooltip",
//         enable: (e, i) => {
//           // 文字长度限制
//           return e.targetType === "edge" && i[0].text.length > lengthLimit;
//         },
//         getContent: (_, i) => {
//           return i[0].text;
//         },
//       },
//       {
//         key: "minimap",
//         type: "minimap",
//         size: [200, 200],
//       },
//     ],
//   });

//   // 渲染图
//   graph.render();
// });
</script>
<style scoped>
#graphView {
  width: 100%;
  height: 100%;
}
</style>
