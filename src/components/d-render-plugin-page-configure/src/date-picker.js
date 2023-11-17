import { defaultConfigureOptions } from '@d-render/shared'
export default {
  ...defaultConfigureOptions(),
  events: {
    hideItem: true,
    options: [
      { label: 'change事件', value: 'change' },
      { label: '下拉框出现/隐藏事件', value: 'visible-change' },
      { label: '失焦事件', value: 'blur' },
      { label: '聚焦事件', value: 'focus' },
      { label: '日历所选日期更改事件', value: 'calendar-change' },
      { label: '日期面板改变事件', value: 'panel-change' }
    ]
  }
}
