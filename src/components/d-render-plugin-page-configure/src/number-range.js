import { basicTwoInputConfigureOptions } from '@d-render/shared'

export default {
  ...basicTwoInputConfigureOptions(),
  otherKey: {
    label: '结束值'
  },
  min: {
    type: 'number',
    label: '最小值'
  },
  max: {
    type: 'number',
    label: '最大值'
  },
  step: {
    type: 'number',
    label: '步长',
    dependOn: ['precision'],
    changeConfig: ({ precision }, config) => {
      config.precision = precision
      return config
    }
  },
  precision: {
    type: 'number',
    label: '精度',
    min: 0
  },
  startPlaceholder: {
    label: '开始占位符',
    type: 'input',
    limit: 50
  },
  endPlaceholder: {
    label: '结束占位符',
    type: 'input',
    limit: 50
  },
  required: { },
  requiredErrorMessage: { }
}
