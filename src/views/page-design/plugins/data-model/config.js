import { defineFormFieldConfig, defineTableFieldConfig, generateFieldList } from '@cip/utils/config-util.js'

export const formField = generateFieldList(defineFormFieldConfig({
  name: { label: '字段', required: true },
  title: { label: '描述', required: true },
  dataType: { label: '数据类型', type: 'dataType2', width: 240 }
}))

export const modelFiled = (list) => generateFieldList(defineFormFieldConfig({
  name: {
    label: '数据模型名称',
    description: '数据模型名称需要保证唯一性',
    required: true,
    customValidators: [
      function (val) {
        return {
          data: !list.find(item => item.name === val),
          message: '数据模型名称已存在！'
        }
      }
    ]
  },
  title: { hideItem: true, dependOn: ['name'], changeValue ({ name }) { return { value: name } } },
  children: {
    label: '字段集合',
    type: 'table',
    tableColumnStatus: 'writable',
    options: generateFieldList(defineTableFieldConfig({
      name: { label: '字段', required: true },
      title: { label: '描述', required: true },
      dataType: { label: '数据类型', type: 'dataType2', width: 240 }
    }))
  }
}))
