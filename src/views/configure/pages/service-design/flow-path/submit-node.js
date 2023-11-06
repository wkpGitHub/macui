import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '自动节点',
  type: 'submit-node',
  title: '提交节点',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称', defaultValue: '提交节点' },
    processObject: {
      label: '处理对象',
      type: 'select',
      options: [
        {
          label: '开始',
          value: '开始'
        }
      ]
    }
  })),
  initData: {
    id: '',
    type: 'submit-node',
    title: '提交节点'
  }
}
