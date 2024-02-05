import { generateFieldList, defineTableFieldConfig } from 'd-render'
import { paramsTableEntity } from './table-columns'

export const debugParamsTableColumn = generateFieldList(defineTableFieldConfig({
  name: {
    writable: false
  },
  type: {
    writable: false
  },
  operator: {
    writable: false
  },
  nullable: {
    writable: false
  },
  defaultValue: {
    label: '值',
    description: ''
  }
}), paramsTableEntity)
