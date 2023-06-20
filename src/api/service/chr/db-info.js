import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 数据源管理
class DbInfoService extends Model {
  // 数据源名称是否可用
  @transformData()
  checkName ({ id, name }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/db/check-name',
      params: { id, name }
    })
  }

  // 删除
  @transformData()
  delete (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/storage/db/delete',
      data: data
    })
  }

  // 数据源列表
  @transformData()
  list ({ host, name }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/db/list',
      params: { host, name }
    })
  }

  // 保存数据源
  @transformData()
  save (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/storage/db/save',
      data: data
    })
  }

  // 数据源测试连接
  @transformData()
  test (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/storage/db/test',
      data: data
    })
  }
}
export const dbInfoService = new DbInfoService()
