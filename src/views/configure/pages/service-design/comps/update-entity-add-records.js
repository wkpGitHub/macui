import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'
import { v4 as uuid } from 'uuid'
import { fields } from '../config'
export default {
  category: '流程管理',
  type: 'update-entity-add-records',
  title: '更新记录',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称' },
    objectKey: {
      type: 'dataSource',
      label: '更新对象',
      required: true,
      otherKey: 'fields',
      fields
    },
    objectType: {
      dependOn: ['objectKey'],
      hideItem: true,
      changeValue ({ objectKey }) {
        if (!objectKey) return
        return { value: objectKey.split(':')[0] }
      }
    },
    form: {
      dependOn: ['fields', 'objectKey'],
      hideItem: true,
      changeValue ({ fields, objectKey }) {
        if (!objectKey) return
        const label = objectKey.split(':')[1]
        return {
          value: {
            description: '',
            fields,
            originRelation: [],
            relationFields: [],
            label,
            title: label,
            value: label
          }
        }
      }
    },
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
        { label: '复杂模式', value: 'advanced' }
      ]
    },
    filterFields: {
      type: 'filterCondition',
      dependOn: ['objectKey', 'fields'],
      readable: false,
      changeConfig (config, { objectKey, fields }) {
        config.writable = !!objectKey
        config.options = fields.map(item => ({ name: item.label, ename: item.name, type: item.type })) || []
        return config
      }
    },
    createRelationRecord: {
      dependOn: ['objectKey'],
      readable: false,
      changeConfig (config, { objectKey }) {
        config.writable = !!objectKey
        return config
      },
      label: '新增1:n、n:n关联表记录',
      type: 'switch'
    },
    updateFields: {
      type: 'table',
      dependOn: ['fields'],
      options: generateFieldList(defineTableFieldConfig({
        key: {
          dynamic: true,
          writable: true,
          outDependOn: ['fields'],
          type: 'select',
          optionProps: {
            label: 'label',
            value: 'name'
          },
          asyncOptions (_, { fields }) {
            if (!fields) return
            return fields || []
          }
        },
        formula: { writable: true }
      }))
    },
    relationFields: {
      hideItem: true,
      defaultValue: []
    },
    rootId: {
      hideItem: true,
      defaultValue: uuid()
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'update-entity-add-records',
    title: '更新记录',

    children: []
  }
}
