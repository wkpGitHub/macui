import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
class SafeBaseService extends Model {
  @transformData()
  maskList () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/zt-base/api/v1/rule/mask/list'
    })
  }

  @transformData()
  rowList () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/zt-base/api/v1/rule/row/list'
    })
  }
}
export const safeBaseService = new SafeBaseService()
