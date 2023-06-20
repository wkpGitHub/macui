import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 监控
class SysMetricService extends Model {
  // 获取系统监控数据
  @transformData()
  metric ({ host, type }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/metric',
      params: { host, type }
    })
  }

  // 获取主机列表
  @transformData()
  hosts () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/metric/hosts'
    })
  }
}
export const sysMetricService = new SysMetricService()
