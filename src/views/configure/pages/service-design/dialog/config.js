import { generateFieldList, defineTableFieldConfig } from 'd-render'

export const dataTypeOpts = [
  {
    label: '文本',
    value: 'string'
  },
  {
    label: '数字',
    value: 'number'
  },
  {
    label: '布尔',
    value: 'boolean'
  },
  {
    label: '对象',
    value: 'object'
  },
  {
    label: '数组',
    value: 'array'
  }
]

export const dataTypeTableColumns = generateFieldList(defineTableFieldConfig({
  label: { writable: true, label: '变量名' },
  value: { writable: true, label: '默认值' },
  dataType: { writable: true, label: '类型', defaultValue: 'string', type: 'select', options: dataTypeOpts, clearable: false }
}))
