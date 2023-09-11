import { generateFieldList, defineFormFieldConfig } from 'd-render'
// {
//   id: '',
//   type: 'coder',
//   title: '编码转换',
//   conditions: {},
//   validateFailed: Boolean,
//   children: [],
//   method: '' // 编码方式 base64-encode|base64-decode
//   source: '', // 变量值
//   targetName: '', // 节点出参
// }
export default {
  category: '变量活动',
  type: 'coder',
  title: '编码转换',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    method: {
      label: '编码方式',
      required: true,
      type: 'select',
      options: [
        {
          label: 'Base 64 编码',
          value: 'base64-encode'
        },
        {
          label: 'Base 64 解码',
          value: 'base64-decode'
        }
      ]
    },
    source: { label: '变量值', required: true, type: 'selectVar' },
    targetName: { label: '节点出参', type: 'selectVar', isVar: true }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'coder',
    title: '编码转换',
    conditions: {},
    children: []
  }
}
