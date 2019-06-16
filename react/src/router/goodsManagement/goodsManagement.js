export default [
  {
    name: 'classifyManagement',
    path: '/supplySystem/:supplyId/commodityManagement/classifyManagement',
    meta: { title: '分类管理' },
    component: require('views/list.jsx').default
  },
  {
    name: 'specificationManagement',
    path: '/supplySystem/:supplyId/commodityManagement/specManagement',
    meta: { title: '规格管理' },
    component: require('views/spec.jsx').default
  }
]
