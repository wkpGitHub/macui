import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 租户(团队)管理
class TeamService extends Model {
  // 新增/修改信息
  @transformData()
  team (data) {
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/team',
      data: data
    })
  }

  // 删除租户
  @transformData()
  delete ({ id }) {
    return req({
      method: 'delete',
      apiName: 'apiBase',
      url: '/api/sys/team/delete',
      params: { id }
    })
  }

  // 通过ID获取租户(团队)信息
  @transformData()
  id ({ teamId }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/team/id',
      params: { teamId }
    })
  }

  // 查询所有租户
  @transformData()
  list ({ name }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/team/list',
      params: { name }
    })
  }

  // 新增租户成员
  @transformData()
  create (data) {
    const { teamId, userIds } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/team/member/add',
      params: { teamId, userIds }
    })
  }

  // 移除租户成员
  @transformData()
  memberDelete ({ id }) {
    return req({
      method: 'delete',
      apiName: 'apiBase',
      url: '/api/sys/team/member/delete',
      params: { id }
    })
  }

  // 分页查询租户成员
  @transformData()
  page ({ name, orderAsc, orderBy, projectId, roleId, teamId, teamId }, { offset, limit }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/team/member/page',
      params: { name, orderAsc, orderBy, projectId, roleId, teamId, teamId, offset, limit }
    })
  }

  // 过滤出我可访问的租户
  @transformData()
  my () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/team/my'
    })
  }

  // 名称是否可用
  @transformData()
  nameCheck () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/team/name-check'
    })
  }

  // 搜索租户中可添加的用户
  @transformData()
  needAddUser ({ keyword, teamId }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/team/need-add-user',
      params: { keyword, teamId }
    })
  }

  // 分页查询租户
  @transformData()
  teamPage ({ name, orderAsc, orderBy }, { offset, limit }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/team/page',
      params: { name, orderAsc, orderBy, offset, limit }
    })
  }
}
export const teamService = new TeamService()
