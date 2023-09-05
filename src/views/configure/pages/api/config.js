import { apiInfoEntityEntity } from '@/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'
import { apiConfigService } from '@/api/service/chr'

const apiTypeOpts = [
  { label: '查询', value: 'query' },
  { label: '详情', value: 'detail' },
  { label: '保存', value: 'save' },
  { label: '删除', value: 'delete' },
  { label: '统计', value: 'agg' }
]

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
  apiType: {
    label: '接口类型',
    type: 'select',
    required: true,
    options: apiTypeOpts
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
