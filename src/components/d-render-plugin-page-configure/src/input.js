import { defaultConfigureOptions } from '@d-render/shared'
export default {
  ...defaultConfigureOptions(),
  events: {
    hideItem: true,
    options: [
      { label: '输入事件', value: 'input' },
      { label: '失去焦点事件', value: 'blur' }
    ]
  }
}
