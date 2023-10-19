import { generateFieldList, defineTableFieldConfig } from 'd-render'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  username: { },
  userName: {},
  sex: {},
  birthday: { align: 'center' },
  createTime: {},
  status: {},
  num: { width: '100px' }
}))

export const fieldList = generateFieldList({
  searchFields: {
    readable: false
  },
  searchFieldKeys: {
    type: 'select',
    label: '搜索栏字段',
    multiple: true,
    dependOn: ['fields'],
    otherKey: ['searchFieldLabel', 'searchFields'],
    asyncOptions: async ({ fields }) => {
      return fields
    }
  },
  tableFields: {
    readable: false
  },
  tableFieldKeys: {
    type: 'select',
    label: '表格展示字段',
    multiple: true,
    dependOn: ['fields'],
    otherKey: ['tableFieldLabel', 'tableFields'],
    asyncOptions: async ({ fields }) => {
      return fields
    }
  }
})

const typeMap = {
  BOOLEAN: { type: 'switch' },
  INT: { type: 'number' },
  BIGINT: { type: 'number' },
  DOUBLE: { type: 'number' },
  DECIMAL: { type: 'number' },
  Date: { type: 'date', config: { viewType: 'date' } },
  TIME: { type: 'time' },
  DATETIME: { type: 'date', config: { viewType: 'datetime' } },
  TEXT: 'text'
}

const uuid = () => {
  return uuidv4().substring(0, 8)
}

export const fieldToConfig = (fields) => {
  return fields?.map((f, i) => {
    const { title: label, typeName } = f
    const type = typeMap[typeName]?.type || 'input'
    const config = typeMap[typeName]?.config || {}
    const uid = uuid()
    return {
      config: {
        ...config,
        label,
        type,
        width: '100%'
      },
      key: `${type}_${uid}`,
      id: `${type}_${uid}`
    }
  })
}

