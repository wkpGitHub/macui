import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '反馈与消息',
  type: 'notification',
  title: '发送消息',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    fields: { hideItem: true, defaultValue: [] },
    validateFailed: { hideItem: true, defaultValue: false },
    transactor: { label: '接收人', type: 'transactorSelect', required: true },
    message: { label: '消息模板', required: true }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'notification',
    title: '发送消息',

    children: [],
    validateFailed: false
  }
}
