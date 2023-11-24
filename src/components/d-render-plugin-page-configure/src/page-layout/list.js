import { slotsCommonConfig } from '../slots-common-config'
import { getItemConfig } from '../../utils'
export default {
  api: {
    type: 'select-api',
    label: '查询接口',
    dependOn: ['options', 'key', 'searchParams'],
    onChange ({ row, api, updateDataModel, dependOn, getListConfigByType, fetchData }) {
      const children = []
      dependOn.options?.forEach(o => o.children && children.push(...o.children))
      const searchForm = getListConfigByType(children, 'searchForm')
      const pageTable = getListConfigByType(children, 'pageTable')
      if (searchForm) {
        searchForm.config.options = [{
          key: 'default',
          children: (row.flow?.inputParams || []).map(opt => getItemConfig(opt))
        }]
      }
      if (pageTable) {
        pageTable.config.options = [{
          key: 'default',
          children: (row.flow?.outParams || []).map(opt => getItemConfig(opt))
        }]
      }
    }
  },
  title: {
    label: '页面标题'
  },
  canBack: {
    label: '是否可以返回',
    type: 'switch'
  },
  ...slotsCommonConfig([
    { value: 'filter', label: '搜索栏' },
    { value: 'handle', label: '操作' },
    { value: 'title', label: '表标题' },
    { value: 'default', label: '默认' },
    { value: 'pagination', label: '分页' }
  ])
}