// 一个curd组件的通用配置
export const generateFinalConfig = ({ searchFields, tableFields, dialogFields }) => {
  const dialogKey = 'dialogKey_' + uuid()
  return {
    list: [
      {
        config: {
          type: 'pageLayoutList',
          icon: 'el-icon-edit',
          label: '列表布局',
          options: [
            {
              key: 'filter',
              children: [
                {
                  config: {
                    type: 'searchForm',
                    icon: 'el-icon-menu',
                    label: '搜索表单',
                    hideLabel: true,
                    options: [
                      {
                        key: 'default',
                        children: cloneDeep(searchFields)
                      }
                    ],
                    id: 'searchForm_' + uuid(),
                    key: 'searchForm_' + uuid(),
                    hideItem: false,
                    hideSearch: false,
                    searchButtonText: '查询',
                    labelPosition: 'top'
                  },
                  id: 'searchForm_' + uuid(),
                  key: 'searchForm_' + uuid()
                }
              ]
            },
            {
              key: 'default',
              children: [
                {
                  config: {
                    type: 'pageTable',
                    class: 'disabled-table',
                    icon: 'el-icon-menu',
                    label: '表格',
                    hideLabel: true,
                    options: [
                      {
                        key: 'default',
                        children: [
                          ...cloneDeep(tableFields),
                          {
                            config: {
                              type: 'tableButton',
                              label: '操作',
                              dynamic: true,
                              options: [
                                {
                                  key: '',
                                  text: '编辑',
                                  click: [
                                    {
                                      eventType: 'openDialog',
                                      eventName: '打开弹窗',
                                      pageUrl: '',
                                      pageParams: [],
                                      isNewTab: true,
                                      index: 0,
                                      dialogKey
                                    }
                                  ],
                                  index: 0
                                },
                                {
                                  key: '',
                                  text: '删除',
                                  index: 1,
                                  click: [
                                    {
                                      eventType: 'method',
                                      eventName: '函数',
                                      methods: 'delete',
                                      index: 0
                                    }
                                  ]
                                }
                              ],
                              dependOn: []
                            },
                            id: 'tableButton_' + uuid(),
                            key: ''
                          }
                        ]
                      }
                    ],
                    hideItem: false,
                    parentType: 'pageLayoutList',
                    id: 'pageTable_' + uuid(),
                    key: 'pageTable_' + uuid()
                  },
                  id: 'pageTable_' + uuid(),
                  key: 'pageTable_' + uuid()
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
                    key: 'page.pageSize',
                    otherKey: [
                      'page.pageNum',
                      'page.total'
                    ],
                    pageSizes: [
                      5,
                      8,
                      10,
                      15,
                      20
                    ],
                    onRefresh: [
                      {
                        eventType: 'method',
                        eventName: '函数',
                        methods: 'page'
                      }
                    ]
                  },
                  id: 'pagination_' + uuid(),
                  key: 'pagination_' + uuid()
                }
              ]
            },
            {
              key: 'title',
              children: []
            },
            {
              key: 'handle',
              children: [
                {
                  config: {
                    type: 'button',
                    label: '按钮',
                    text: '新增',
                    key: 'button_' + uuid(),
                    id: 'button_' + uuid(),
                    icon: 'el-icon-plus',
                    click: [
                      {
                        eventType: 'openDialog',
                        eventName: '打开弹窗',
                        dialogKey,
                        index: 3
                      }
                    ],
                    inputType: 'primary'
                  },
                  id: 'button_' + uuid(),
                  key: 'button_' + uuid()
                },
                {
                  config: {
                    type: 'button',
                    label: '按钮',
                    text: '删除',
                    icon: 'el-icon-delete'
                  },
                  id: 'button_' + uuid(),
                  key: ''
                }
              ]
            }
          ],
          hideItem: false,
          key: 'pageLayoutList_' + uuid(),
          id: 'pageLayoutList_' + uuid(),
          canBack: false,
          title: '页面标题',
          config: {
            key: 'pageLayoutList_' + uuid(),
            id: 'pageLayoutList_' + uuid(),
            changeConfigType: 'writing',
            changeValueType: 'writing',
            dependOn: [],
            width: '100%'
          },
          usingSlots: [
            'filter',
            'default',
            'pagination',
            'title',
            'handle'
          ]
        },
        id: 'pageLayoutList_' + uuid(),
        key: 'pageLayoutList_' + uuid()
      },
      {
        config: {
          type: 'dialog',
          class: 'disabled-table',
          icon: 'el-icon-menu',
          label: '弹窗',
          hideLabel: true,
          usingSlots: [
            'default'
          ],
          options: [
            {
              key: 'default',
              children: [
                {
                  config: {
                    type: 'form',
                    class: 'disabled-table',
                    icon: 'el-icon-menu',
                    label: '表单',
                    hideLabel: true,
                    usingSlots: [
                      'default'
                    ],
                    options: [
                      {
                        key: 'default',
                        children: cloneDeep(dialogFields)
                      }
                    ],
                    key: 'item',
                    id: 'form_' + uuid(),
                    labelPosition: 'right',
                    grid: 1,
                    hideItem: false,
                    parentType: 'dialog'
                  },
                  id: 'form_' + uuid(),
                  key: 'item'
                }
              ]
            }
          ],
          key: 'dialog_' + uuid(),
          id: 'dialog_' + uuid(),
          width: '100%',
          dependOn: [],
          changeValueType: 'writing',
          changeConfigType: 'writing',
          hideItem: false,
          dialogType: 'dialog',
          defaultValue: true,
          closeOnClickModal: false,
          showOnly: false,
          showCancel: true,
          destroyOnClose: true,
          fullscreen: false,
          top: '15vh',
          buttonSize: 'default',
          size: 'default',
          title: '弹窗',
          config: {
            key: 'dialog_' + uuid(),
            id: 'dialog_' + uuid(),
            changeConfigType: 'writing',
            changeValueType: 'writing',
            dependOn: [],
            width: '100%'
          },
          subTitle: '',
          confirm: [
            {
              eventType: 'method',
              eventName: '函数',
              methods: 'save'
            }
          ]
        },
        id: 'dialog_' + uuid(),
        key: 'dialog_' + uuid()
      }
    ],
    init: [
      'page'
    ],
    methods: [

    ],
    grid: 1,
    labelSuffix: ' ',
    labelPosition: 'right',
    tableSize: 'default',
    apiList: []
  }
}
