import { apiInfoEntityEntity } from '@/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'

export const searchFieldList = generateFieldList(defineSearchFieldConfig({
  path: {},
  name: {},
  devMode: {}
}), apiInfoEntityEntity)

export const tableColumns = generateFieldList(defineTableFieldConfig({
  path: {},
  name: {},
  fullPath: { minWidth: '110px' },
  devMode: {},
  remark: {},
  updateTime: {}
}), apiInfoEntityEntity)

export const formFieldList = generateFieldList(defineFormFieldConfig({

}), apiInfoEntityEntity)
