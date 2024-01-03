import { defaultConfigureOptions } from '@d-render/shared'
export default {
  ...defaultConfigureOptions(),
  options: {
    otherKey: ['optionProps', 'optApiConfig'],
    type: 'setOptions',
    label: '设置数据'
  },
  events: {
    hideItem: true,
    options: [
      { label: 'change事件', value: 'change' }
    ]
  }
}
