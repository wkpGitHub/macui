const curdConfig = {
  type: 'curd',
  icon: 'el-icon-edit',
  label: '增删改查',
  usingSlots: ['filter', 'handle', 'default', 'pagination', 'dialog'],
  options: [
    {
      key: 'filter',
      children: [
        {
          config: {
            type: 'searchForm',
            class: 'disabled-table',
            label: '搜索表单',
            hideLabel: true,
            options: [
              {
                key: 'default',
                children: []
              }
            ]
          }
        }
      ]
    },
    {
      key: 'handle',
      children: []
    },
    {
      key: 'default',
      children: [
        {
          config: {
            type: 'pageTable',
            class: 'disabled-table',
            label: '表格',
            withDefaultHandle: true,
            selectType: 'checkbox',
            options: [
              {
                key: 'default',
                children: []
              }
            ]
          }
        }
      ]
    },
    {
      key: 'pagination',
      children: [
        {
          config: {
            type: 'pagination',
            label: '分页器',
            limit: 10,
            offset: 1,
            layout: 'total,sizes,prev,pager,next,jumper',
            pageSizes: [5, 10, 15, 20]
          }
        }
      ]
    },
    {
      key: 'dialog',
      children: [
        {
          config: {
            type: 'dialog',
            label: '弹窗',
            title: '新增',
            options: [
              {
                key: 'default',
                children: [
                  {
                    config: {
                      type: 'form',
                      class: 'disabled-table',
                      label: '表单',
                      usingSlots: ['default'],
                      options: [{ key: 'default', children: [] }]
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  ]
}

export const componentsGroupList = [
  {
    groupName: 'function',
    label: '功能',
    components: [
      curdConfig,
      {
        type: 'pageLeftRight',
        icon: 'el-icon-edit',
        label: '左右布局',
        options: [
          {
            key: 'left',
            children: [
              {
                config: {
                  type: 'tree',
                  label: '树'
                }
              }
            ]
          },
          {
            key: 'default',
            children: [
              {
                config: curdConfig
              }
            ]
          }
        ]
      },
      {
        type: 'pageInfo',
        icon: 'el-icon-edit',
        label: '详情页',
        options: [
          { key: 'default', children: [] }
        ]
      },
      {
        type: 'pageHandle',
        icon: 'el-icon-edit',
        label: '编辑页',
        options: [
          { key: 'default', children: [] },
          { key: 'handle', children: [] }
        ]
      }
    ]
  },
  {
    groupName: 'charts',
    label: '图形',
    components: [
      {
        type: 'barChart',
        icon: 'el-icon-s-operation',
        label: '柱状图',
        hideLabel: true
      },
      {
        type: 'lineChart',
        icon: 'el-icon-s-operation',
        label: '折线图',
        hideLabel: true
      },
      {
        type: 'scatterChart',
        icon: 'el-icon-s-operation',
        label: '散点图',
        hideLabel: true
      },
      {
        type: 'pieChart',
        icon: 'el-icon-s-operation',
        label: '饼图',
        hideLabel: true
      },
      {
        type: 'sankeyChart',
        icon: 'el-icon-s-operation',
        label: '桑基图',
        hideLabel: true
      },
      {
        type: 'stackAreaChart',
        icon: 'el-icon-s-operation',
        label: '堆叠折线图',
        hideLabel: true
      },
      {
        type: 'stackBarChart',
        icon: 'el-icon-s-operation',
        label: '堆叠柱状图',
        hideLabel: true
      }
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
          { key: 'handle', children: [] },
          { key: 'default', children: [] },
          { key: 'pagination', children: [] }
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
      },
      {
        type: 'div',
        icon: 'el-icon-box',
        label: 'div容器',
        options: [
          { key: 'default', children: [] }
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
      { type: 'link', icon: 'el-icon-link', label: '超链接' },
      { type: 'slider', icon: 'el-icon-s-operation', label: '滑块', max: 100, min: 0, step: 1 },
      { type: 'text', icon: 'el-icon-tickets', label: '文字', hideLabel: true, defaultValue: '这里是文字', fontWeight: 'normal', fontSize: 14, textAlign: 'left' },
      { type: 'img', icon: 'el-icon-edit', label: '图片' },
      { type: 'text', icon: 'el-icon-edit', label: '展示值' },
      { type: 'pagination', icon: 'el-icon-edit', label: '分页器', limit: 10, offset: 1, pageSizes: [5, 8, 10, 15, 20] },
      { type: 'tree', icon: 'el-icon-menu', label: '树' },
      { type: 'button', icon: 'el-icon-edit', label: '按钮', text: '按钮' },
      {
        type: 'tableButton',
        icon: 'el-icon-edit',
        _label: '操作栏',
        label: '操作',
        dependOn: ['id'],
        dynamic: true,
        options: [
          { text: '编辑', click: [] },
          { text: '删除', click: [] }
        ],
        events: {
          click: {
            label: '点击事件',
            type: 'click',
            args: ['当前行数据', '当前行索引']
          }
        }
      }
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
        usingSlots: ['default'],
        options: [
          {
            key: 'default',
            children: [
            ]
          }
        ]
      },
      {
        type: 'dialog',
        class: 'disabled-table',
        icon: 'el-icon-menu',
        label: '弹窗',
        hideLabel: true,
        usingSlots: ['default'],
        options: [
          {
            key: 'default',
            children: []
          }
        ]
      },
      { type: 'pagination', icon: 'el-icon-menu', label: '分页器', limit: 10, offset: 1 }
    ]
  }
]
