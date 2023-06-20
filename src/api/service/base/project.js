import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 项目管理
class ProjectService extends Model {
  // 新增/修改信息
  @transformData()
  project (data) {
    const { teamId } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/project',
      params: { teamId },
      data: data
    })
  }

  // 新增/修改项目用户
  @transformData()
  users (data) {
    const { projectId, userIds } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/project/add/users',
      params: { projectId, userIds }
    })
  }

  // 查询项目
  @transformData()
  id ({ projectId }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/project/id',
      params: { projectId }
    })
  }

  // 获取租户下项目列表
  @transformData()
  list ({ teamId }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/project/list',
      params: { teamId }
    })
  }

  // 我的项目
  @transformData()
  my ({ teamId }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/project/my',
      params: { teamId }
    })
  }

  // 名称是否可用
  @transformData()
  nameCheck () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/project/name-check'
    })
  }

  // 分页
  @transformData()
  page ({ name, orderAsc, orderBy, teamId }, { offset, limit }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/project/page',
      params: { name, orderAsc, orderBy, teamId, offset, limit }
    })
  }

  // 搜索项目中可添加的用户
  @transformData()
  search ({ keyword, projectId }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/project/search',
      params: { keyword, projectId }
    })
  }

  // 删除项目
  @transformData()
  delete ({ id }) {
    return req({
      method: 'delete',
      apiName: 'apiBase',
      url: '/api/sys/project/{id}/delete',
      pathParams: { id }
    })
  }

  // 项目用户分页
  @transformData()
  projectUsers ({ id, keyword, orderAsc, orderBy, ownType }, { offset, limit }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/project/{id}/users',
      pathParams: { id },
      params: { keyword, orderAsc, orderBy, ownType, offset, limit }
    })
  }

  // 项目删除用户
  @transformData()
  usersDelete ({ id, projectId }) {
    return req({
      method: 'delete',
      apiName: 'apiBase',
      url: '/api/sys/project/{projectId}/users/{id}/delete',
      pathParams: { id, projectId }
    })
  }
}
export const projectService = new ProjectService()
