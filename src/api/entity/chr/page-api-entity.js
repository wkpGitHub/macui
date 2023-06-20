import Model from '@cip/utils/model'
import { simpleFieldInfoEntity } from './simple-field-info'
import { simpleFieldInfoWithOpEntity } from './simple-field-info-with-op'

// 页面接口信息
export const pageApiEntityEntity = {
  apiId: { type: Number, _renderConfig: { label: '接口id', type: 'number' } },
  apiName: { type: String, _renderConfig: { label: '接口名称' } },
  display: { type: [new Model(simpleFieldInfoEntity)], _renderConfig: { label: '显示字段', type: 'table' } },
  fullPath: { type: String, _renderConfig: { label: '接口访问全路径' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  pageId: { type: Number, _renderConfig: { label: '页面id', type: 'number' } },
  pageName: { type: String, _renderConfig: { label: '页面名称' } },
  query: { type: [new Model(simpleFieldInfoWithOpEntity)], _renderConfig: { label: '查询字段', type: 'table' } }
}
