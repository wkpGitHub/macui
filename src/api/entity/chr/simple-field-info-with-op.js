
// 带有比较符的字段信息
export const simpleFieldInfoWithOpEntity = {
  name: { type: String, _renderConfig: { label: '名称(英文)' } },
  op: { type: String, _renderConfig: { label: '比较符', type: 'select', options: ['eq', 'ne', 'gt', 'ge', 'lt', 'le', 'like', 'sw', 'ew', 'bt', 'in'] } },
  title: { type: String, _renderConfig: { label: '字段显示名称' } },
  typeName: { type: String, _renderConfig: { label: '字段类型', type: 'select', options: ['STRING', 'TEXT', 'BOOLEAN', 'INT', 'BIGINT', 'DOUBLE', 'DECIMAL', 'DATETIME', 'DATE', 'TIME', 'BINARY', 'LIST', 'MAP', 'EMAIL', 'LATITUDE', 'LONGITUDE', 'IMAGE', 'USER', 'DEPT', 'UNKNOWN'] } }
}
