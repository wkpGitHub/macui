export const componentsGroupList = [
  {
    groupName: 'function',
    label: '功能',
    components: [
      { type: 'curd', icon: 'el-icon-edit', label: '增删改查' }
    ]
  },
  {
    groupName: 'layout',
    label: '布局',
    components: [
      {
        type: 'pageLayoutList',
        icon: 'el-icon-edit',
        label: '列表布局',
        options: [
          { key: 'filter', children: [] },
          { key: 'default', children: [] }
        ]
      },
      {
        type: 'grid',
        icon: 'el-icon-edit',
        label: '栅格布局',
        gutter: 0,
        options: [
          {
            span: 12,
            children: []
          },
          {
            span: 12,
            children: []
          }
        ]
      }
    ]
  },
  {
    groupName: 'basic',
    label: '基础字段',
    components: [
      { type: 'input', icon: 'el-icon-edit', label: '单行文本' },
      { type: 'text', icon: 'el-icon-edit', label: '展示值' }
    ]
  },
  {
    groupName: 'advance',
    label: '高级字段',
    components: [
      {
        type: 'table',
        class: 'disabled-table',
        icon: 'el-icon-menu',
        label: '表格',
        hideLabel: true,
        options: []
      },
      {
        type: 'searchForm',
        class: 'disabled-table',
        icon: 'el-icon-menu',
        label: '搜索表单',
        hideLabel: true,
        options: [
          {
            key: 'default',
            children: []
          }
        ]
      },
      {
        type: 'form',
        class: 'disabled-table',
        icon: 'el-icon-menu',
        label: '表单',
        hideLabel: true,
        options: [
          {
            key: 'default',
            children: [
            ]
          }
        ]
      },
      {
        type: 'dialogForm',
        class: 'disabled-table',
        icon: 'el-icon-menu',
        label: '弹窗表单',
        hideLabel: true,
        options: []
      }
    ]
  }
]
