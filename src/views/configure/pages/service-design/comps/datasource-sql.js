import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '高级',
  type: 'datasource-sql',
  title: '数据源 SQL',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    dsKey: { label: '数据源', required: true, type: 'select', options: [] },
    targetName: { label: '节点出参' },
    sql: { label: 'SQL脚本', type: 'codemirrorInput' }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'datasource-sql',
    title: '数据源 SQL',

    children: []
  }
}
