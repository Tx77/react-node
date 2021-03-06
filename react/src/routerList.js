export default [
  {
    'id': 1,
    'resourcesUrl': '/home/supplySystem/1',
    'resourcesName': '供应系统',
    'childResourcesEntityList': [
      {
        'id': 110,
        'resourcesUrl': '',
        'resourcesName': '商品管理',
        'childResourcesEntityList': [
          {
            'id': 111,
            'resourcesUrl': '/home/supplySystem/1/commodityManagement/classifyManagement',
            'resourcesName': '分类管理',
            'childResourcesEntityList': []
          }
        ]
      },
      {
        'id': 120,
        'resourcesUrl': '/home/supplySystem/1/commodityManagement/specManagement',
        'resourcesName': '分类管理',
        'childResourcesEntityList': []
      }
    ]
  },
  {
    'id': 2,
    'resourcesUrl': '/home/supplySystem/2',
    'resourcesName': '管理系统',
    'childResourcesEntityList': [
      {
        'id': 301,
        'resourcesUrl': '/home/supplySystem/2/statisticsAnalysis',
        'resourcesName': '统计分析',
        'childResourcesEntityList': [
          {
            'id': 311,
            'resourcesUrl': '/home/supplySystem/2/reportSystem',
            'resourcesName': '报表系统',
            'childResourcesEntityList': []
          }
        ]
      },
      {
        'id': 302,
        'resourcesUrl': '/home/supplySystem/2/statisticsReport',
        'resourcesName': '统计报表',
        'childResourcesEntityList': [
          {
            'id': 321,
            'resourcesUrl': '/home/supplySystem/2/statisticsReportDetail',
            'resourcesName': '报表详情',
            'childResourcesEntityList': []
          }
        ]
      }
    ]
  }
]
