import { dataInfoEntityEntity } from '@lc/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'

export const searchFieldList = generateFieldList(defineSearchFieldConfig({
  title: { label: '实体名称', hideLabel: true, placeholder: '请输入实体名称' }
}), dataInfoEntityEntity)

export const tableColumns = generateFieldList(defineTableFieldConfig({
  title: { label: '实体名称', showOverflowTooltip: true },
  remark: { showOverflowTooltip: true },
  createTime: { showOverflowTooltip: true }
}), dataInfoEntityEntity)

export const formFieldList = generateFieldList(defineFormFieldConfig({
  title: { label: '实体名称', required: true },
  name: {
    required: true,
    label: '数据表名称',
    span: 6,
    regexpValidate: /^[a-zA-Z][0-9a-zA-Z]+$/,
    regexpValidateErrorMessage: '只能以字母开头，允许输入数字、字母'
  },
  remark: {}
}), dataInfoEntityEntity)
