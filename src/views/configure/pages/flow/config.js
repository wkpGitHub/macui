import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'

const apiInfoEntityEntity = {
  name: { label: '名称' },
  remark: { label: '描述' }
}

export const searchFieldList = generateFieldList(defineSearchFieldConfig({
  name: {}
}), apiInfoEntityEntity)

export const tableColumns = generateFieldList(defineTableFieldConfig({
  name: {},
  remark: {}
}), apiInfoEntityEntity)

export const formFieldList = generateFieldList(defineFormFieldConfig({
  name: {
    required: true
  },
  remark: {}
}), apiInfoEntityEntity)
