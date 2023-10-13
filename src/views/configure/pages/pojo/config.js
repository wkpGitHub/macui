import { generateFieldList, defineTableFieldConfig, defineFormFieldConfig, defineSearchFieldConfig } from '@cip/utils/config-util'

export const pageEntity = {
  name: { label: '名称' },
  createTime: { label: '创建时间', type: 'date', viewType: 'datetime' }
}

export const searchFieldList = generateFieldList(defineSearchFieldConfig({
  name: {}
}), pageEntity)

export const tableColumns = generateFieldList(defineTableFieldConfig({
  name: { showOverflowTooltip: true },
  createTime: { }
}), pageEntity)

export const formFieldList = generateFieldList(defineFormFieldConfig({
  name: { required: true }
}), pageEntity)
