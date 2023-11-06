import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '网关节点',
  type: 'exclusive-gateway',
  title: '排他网关',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称', defaultValue: '排他网关' },
    gatewayType: {
      label: '节点类型',
      hideItem: true,
      defaultValue: 'xor'
    },
    branches: {
      label: '分支优先级'
    },
    defaultBranch: {
      label: '默认优先级'
    }
  })),
  initData: {
    id: '',
    type: 'exclusive-gateway',
    title: '排他网关'
  }
}
