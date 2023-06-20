import Model from '@cip/utils/model'
import { dataFieldEntityEntity } from './data-field-entity'

// 数据信息
export const dataInfoEntityEntity = {
  appId: { type: Number, _renderConfig: { label: '应用id', type: 'number' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  creatorId: { type: String, _renderConfig: { label: '创建者id' } },
  creatorName: { type: String, _renderConfig: { label: '创建者姓名' } },
  dbId: { type: Number, _renderConfig: { label: '数据源id', type: 'number' } },
  fields: { type: [new Model(dataFieldEntityEntity)], _renderConfig: { label: '字段列表', type: 'table' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  idStrategy: { type: String, _renderConfig: { label: '主键生成策略' } },
  indices: { type: String, _renderConfig: { label: '索引信息' } },
  isSynced: { type: Boolean, _renderConfig: { label: '是否同步', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  isTree: { type: Boolean, _renderConfig: { label: '树形结构', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  logicDelete: { type: Boolean, _renderConfig: { label: '逻辑删除', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  name: { type: String, _renderConfig: { label: '名称' } },
  remark: { type: String, _renderConfig: { label: '描述' } },
  saveOperator: { type: Boolean, _renderConfig: { label: '记录操作人', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  saveTimestamp: { type: Boolean, _renderConfig: { label: '记录时间', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  tableName: { type: String, _renderConfig: { label: '数据表名称,字母数字下划线' } },
  titleField: { type: String, _renderConfig: { label: '标题字段' } },
  titleTpl: { type: String, _renderConfig: { label: '标题模板' } },
  type: { type: String, _renderConfig: { label: '类型', type: 'select', options: ['basic', 'entity', 'pojo', 'dic'] } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  updatorId: { type: String, _renderConfig: { label: '更新者id' } },
  updatorName: { type: String, _renderConfig: { label: '更新者姓名' } },
  validateRules: { type: String, _renderConfig: { label: '校验规则' } }
}
