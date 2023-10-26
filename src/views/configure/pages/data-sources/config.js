import { dataInfoEntityEntity } from '@/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'

export const searchFieldList = generateFieldList(defineSearchFieldConfig({
  name: { label: '实体名称', hideLabel: true, placeholder: '请输入实体名称' }
}), dataInfoEntityEntity)

export const tableColumns = generateFieldList(defineTableFieldConfig({
  name: { label: '实体名称', showOverflowTooltip: true },
  remark: { showOverflowTooltip: true },
  createTime: { showOverflowTooltip: true }
}), dataInfoEntityEntity)

export const formFieldList = generateFieldList(defineFormFieldConfig({
  name: { label: '实体名称' },
  remark: {}
}), dataInfoEntityEntity)
