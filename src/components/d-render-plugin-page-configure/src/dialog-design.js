import { getItemConfig } from '../utils'
import { v4 as uuidv4 } from 'uuid'

export default {
  title: { label: '标题', defaultValue: '弹窗' },
  api: {
    label: '接口',
    type: 'select-api',
    dependOn: ['options', 'key'],
    onChange ({ api, dependOn, getListConfigByType }) {
      const children = []
      dependOn.options?.forEach(o => o.children && children.push(...o.children))
      const form = getListConfigByType(children, 'form')
      if (form.key) {
        form.config.options = [{
          key: 'default',
          children: (api.inputParams || []).map(opt => getItemConfig(opt))
        }]
      } else {
        const _key = uuidv4()
        dependOn.options[0].children = [{
          key: _key,
          id: _key,
          config: {
            type: 'form',
            class: 'disabled-table',
            key: _key,
            id: _key,
            label: '表单',
            usingSlots: ['default'],
            options: [{
              key: 'default',
              children: (api.inputParams || []).map(opt => getItemConfig(opt))
            }]
          }
        }]
      }
    }
  },
  // subTitle: {
  //   label: '副标题'
  // },
  useDefaultHandle: {
    label: '使用默认底部操作栏',
    type: 'switch',
    defaultValue: true
  },
  usingSlots: {
    hideItem: true,
    immediateChangeValue: true,
    dependOn: ['useDefaultHandle'],
    changeValue ({ useDefaultHandle }) {
      return {
        value: useDefaultHandle ? ['default'] : ['default', 'footer']
      }
    }
  },
  options: {
    hideItem: 'true',
    type: 'arrayObject',
    dependOn: ['usingSlots', 'options'],
    changeValue: ({ usingSlots, options }) => {
      const value = options.concat(usingSlots.filter(name => {
        return !options.find(option => option.key === name)
      }).map(name => ({ key: name, children: [] })))
      return {
        value
      }
    }
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
    label: '默认显示',
    type: 'switch',
    defaultValue: false,
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
    inactivateValue: false
  },
  maxDepth: {
    label: '查找form的深度',
    type: 'number'
  },
  fullscreen: {
    label: '是否全屏',
    type: 'switch',
    activateValue: true,
    inactivateValue: false
  },
  events: {
    hideItem: true,
    options: [
      { label: '确认前回调事件', value: 'beforeConfirm' },
      { label: '确认事件', value: 'confirm' }
    ]
  },
  methods: {
    hideItem: true,
    options: [
      { label: '关闭弹窗', value: 'close' },
      { label: '打开弹窗', value: 'open', args: ['参数1', '参数2'] }
    ]
  }
}
