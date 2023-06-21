import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 应用接口管理
class ApiConfigService extends Model {
  // 名称是否可用
  @transformData()
  checkName ({ id, name, pid }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/config/check-name',
      params: { id, name, pid }
    })
  }

  // 编码是否可用
  @transformData()
  checkPath ({ id, path, pid }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/config/check-path',
      params: { id, path, pid }
    })
  }

  // 详情
  @transformData()
  detail ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/config/detail',
      params: { id }
    })
  }

  // 带配置内容的详情
  @transformData()
  detailFull ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/config/detail-full',
      params: { id }
    })
  }

  // 列表
  @transformData()
  list ({ apiMethod, dataId, devMode, name, path, pid }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/config/list',
      params: { apiMethod, dataId, devMode, name, path, pid }
    })
  }

  // 保存
  @transformData()
  save (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/api/config/save',
      data: data
    })
  }

  // 树状结构
  @transformData()
  tree ({ apiMethod, dataId, devMode, name, path, pid }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/config/tree',
      params: { apiMethod, dataId, devMode, name, path, pid }
    })
  }
}
export const apiConfigService = new ApiConfigService()
