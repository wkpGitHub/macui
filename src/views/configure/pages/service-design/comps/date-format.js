import { generateFieldList, defineFormFieldConfig } from 'd-render'
// {
//   id: '',
//   type: 'date-format',
//   title: '日期格式化',
//   conditions: {},
//   validateFailed: Boolean,
//   children: [],
//   method: '' // 编码方式 base64-encode|base64-decode
//   source: '', // 变量值
//   targetName: '', // 节点出参
// }

const formatOptions = [
  {
    label: '年-月-日 时:分:秒',
    value: 'YYYY-MM-DD HH:mm:ss'
  },
  {
    label: '年-月-日 时:分',
    value: 'YYYY-MM-DD HH:mm'
  },
  {
    label: '年-月-日 时',
    value: 'YYYY-MM-DD HH'
  },
  {
    label: '年-月-日',
    value: 'YYYY-MM-DD'
  },
  {
    label: '时:分:秒',
    value: 'HH:mm:ss'
  },
  {
    label: '时:分',
    value: 'HH:mm'
  }
]
export default {
  category: '变量活动',
  type: 'date-format',
  title: '日期格式化',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    sourceName: { label: '源变量', required: true, type: 'setFx', isVar: true },
    sourceFormat: {
      label: '源格式',
      type: 'select',
      options: formatOptions
    },
    targetFormat: {
      label: '目标格式',
      required: true,
      type: 'select',
      options: formatOptions
    },
    targetName: { label: '节点出参', type: 'setFx', isVar: true }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'date-format',
    title: '日期格式化',
    conditions: {},
    children: []
  }
}
