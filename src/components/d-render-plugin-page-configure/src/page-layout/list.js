import { slotsCommonConfig } from '../slots-common-config'
export default {
  key: {},
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
