import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '调用服务',
  type: 'flow',
  title: '调用流程',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    flowId: { label: '目标流程', required: true } // ansuda 调用流程树时传了参数 trigger: empty-event
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'flow',
    title: '调用流程',
    conditions: {},
    children: []
  }
}
