import Model from '@cip/utils/model'
import { apiFieldEntityEntity } from './api-field-entity'
import { apiInfoContentEntityEntity } from './api-info-content-entity'

// 接口信息
export const apiInfoEntityEntity = {
  apiMethod: { type: String, _renderConfig: { label: '接口类型', type: 'select', options: ['query', 'save', 'delete'] } },
  appId: { type: Number, _renderConfig: { label: '应用id', type: 'number' } },
  authMethod: { type: String, _renderConfig: { label: '接口认证方式' } },
  body: { type: [new Model(apiFieldEntityEntity)], _renderConfig: { label: '请求体', type: 'table' } },
  children: { type: ['this'], _renderConfig: { label: '子信息', type: 'table' } },
  // 接口配置内容
  content: { type: new Model(apiInfoContentEntityEntity), _renderConfig: apiInfoContentEntityEntity },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  creatorId: { type: String, _renderConfig: { label: '创建者id' } },
  creatorName: { type: String, _renderConfig: { label: '创建者姓名' } },
  dataId: { type: Number, _renderConfig: { label: '数据模型id', type: 'number' } },
  devMode: { type: String, _renderConfig: { label: '开发模式', type: 'select' } },
  fullPath: { type: String, _renderConfig: { label: '接口访问全路径' } },
  head: { type: [new Model(apiFieldEntityEntity)], _renderConfig: { label: '请求头', type: 'table' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  name: { type: String, _renderConfig: { label: '名称' } },
  path: { type: String, _renderConfig: { label: '路径编码' } },
  pid: { type: Number, _renderConfig: { label: '父级id', type: 'number' } },
  query: { type: [new Model(apiFieldEntityEntity)], _renderConfig: { label: '查询条件', type: 'table' } },
  remark: { type: String, _renderConfig: { label: '描述' } },
  response: { type: [new Model(apiFieldEntityEntity)], _renderConfig: { label: '响应字段信息', type: 'table' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  updatorId: { type: String, _renderConfig: { label: '更新者id' } },
  updatorName: { type: String, _renderConfig: { label: '更新者姓名' } }
}
