import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 系统请求记录
class SysAccessLogService extends Model {
  // 请求记录分页
  @transformData()
  page ({ exprFlag, method, module, orderAsc, orderBy, userId }, { offset, limit }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/log/page',
      params: { exprFlag, method, module, orderAsc, orderBy, userId, offset, limit }
    })
  }
}
export const sysAccessLogService = new SysAccessLogService()
