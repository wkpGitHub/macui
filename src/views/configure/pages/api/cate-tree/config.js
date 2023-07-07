import { defineFormFieldConfig, generateFieldList } from 'd-render'

export const formFieldList = generateFieldList(defineFormFieldConfig({
  name: { label: '分类名称', required: true, limit: 10 }
  // remark: { label: '备注', limit: 30 }
}))
