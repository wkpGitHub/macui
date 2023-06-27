import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '高级',
  type: 'script',
  title: 'JS 代码',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    source: { label: '源码', type: 'codemirrorInput', mode: 'javascript' }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'script',
    title: 'JS 代码',
    conditions: {},
    children: []
  }
}
