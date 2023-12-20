import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '逻辑控制',
  type: 'continue',
  title: '继续循环',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'continue',
    title: '继续循环',

    children: []
  }
}
