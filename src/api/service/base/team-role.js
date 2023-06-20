import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 角色管理
class TeamRoleService extends Model {
  // 新增/修改信息
  @transformData()
  role (data) {
    const { teamId } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/team/role',
      params: { teamId },
      data: data
    })
  }

  // 删除角色
  @transformData()
  delete ({ id }) {
    return req({
      method: 'delete',
      apiName: 'apiBase',
      url: '/api/sys/team/role/delete',
      params: { id }
    })
  }

  // 授权功能权限
  @transformData()
  bind (data) {
    const { functionIds, id } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/team/role/function/bind',
      params: { functionIds, id }
    })
  }

  // 通过角色ID查询角色信息
  @transformData()
  id ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/team/role/id',
      params: { id }
    })
  }

  // 获取租户下角色列表
  @transformData()
  list ({ name, teamId }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/team/role/list',
      params: { name, teamId }
    })
  }

  // 分页查询角色
  @transformData()
  page ({ name, orderAsc, orderBy, teamId }, { offset, limit }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/team/role/page',
      params: { name, orderAsc, orderBy, teamId, offset, limit }
    })
  }

  // 将某个用户的角色给移除
  @transformData()
  revoke (data) {
    const { roleId, userId } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/team/role/revoke',
      params: { roleId, userId }
    })
  }

  // 注意！批量授权将会清理用户在该租户下的所有租户角色，并重新授权
  @transformData()
  grant (data) {
    const { ids, roleIds, teamId } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/team/role/user/grant',
      params: { ids, roleIds, teamId }
    })
  }

  // 对单个角色，增量的方式授权给用户
  @transformData()
  create (data) {
    const { roleId, teamId, userIds } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/team/role/user/grant/add',
      params: { roleId, teamId, userIds }
    })
  }

  // 分页获取
  @transformData()
  userPage (data, { offset, limit }) {
    const { keyword, orderAsc, orderBy, roleId } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/team/role/user/page',
      params: { keyword, orderAsc, orderBy, roleId, offset, limit }
    })
  }

  // 排除掉已经授权的用户，不分页
  @transformData()
  search (data) {
    const { ids, keyword, roleId } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/team/role/user/search',
      params: { ids, keyword, roleId }
    })
  }
}
export const teamRoleService = new TeamRoleService()
