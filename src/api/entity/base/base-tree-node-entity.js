
// undefined
export const baseTreeNodeEntityEntity = {
  children: { type: ['this'], _renderConfig: { label: '子资源', type: 'table' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  isDir: { type: Boolean, _renderConfig: { label: '是否是分类', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  name: { type: String, _renderConfig: { label: '名称' } },
  pid: { type: Number, _renderConfig: { label: '父级id', type: 'number' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } }
}
