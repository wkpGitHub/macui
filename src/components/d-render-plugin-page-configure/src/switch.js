// import { defaultConfigureOptions } from '@d-render/shared'
export default {
  key: {},
  label: {
    label: '标题'
  },
  activeText: {
    label: '开始显示文本'
  },
  inactiveText: {
    label: '关闭显示文本'
  },
  activeValue: {
    label: '开启的值',
    type: 'pageFx'
  },
  inactiveValue: {
    label: '关闭的值',
    type: 'pageFx'
  },
  writable: {
    label: '是否表格编辑',
    type: 'switch'
  },
  events: {
    hideItem: true,
    options: [
      { label: 'change事件', value: 'change' }
    ]
  }
}
