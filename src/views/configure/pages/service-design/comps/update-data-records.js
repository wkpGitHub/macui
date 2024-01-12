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
    targetName: { label: '节点出参' },
    filterMode: {
      dependOn: ['objectKey'],
      readable: false,
      changeConfig (config, { objectKey }) {
        config.writable = !!objectKey
        return config
      },
      label: '类型选择',
      required: true,
      type: 'radio',
      defaultValue: 'normal',
      options: [
        { label: '简单模式', value: 'normal' },
        { label: '表达式', value: 'fx' }
      ]
    },
    filterFields: {
      type: 'filterCondition',
      dependOn: ['objectKey', 'fields', {
        key: 'filterMode',
        effect: {
          changeValue ({ filterMode }) {
            let value = {
              logic: 'and',
              children: []
            }
            if (filterMode === 'fx') {
              value = []
            }
            return { value }
          }
        }
      }],
      readable: false,
      changeConfig (config, { objectKey, fields, filterMode }) {
        config.writable = !!objectKey
        config.type = filterMode === 'fx' ? 'setFx' : 'filterCondition'
        config.options = cloneDeep(fields || [])
        return config
      }
    },
    // showCreateRelationRecord: {
    //   hideItem: true,
    //   defaultValue: true
    // },
    // createRelationRecord: {
    //   dependOn: ['objectKey'],
    //   readable: false,
    //   changeConfig (config, { objectKey }) {
    //     config.writable = !!objectKey
    //     return config
    //   },
    //   label: '新增1:n、n:n关联表记录',
    //   type: 'switch'
    // },
    updateFields: {
      type: 'selectField',
      label: '字段赋值',
      readable: false,
      dependOn: ['fields'],
      resetValue: true,
      changeConfig (config, { fields }) {
        config.writable = !!fields
        const temp = (fields || []).filter(v => !v.isPrimaryKey)
        config.options = cloneDeep(temp)
        return config
      }
    },
    relationFields: {
      hideItem: true,
      defaultValue: []
    },
    mFields: {
      hideItem: true,
      defaultValue: []
    },
    rFields: {
      hideItem: true,
      defaultValue: []
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'update-data-records',
    title: '更新记录',

    children: [],
    validateFailed: false
  }
}
