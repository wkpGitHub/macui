import { slotsCommonConfig } from './slots-common-config'

export default {
  key: {},
  title: {
    label: '标题'
  },
  subTitle: {
    label: '副标题'
  },
  dialogType: {
    label: '弹窗类型',
    type: 'radio',
    defaultValue: 'dialog',
    options: [
      { label: 'dialog', value: 'dialog' },
      { label: 'drawer', value: 'drawer' }
    ]
  },
  defaultValue: {
    label: '默认开启状态',
    type: 'switch',
    defaultValue: true,
    activateValue: true,
    inactivateValue: false
  },
  size: {
    label: '尺寸大小（宽度）',
    type: 'select',
    defaultValue: 'default',
    options: [
      { label: 'mini(374px)', value: 'mini' },
      { label: 'small(586px)', value: 'small' },
      { label: 'default(860px)', value: 'default' },
      { label: 'large(1144px)', value: 'large' }
    ]
  },
  width: {
    label: '宽度'
  },
  top: {
    label: '定位高度',
    defaultValue: '15vh'
  },
  closeOnClickModal: {
    label: '点击遮罩层是否关闭dialog',
    type: 'switch',
    activateValue: true,
    inactivateValue: false,
    defaultValue: false
  },
  showOnly: {
    label: '只读',
    type: 'switch',
    activateValue: true,
    inactivateValue: false,
    defaultValue: false
  },
  buttonSize: {
    label: 'footer按钮大小',
    defaultValue: 'default',
    options: [
      { label: 'mini', value: 'mini' },
      { label: 'small', value: 'small' },
      { label: 'default', value: 'default' },
      { label: 'large', value: 'large' }
    ]
  },
  confirmText: {
    label: '确认按钮文字'
  },
  cancelText: {
    label: '取消按钮文字'
  },
  showCancel: {
    label: '是否展示取消按钮',
    type: 'switch',
    activateValue: true,
    inactivateValue: false,
    defaultValue: true
  },
  destroyOnClose: {
    label: '关闭时是否销毁dialog',
    type: 'switch',
    activateValue: true,
    inactivateValue: false,
    defaultValue: true
  },
  maxDepth: {
    label: '查找form的深度',
    type: 'number'
  },
  fullscreen: {
    label: '是否全屏',
    type: 'switch',
    activateValue: true,
    inactivateValue: false,
    defaultValue: false
  },
  onConfirm: {
    label: '确认函数'
  },
  beforeConfirm: {
    label: '确认前回调函数'
  },
  ...slotsCommonConfig([
    { value: 'default', label: '默认' },
    { value: 'footer', label: '底栏' }
  ])
}
