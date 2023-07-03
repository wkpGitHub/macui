import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '反馈与消息',
  type: 'notification',
  title: '发送消息',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    fields: { hideItem: true },
    transactor: { label: '接收人' },
    message: { label: '消息模板' },
    transactorSelect: { label: '', type: 'transactorSelect' }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'notification',
    title: '发送消息',
    conditions: {},
    children: []
  }
}
