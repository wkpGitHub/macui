import Model from '@cip/utils/model'
// import { 简单系统用户信息Entity } from './简单系统用户信息'

// undefined
export const teamEntityEntity = {
  // admins: { type: [new Model(简单系统用户信息Entity)], _renderConfig: { label: '负责人', type: 'table' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  creatorId: { type: String, _renderConfig: { label: '创建者id' } },
  creatorName: { type: String, _renderConfig: { label: '创建者姓名' } },
  editable: { type: Boolean, _renderConfig: { label: '是否可编辑', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  memberType: { type: String, _renderConfig: { label: '用户对资源的占有类型', type: 'select', options: ['creator', 'admin', 'normal'] } },
  // members: { type: [new Model(简单系统用户信息Entity)], _renderConfig: { label: '租户成员', type: 'table' } },
  name: { type: String, _renderConfig: { label: '名称' } },
  remark: { type: String, _renderConfig: { label: '备注' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  updatorId: { type: String, _renderConfig: { label: '更新者id' } },
  updatorName: { type: String, _renderConfig: { label: '更新者姓名' } }
}
