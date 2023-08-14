import { generateFieldList, defineTableFieldConfig } from 'd-render'

import { dataTypeOpts } from '@/lib/contants'

export const dataTypeTableColumns = generateFieldList(defineTableFieldConfig({
  label: { writable: true, label: '变量名' },
  value: { writable: true, label: '默认值' },
  dataType: { writable: true, label: '类型', defaultValue: 'string', type: 'select', options: dataTypeOpts, clearable: false }
}))
