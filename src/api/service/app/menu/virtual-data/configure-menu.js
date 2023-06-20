export default [
  {
    name: 'configureDb',
    title: '数据库配置',
    cache: true
  },
  {
    name: '_dataModel',
    title: '数据模型',
    children: [
      { name: 'configureEnum', title: '枚举' },
      { name: 'configureEntity', title: '实体' },
      { name: 'configureDataStructure', title: '结构' }
    ]
  },
  {
    name: 'configureApi',
    title: '接口配置',
    cache: true
  },
  {
    name: 'configurePagesDesign',
    title: '页面设计',
    cache: true
  }

]
