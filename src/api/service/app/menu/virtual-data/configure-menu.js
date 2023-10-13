export default [
  {
    name: 'configureDb',
    title: '数据库配置',
    cache: true
  },
  {
    name: 'configureDataSources',
    title: '实体'
  },
  {
    name: 'configureDic',
    title: '字典'
  },
  {
    name: 'configurePojo',
    title: '自定义对象'
  },
  {
    name: 'configureConnectorManager',
    title: '连接器管理',
    cache: true,
    children: [
      {
        name: 'configureConnectorManagerItem',
        title: '连接器服务项管理',
        hideInMenu: true
      }
    ]
  },
  {
    name: 'configureApi',
    title: '接口配置',
    cache: true,
    children: [
      {
        name: 'configureServiceDesign',
        title: '服务编排',
        hideInMenu: true
      }
    ]
  },
  {
    name: 'configurePagesManager',
    title: '页面管理',
    cache: true
  },
  {
    name: 'configureFlow',
    title: '流程管理',
    cache: true,
    children: [
      { name: 'configureFlowDesign', title: '流程设计', hideInMenu: true }
    ]
  }
]
