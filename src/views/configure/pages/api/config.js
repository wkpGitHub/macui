import { apiInfoEntityEntity } from '@/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'
import { apiConfigService } from '@/api/service/chr'

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
  name: {
    required: true
  },
  path: {
    required: true
  },
  pid: {
    label: 'API分组',
    type: 'select',
    optionProps: {
      label: 'name',
      value: 'id'
    },
    async asyncOptions () {
      const { data } = await apiConfigService.list({
        pid: 0
      })
      return data || []
    }
  },
  remark: {}
}), apiInfoEntityEntity)
