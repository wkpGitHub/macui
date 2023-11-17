import { defaultConfigureOptions } from '@d-render/shared'
export default {
  ...defaultConfigureOptions(),
  events: {
    hideItem: true,
    options: [
      { label: '失焦事件', value: 'blur' },
      { label: '聚焦事件', value: 'focus' },
      { label: 'change事件', value: 'change' }
    ]
  }
}
