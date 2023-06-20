import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 系统字典
class CommonDicService extends Model {
  // 字典键值对
  @transformData()
  maps () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/dic/maps'
    })
  }

  // 字典分页
  @transformData()
  page ({ name, orderAsc, orderBy, pename, pid }, { offset, limit }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/dic/page',
      params: { name, orderAsc, orderBy, pename, pid, offset, limit }
    })
  }

  // 保存/修改字典
  @transformData()
  dicPage (data) {
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/dic/page',
      data: data
    })
  }

  // 获取所有的字典和子字典项
  @transformData()
  values () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/dic/values'
    })
  }

  // 根据id删除
  @transformData()
  dic ({ id }) {
    return req({
      method: 'delete',
      apiName: 'apiBase',
      url: '/api/sys/dic/{id}',
      pathParams: { id }
    })
  }
}
export const commonDicService = new CommonDicService()
