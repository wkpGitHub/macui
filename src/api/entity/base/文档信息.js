
// undefined
export const 文档信息Entity = {
  content: { type: String, _renderConfig: { label: '文档内容markdown' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  name: { type: String, _renderConfig: { label: '文档名称' } },
  remark: { type: String, _renderConfig: { label: '备注' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } }
}
