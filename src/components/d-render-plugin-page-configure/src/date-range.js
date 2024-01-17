import { basicTwoInputConfigureOptions } from '@d-render/shared'
export default {
  ...basicTwoInputConfigureOptions(),
  otherKey: {
    label: '结束时间'
  },
  viewType: {
    label: '显示类型',
    type: 'select',
    options: ['date', 'datetime']
  },
  isTimestamp: {
    label: '是否获取时间戳',
    type: 'switch'
  },
  placeholder: {
    label: '开始时间占位'
  },
  otherPlaceholder: {
    type: 'input',
    label: '结束时间占位',
    limit: 20
  },
  formatter: {
    label: '展示格式',
    type: 'input',
    limit: 20
  },
  required: {},
  requiredErrorMessage: {}
}
