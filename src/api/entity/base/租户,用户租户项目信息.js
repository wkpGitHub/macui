import Model from '@cip/utils/model'
import { 项目信息Entity } from './项目信息'
import { roleEntityEntity } from './role-entity'
import { 简单系统用户信息Entity } from './简单系统用户信息'

// undefined
export const 租户,用户租户项目信息Entity = {
  id: { type: Number, _renderConfig: { label: '租户成员id', type: 'number' } },
  projects: { type: [new Model(项目信息Entity)], _renderConfig: { label: '项目列表', type: 'table' } },
  sysRoles: { type: [new Model(roleEntityEntity)], _renderConfig: { label: '系统角色', type: 'table' } },
  teamId: { type: Number, _renderConfig: { label: undefined, type: 'number' } },
  teamRole: { type: [new Model(roleEntityEntity)], _renderConfig: { label: '租户角色', type: 'table' } },
  // 用户信息
  userInfo: { type: new Model(简单系统用户信息Entity), _renderConfig: 简单系统用户信息Entity }
}
