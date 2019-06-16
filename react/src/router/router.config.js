export default [
  {
    name: 'supplySystem',
    title: '供应系统',
    path: '/supplySystem/:supplyId',
    component: 'components/blank.jsx',
    routes: [
      {
        path: '',
        component: 'components/blank.jsx',
        routes: [
          {
            name: 'classifyManagement',
            title: '分类管理',
            path: '/supplySystem/:supplyId/commodityManagement/classifyManagement',
            component: 'views/list.jsx'
          },
          {
            name: 'specManagement',
            title: '规格管理',
            path: '/supplySystem/:supplyId/commodityManagement/specManagement',
            component: 'views/spec.jsx'
          }
        ]
      }
    ]
  }
]
