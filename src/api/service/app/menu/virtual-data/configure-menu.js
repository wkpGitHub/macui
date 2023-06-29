export default [
  {
    name: 'configureDb',
    title: '数据库配置',
    cache: true
  },
  {
    name: 'configureDataModel',
    title: '数据模型',
    cache: true
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
  }
]
