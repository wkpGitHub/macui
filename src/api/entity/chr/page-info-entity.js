import Model from '@cip/utils/model'
import { pageApiEntityEntity } from './page-api-entity'
import { simpleFieldInfoEntity } from './simple-field-info'

// 页面信息
export const pageInfoEntityEntity = {
  apiList: { type: [new Model(pageApiEntityEntity)], _renderConfig: { label: '页面使用的接口列表', type: 'table' } },
  appId: { type: Number, _renderConfig: { label: '应用id', type: 'number' } },
  children: { type: ['this'], _renderConfig: { label: undefined, type: 'table' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  creatorId: { type: String, _renderConfig: { label: '创建者id' } },
  creatorName: { type: String, _renderConfig: { label: '创建者姓名' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  name: { type: String, _renderConfig: { label: '名称' } },
  path: { type: String, _renderConfig: { label: '路径' } },
  pid: { type: Number, _renderConfig: { label: '父级id', type: 'number' } },
  query: { type: [new Model(simpleFieldInfoEntity)], _renderConfig: { label: '页面查询条件', type: 'table' } },
  remark: { type: String, _renderConfig: { label: '描述' } },
  schema: { type: String, _renderConfig: { label: '页面内容' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  updatorId: { type: String, _renderConfig: { label: '更新者id' } },
  updatorName: { type: String, _renderConfig: { label: '更新者姓名' } }
}
