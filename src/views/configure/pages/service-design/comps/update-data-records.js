import { generateFieldList, defineFormFieldConfig } from 'd-render'
import { cloneDeep } from 'lodash-es'

export default {
  category: '实体活动',
  type: 'update-data-records',
  title: '更新记录',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    objectKey: {
      type: 'dataSource',
      label: '数据源',
      required: true,
      otherKey: 'fields'
    },
    filterMode: {
      dependOn: ['objectKey'],
      readable: false,
      changeConfig (config, { objectKey }) {
        config.writable = !!objectKey
        return config
      },
      label: '新增模式',
      required: true,
      type: 'radio',
      defaultValue: 'normal',
      options: [
        { label: '简单模式', value: 'normal' },
        { label: '复杂模式', value: 'advanced' }
      ]
    },
    filterFields: {
      type: 'filterCondition',
      dependOn: ['objectKey', 'fields'],
      readable: false,
      changeConfig (config, { objectKey, fields }) {
        config.writable = !!objectKey
        config.options = fields || []
        return config
      }
    },
    createRelationRecord: {
      label: '新增1:n、n:n关联表记录',
      type: 'switch'
    },
    updateFields: {
      type: 'selectField',
      label: '',
      readable: false,
      dependOn: ['fields'],
      resetValue: true,
      changeConfig (config, { fields }) {
        config.writable = !!fields
        const temp = (fields || []).filter(v => !v.isPrimaryKey)
        config.options = cloneDeep(temp)
        return config
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'update-data-records',
    title: '更新记录',
    conditions: {},
    children: []
  }
}
