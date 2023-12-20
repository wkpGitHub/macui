import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'
import { v4 as uuid } from 'uuid'
import { fields } from '../config'
export default {
  category: '流程管理',
  type: 'auto-entity-add-records',
  title: '新增记录',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称', defaultValue: '新增记录' },
    objectKey: {
      label: '选择对象',
      required: true,
      otherKey: 'fields',
      type: 'dataSource',
      fields
    },
    dataMode: {
      label: '实体对象',
      required: true,
      type: 'radio',
      defaultValue: 'single',
      options: [
        { label: '新增一条记录', value: 'single' },
        { label: '新增多条记录', value: 'multi' }
      ]
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
    totalFields: {
      hideItem: true,
      dependOn: ['fields'],
      changeValue ({ fields }) {
        return { value: fields }
      }
    },
    relationFields: {
      hideItem: true,
      defaultValue: ''
    },
    objectType: {
      dependOn: ['objectKey'],
      hideItem: true,
      changeValue ({ objectKey }) {
        if (!objectKey) return
        return { value: objectKey.split(':')[0] }
      }
    },
    initFields: {
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
    rootId: {
      hideItem: true,
      defaultValue: uuid()
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'auto-entity-add-records',
    title: '新增记录',

    children: []
  }
}
