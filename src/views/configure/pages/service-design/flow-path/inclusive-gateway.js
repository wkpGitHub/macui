import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '网关节点',
  type: 'inclusive-gateway',
  title: '包容网关',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称', defaultValue: '包容网关' },
    gatewayType: {
      label: '节点类型',
      hideItem: true,
      defaultValue: 'inclusive'
    },
    defaultBranch: {
      label: '不满足时进入'
    }
  })),
  initData: {
    id: '',
    type: 'inclusive-gateway',
    title: '包容网关'
  }
}
