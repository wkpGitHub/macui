import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 用户管理
class SysUserService extends Model {
  // 部门列表
  @transformData()
  dept () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/user/dept'
    })
  }

  // 用户信息列表
  @transformData()
  list ({ deptId, name, teamId, username }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/user/list',
      params: { deptId, name, teamId, username }
    })
  }

  // 用户信息分页
  @transformData()
  page ({ deptId, name, orderAsc, orderBy, teamId, username }, { offset, limit }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/user/page',
      params: { deptId, name, orderAsc, orderBy, teamId, username, offset, limit }
    })
  }

  // 通过检索词搜索用户，返回最多10名
  @transformData()
  search ({ ids, keyword, teamId }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/user/search',
      params: { ids, keyword, teamId }
    })
  }
}
export const sysUserService = new SysUserService()
