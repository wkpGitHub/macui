import { defaultConfigureOptions } from '@d-render/shared'
export default {
  ...defaultConfigureOptions(),
  events: {
    hideItem: true,
    options: [
      { label: 'change事件', value: 'change' },
      { label: '下拉框出现/隐藏事件', value: 'visible-change' },
      { label: '移除tag事件', value: 'remove-tag' },
      { label: '失焦事件', value: 'blur' },
      { label: '聚焦事件', value: 'focus' },
      { label: '清空事件', value: 'clear' }
    ]
  },
  options: {
    otherKey: ['asyncOptions', 'optionProps', 'optApiConfig'],
    type: 'setOptions',
    label: '设置数据'
  }
}
