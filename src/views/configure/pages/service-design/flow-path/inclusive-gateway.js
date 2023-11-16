import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '网关节点',
  type: 'inclusive-gateway',
  title: '包容网关',
  labelWidth: '170px',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称', defaultValue: '包容网关' },
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
    type: 'inclusive-gateway',
    title: '包容网关'
  }
}
