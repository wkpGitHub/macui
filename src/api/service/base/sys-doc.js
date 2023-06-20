import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 文档管理
class SysDocService extends Model {
  // 批量删除文档
  @transformData()
  del (data) {
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/doc/del',
      data: data
    })
  }

  // 文档详情
  @transformData()
  detail ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/doc/detail/{id}',
      pathParams: { id }
    })
  }

  // 文档信息分页
  @transformData()
  page ({ name, orderAsc, orderBy }, { offset, limit }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/doc/page',
      params: { name, orderAsc, orderBy, offset, limit }
    })
  }

  // 保存
  @transformData()
  save (data) {
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/doc/save',
      data: data
    })
  }
}
export const sysDocService = new SysDocService()
