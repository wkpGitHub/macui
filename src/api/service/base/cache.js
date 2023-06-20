import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 系统缓存
class CacheService extends Model {
  // 清空缓存
  @transformData()
  clear () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/cache/clear'
    })
  }

  // 缓存名称列表
  @transformData()
  names () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/cache/names'
    })
  }
}
export const cacheService = new CacheService()
