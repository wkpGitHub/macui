import { getItemConfig } from '../utils'

export default {
  label: { },
  api: {
    label: '接口',
    type: 'select-api',
    dependOn: ['options', 'key'],
    onChange ({ api, dependOn }) {
      const pageTable = dependOn.options?.find(o => o.key === 'default')
      pageTable.children = (api.outParams || []).map(opt => getItemConfig(opt))
    }
  },
  // defaultValueType: {
  //   label: '默认值',
  //   type: 'select',
  //   defaultValue: 'custom',
  //   options: [
  //     { value: 'custom', label: '自定义' },
  //     { value: 'dependOn', label: '数据联动' }
  //   ]
  // },
  // changeValueStr: {
  //   type: 'select-dependOn',
  //   canOutDependOn: true,
  //   otherKey: ['dependOn', 'valueChangeConfig'],
  //   readable: false,
  //   dependOn: ['defaultValueType', 'id', 'label'],
  //   changeConfig (config, { defaultValueType }) {
  //     if (defaultValueType === 'dependOn') {
  //       config.readable = true
  //       config.writable = true
  //     }
  //     return config
  //   }
  // },
  // defaultValue: {
  //   placeholder: '请输入默认值',
  //   type: 'pageFx',
  //   hideLabel: true,
  //   readable: false,
  //   dependOn: ['defaultValueType'],
  //   changeConfig (config, { defaultValueType }) {
  //     if (defaultValueType === 'custom') {
  //       config.readable = true
  //       config.writable = true
  //     }
  //     return config
  //   }
  // },
  hideIndex: {
    label: '是否显示序号',
    defaultValue: true,
    type: 'switch'
  },
  selectType: {
    label: '勾选类型',
    type: 'radio',
    defaultValue: 'none',
    options: [
      { label: '无', value: 'none' },
      { label: '复选框', value: 'checkbox' }
      // { label: '单选框', value: 'radio' }
    ]
  },
  withTableHandle: {
    label: '使用默认操作按钮',
    type: 'switch'
  },
  events: {
    hideItem: true,
    options: [
      { label: '勾选事件', value: 'check' }
    ]
  }
}
