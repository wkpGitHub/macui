
// undefined
export const 操作记录Entity = {
  accessType: { type: String, _renderConfig: { label: '请求类型', type: 'select', options: ['VISIT', 'ADD', 'UPDATE', 'SAVE', 'DELETE', 'QUERY', 'UPLOAD', 'EXPORT', 'RUN'] } },
  app: { type: String, _renderConfig: { label: '应用名' } },
  content: { type: String, _renderConfig: { label: '内容' } },
  cost: { type: Number, _renderConfig: { label: '请求耗时', type: 'number' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  exprFlag: { type: Boolean, _renderConfig: { label: '表达式标识', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  ip: { type: String, _renderConfig: { label: 'ip' } },
  method: { type: String, _renderConfig: { label: '方法名称' } },
  module: { type: String, _renderConfig: { label: '模块名称' } },
  params: { type: String, _renderConfig: { label: '参数' } },
  path: { type: String, _renderConfig: { label: '路径' } },
  userId: { type: String, _renderConfig: { label: '用户编号' } },
  userName: { type: String, _renderConfig: { label: '方法名称' } }
}
