import { generateFieldList, defineFormFieldConfig } from 'd-render'
import { cloneDeep } from 'lodash-es'

export default {
  category: '变量活动',
  type: 'insert-data',
  title: '插入数据',
  formField: generateFieldList(defineFormFieldConfig({
    targetName: { label: '出参名称', required: true },
    objectKey: {
      type: 'dataSource',
      label: '数据源',
      required: true,
      otherKey: 'fields'
    },
    dataFields: {
      label: '字段赋值',
      type: 'selectField',
      dependOn: ['objectKey', 'fields'],
      readable: false,
      changeConfig (config, { objectKey, fields }) {
        config.writable = !!objectKey
        return config
      },
      async asyncOptions ({ fields }) {
        return cloneDeep(fields || [])
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'insert-data',
    title: '插入数据',

    children: []
  }
}
