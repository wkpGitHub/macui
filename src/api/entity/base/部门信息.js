import Model from '@cip/utils/model'
import { baseTreeNodeEntityEntity } from './base-tree-node-entity'

// undefined
export const 部门信息Entity = {
  children: { type: [new Model(baseTreeNodeEntityEntity)], _renderConfig: { label: '子资源', type: 'table' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  fullPath: { type: String, _renderConfig: { label: '部门全路径(部门名称)' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  isDir: { type: Boolean, _renderConfig: { label: '是否是分类', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  markedForDeletion: { type: Boolean, _renderConfig: { label: '标记为将要删除', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  name: { type: String, _renderConfig: { label: '部门名称' } },
  pid: { type: Number, _renderConfig: { label: '父级id', type: 'number' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } }
}
