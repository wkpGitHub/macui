import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '人工节点',
  type: 'notify-node',
  title: '抄送人',
  labelWidth: '120px',
  formField: generateFieldList(defineFormFieldConfig({
    transactor: { label: '抄送人', type: 'transactorSelect', required: true },
    allowCC: { type: 'checkbox', options: [{ label: '允许发起人添加抄送人', value: 1 }] }
  })),
  initData: {
    id: '',
    type: 'notify-node',
    title: '抄送人'
  }
}
