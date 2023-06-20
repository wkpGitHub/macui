
// ddl执行记录
export const dataDdlLogEntityEntity = {
  content: { type: String, _renderConfig: { label: '内容' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  dataId: { type: Number, _renderConfig: { label: '数据信息id', type: 'number' } },
  dbId: { type: Number, _renderConfig: { label: '数据源id', type: 'number' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  msg: { type: String, _renderConfig: { label: '错误信息' } },
  success: { type: Boolean, _renderConfig: { label: '执行是否成功', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } }
}
