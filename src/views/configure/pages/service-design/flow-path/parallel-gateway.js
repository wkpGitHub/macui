import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '网关节点',
  type: 'parallel-gateway',
  title: '并行网关',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称', defaultValue: '并行网关' },
    gatewayType: {
      label: '节点类型',
      hideItem: true,
      defaultValue: 'parallel'
    }
  })),
  initData: {
    id: '',
    type: 'parallel-gateway',
    title: '并行网关'
  }
}
