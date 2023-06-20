
// 接口字段信息
export const apiFieldEntityEntity = {
  apiId: { type: Number, _renderConfig: { label: '接口信息主键', type: 'number' } },
  children: { type: ['this'], _renderConfig: { label: '子类型', type: 'table' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  name: { type: String, _renderConfig: { label: '名称(英文)' } },
  nullable: { type: Boolean, _renderConfig: { label: '是否可为空', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  op: { type: String, _renderConfig: { label: '比较符', type: 'select', options: ['eq', 'ne', 'gt', 'ge', 'lt', 'le', 'like', 'sw', 'ew', 'bt', 'in'] } },
  position: { type: String, _renderConfig: { label: '参数位置', type: 'select', options: ['head', 'query', 'body', 'path', 'resp'] } },
  refDataId: { type: Number, _renderConfig: { label: '引用数据信息id', type: 'number' } },
  refDataName: { type: String, _renderConfig: { label: '引用数据信息名称' } },
  title: { type: String, _renderConfig: { label: '字段显示名称' } },
  typeName: { type: String, _renderConfig: { label: '字段类型', type: 'select', options: ['STRING', 'TEXT', 'BOOLEAN', 'INT', 'BIGINT', 'DOUBLE', 'DECIMAL', 'DATETIME', 'DATE', 'TIME', 'BINARY', 'LIST', 'MAP', 'EMAIL', 'LATITUDE', 'LONGITUDE', 'IMAGE', 'USER', 'DEPT', 'UNKNOWN'] } }
}
