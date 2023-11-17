import { defaultConfigureOptions } from '@d-render/shared'
export default {
  ...defaultConfigureOptions(),
  key: {
    type: 'selectModuleField',
    otherKey: 'label'
  },
  events: {
    hideItem: true,
    options: [
      { label: '输入事件', value: 'input' },
      { label: '失焦事件', value: 'blur' },
      { label: '聚焦事件', value: 'focus' },
      { label: 'change事件', value: 'change' },
      { label: '清空事件', value: 'clear' }
    ]
  }
}
