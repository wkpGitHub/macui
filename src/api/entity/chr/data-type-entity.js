
// 字段类型信息
export const dataTypeEntityEntity = {
  basic: { type: String, _renderConfig: { label: '基础类型', type: 'select', options: ['STRING', 'TEXT', 'BOOLEAN', 'INT', 'BIGINT', 'DOUBLE', 'DECIMAL', 'DATETIME', 'DATE', 'TIME', 'BINARY', 'LIST', 'MAP', 'EMAIL', 'LATITUDE', 'LONGITUDE', 'IMAGE', 'USER', 'DEPT', 'UNKNOWN'] } },
  id: { type: String, _renderConfig: { label: '编码', type: 'select', options: ['STRING', 'TEXT', 'BOOLEAN', 'INT', 'BIGINT', 'DOUBLE', 'DECIMAL', 'DATETIME', 'DATE', 'TIME', 'BINARY', 'LIST', 'MAP', 'EMAIL', 'LATITUDE', 'LONGITUDE', 'IMAGE', 'USER', 'DEPT', 'UNKNOWN'] } },
  isBasic: { type: Boolean, _renderConfig: { label: undefined, type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  length: { type: Number, _renderConfig: { label: '字段长度', type: 'number' } },
  name: { type: String, _renderConfig: { label: '显示名称' } },
  scale: { type: Number, _renderConfig: { label: '小数点位数', type: 'number' } },
  seq: { type: Number, _renderConfig: { label: '排序', type: 'number' } }
}
