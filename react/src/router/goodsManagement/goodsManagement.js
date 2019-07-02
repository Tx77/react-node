export default [
  {
    name: "classifyManagement",
    path: "/home/supplySystem/:supplyId/commodityManagement/classifyManagement",
    meta: { title: "分类管理" },
    component: require("views/list.jsx").default
  },
  {
    name: "modifyGoods",
    path:
      "/home/supplySystem/:supplyId/commodityManagement/classifyManagement/modify",
    meta: { title: "修改商品" },
    component: require("views/goods/modify.jsx").default
  },
  {
    name: "specificationManagement",
    path: "/home/supplySystem/:supplyId/commodityManagement/specManagement",
    meta: { title: "规格管理" },
    component: require("views/spec.jsx").default
  }
];
