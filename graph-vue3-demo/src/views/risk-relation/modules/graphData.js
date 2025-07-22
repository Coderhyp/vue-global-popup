// G6 图的数据，包含节点和边
export const data = {
  nodes: [
    { id: "node1" },
    { id: "node2" },
    { id: "node3" },
    { id: "badges" }, // 特殊节点用于演示徽标
  ],
  edges: [
    { source: "node1", target: "node2", text: "测测试测试测试测试试" },
    { source: "node2", target: "node3" },
    { source: "node3", target: "node1" },
    { source: "node1", target: "badges" },
  ],
};
