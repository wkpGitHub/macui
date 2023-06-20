
// undefined
export const 数据字典表Entity = {
  children: { type: ['this'], _renderConfig: { label: '子字典', type: 'table' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  editable: { type: Boolean, _renderConfig: { label: '是否可编辑', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  ename: { type: String, _renderConfig: { label: '编码' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  name: { type: String, _renderConfig: { label: '显示名称' } },
  pid: { type: Number, _renderConfig: { label: '父级 id', type: 'number' } },
  properties: { type: String, _renderConfig: { label: '其他属性' } },
  seq: { type: Number, _renderConfig: { label: '排序，前端忽略之，按列表顺序即可', type: 'number' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } }
}
