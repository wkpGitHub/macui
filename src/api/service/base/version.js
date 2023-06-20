import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 版本信息
class VersionService extends Model {
  // 系统当前版本
  @transformData()
  version () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/version'
    })
  }
}
export const versionService = new VersionService()
