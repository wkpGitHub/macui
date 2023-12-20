import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '逻辑控制',
  type: 'break',
  title: '跳出循环',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'break',
    title: '跳出循环',

    children: []
  }
}
