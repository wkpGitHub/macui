import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '实体活动',
  type: 'create-data-records',
  title: '新增记录',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    objectKey: {
      label: '数据源',
      required: true,
      otherKey: 'fields'
    },
    dataMode: {
      label: '新增模式',
      required: true,
      type: 'radio',
      defaultValue: 'single',
      options: [
        { label: '新增一条记录', value: 'single' },
        { label: '新增多条记录', value: 'multi' }
      ]
    },
    targetName: { label: '节点出参' },
    initFields: {
      type: 'selectField',
      label: '字段赋值',
      readable: false,
      dependOn: ['fields'],
      resetValue: true,
      changeConfig (config, { fields }) {
        config.writable = !!fields
        config.options = fields || []
        return config
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'create-data-records',
    title: '新增记录',
    conditions: {},
    children: []
  }
}
