import { defaultConfigureOptions } from '@d-render/shared'
export default {
  ...defaultConfigureOptions(),
  events: {
    hideItem: true,
    options: [
      { label: 'change事件', value: 'change' }
    ]
  }
}
