import { generateFieldList, defineTableFieldConfig, defineFormFieldConfig } from 'd-render'

// import { dataTypeOpts } from '@/lib/contants'

export function getFieldList (key, formModal, otherColumns = {}) {
  return generateFieldList(defineFormFieldConfig({
    [key]: {
      hideLabel: true,
      hideIndex: true,
      type: 'table',
      options: generateFieldList(defineTableFieldConfig({
        name: {
          writable: true,
          label: '变量名',
          require: true,
          regexpValidate: /^(?=[a-zA-Z|_])\w*$/,
          regexpValidateErrorMessage: '变量名由英文字母、数字、下划线组成，且必须以英文字母或下划线开头'
        },
        title: { writable: true, label: '描述' },
        value: { writable: true, label: '默认值' },
        dataType: { writable: true, label: '类型', defaultValue: 'STRING', type: 'dataType2', otherKey: 'refDataId', width: 200, clearable: false, tableData: formModal[key] },
        ...otherColumns
      }))
    }
  }))
}

export const outParamsFormFields = generateFieldList(defineTableFieldConfig({
  name: { label: '字段' },
  title: { label: '表头' }
}))
