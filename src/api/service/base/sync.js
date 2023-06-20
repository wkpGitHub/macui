import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 数据同步
class SyncService extends Model {
  // 发起一次全量的用户和部门数据同步
  @transformData()
  kickoff () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/sync/kickoff'
    })
  }

  // 发起一次全量角色数据同步
  @transformData()
  role () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/sync/pull/role'
    })
  }

  // 尝试推送角色数据
  @transformData()
  pushRole () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/sync/push/role'
    })
  }
}
export const syncService = new SyncService()
