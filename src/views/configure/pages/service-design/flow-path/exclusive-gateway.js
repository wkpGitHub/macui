import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '网关节点',
  type: 'exclusive-gateway',
  title: '排他网关',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称', defaultValue: '排他网关' },
    branches: { type: 'custom-priority', label: '调整优先级', otherKey: 'children' },
    gatewayType: {
      label: '节点类型',
      hideItem: true,
      defaultValue: 'xor'
    },
    defaultBranch: {
      label: '默认优先级',
      dependOn: ['children'],
      type: 'select',
      changeConfig (config, { children }) {
        config.options = children
        return config
      }
    }
  })),
  initData: {
    id: '',
    type: 'exclusive-gateway',
    title: '排他网关'
  }
}
