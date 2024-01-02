import { apiInfoEntityEntity } from '@lc/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'
import { apiConfigService } from '@lc/api/service/chr'

const apiTypeOpts = [
  { label: '查询', value: 'query' },
  { label: '详情', value: 'detail' },
  { label: '保存', value: 'save' },
  { label: '删除', value: 'delete' },
  { label: '统计', value: 'agg' },
  { label: '上传', value: 'fileUpload' },
  { label: '下载', value: 'fileDown' },
  { label: '图片', value: 'image' }
]

export const searchFieldList = generateFieldList(defineSearchFieldConfig({
  path: {},
  name: {},
  devMode: {}
}), apiInfoEntityEntity)

export const tableColumns = generateFieldList(defineTableFieldConfig({
  name: {},
  fullPath: { minWidth: '110px' },
  devMode: {},
  apiType: {
    label: '接口类型',
    type: 'select',
    options: apiTypeOpts
  },
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
    required: true,
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
