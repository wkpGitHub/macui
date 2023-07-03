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
        usingSlots: ['filter', 'handle', 'default', 'pagination'],
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
      { type: 'textarea', icon: 'el-icon-edit', label: '多行文本' },
      { type: 'date', icon: 'el-icon-date', label: '日期' },
      { type: 'dateRange', icon: 'el-icon-date', label: '日期范围' },
      { type: 'time', icon: 'el-icon-time', label: '时间' },
      { type: 'timeRange', icon: 'el-icon-time', label: '时间范围' },
      { type: 'radio', icon: 'el-icon-document-checked', label: '单选框组', options: ['选项一', '选项二', '选项三'], display: 'inline-flex' },
      { type: 'checkbox', icon: 'el-icon-document-checked', label: '多选框组', options: ['选项一', '选项二', '选项三'], display: 'inline-flex' },
      { type: 'number', icon: 'el-icon-set-up', label: '计数器', min: 0, step: 1 },
      { type: 'numberRange', icon: 'el-icon-set-up', label: '计数区间', min: 0, step: 1, width: '100%' },
      { type: 'select', icon: 'el-icon-bottom', label: '下拉选择框', options: ['选项一', '选项二', '选项三'] },
      { type: 'switch', icon: 'el-icon-open', label: '开关' },
      { type: 'rate', icon: 'el-icon-star-off', label: '评分', max: 5 },
      { type: 'slider', icon: 'el-icon-s-operation', label: '滑块', max: 100, min: 0, step: 1 },
      { type: 'text', icon: 'el-icon-tickets', label: '文字', hideLabel: true, defaultValue: '这里是文字', fontWeight: 'normal', fontSize: 14, textAlign: 'left' }
    ]
  },
  {
    groupName: 'advance',
    label: '高级字段',
    components: [
      {
        type: 'pageTable',
        class: 'disabled-table',
        icon: 'el-icon-menu',
        label: '表格',
        hideLabel: true,
        options: [
          {
            key: 'default',
            children: []
          }
        ]
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
  },
  {
    groupName: 'button',
    label: '表格按钮',
    components: [
      {
        type: 'tableButton',
        icon: 'el-icon-edit',
        label: '表格按钮',
        options: [
          { key: '', text: '详情', click: 'info' },
          { key: '', text: '删除', click: 'delete' }
        ]
      }
    ]
  }
]
