
// 字段信息
export const dataFieldEntityEntity = {
  children: { type: ['this'], _renderConfig: { label: '子类型', type: 'table' } },
  dataId: { type: Number, _renderConfig: { label: '数据信息id', type: 'number' } },
  defaultValue: { type: String, _renderConfig: { label: '默认值' } },
  editable: { type: Boolean, _renderConfig: { label: '是否可编辑', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  isPk: { type: Boolean, _renderConfig: { label: '是否主键', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  length: { type: Number, _renderConfig: { label: '字段长度', type: 'number' } },
  multiable: { type: Boolean, _renderConfig: { label: '允许多选', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  name: { type: String, _renderConfig: { label: '字段名称(英文),驼峰命名法' } },
  nullable: { type: Boolean, _renderConfig: { label: '是否可为空', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  refDataId: { type: Number, _renderConfig: { label: '引用数据信息id', type: 'number' } },
  refDataName: { type: String, _renderConfig: { label: '引用数据信息名称' } },
  relationDataId: { type: Number, _renderConfig: { label: '关联数据信息id', type: 'number' } },
  relationType: { type: String, _renderConfig: { label: '关联关系类型', type: 'select', options: ['OneToOne', 'OneToMany', 'ManyToOne', 'ManyToMany'] } },
  remark: { type: String, _renderConfig: { label: '描述' } },
  scale: { type: Number, _renderConfig: { label: '小数点位数', type: 'number' } },
  title: { type: String, _renderConfig: { label: '字段显示名称' } },
  typeName: { type: String, _renderConfig: { label: '字段类型', type: 'select', options: ['STRING', 'TEXT', 'BOOLEAN', 'INT', 'BIGINT', 'DOUBLE', 'DECIMAL', 'DATETIME', 'DATE', 'TIME', 'BINARY', 'LIST', 'MAP', 'EMAIL', 'LATITUDE', 'LONGITUDE', 'IMAGE', 'USER', 'DEPT', 'UNKNOWN'] } },
  typeScope: { type: String, _renderConfig: { label: '类型域', type: 'select', options: ['basic', 'entity', 'pojo', 'dic'] } },
  unique: { type: Boolean, _renderConfig: { label: '是否唯一', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } }
}
