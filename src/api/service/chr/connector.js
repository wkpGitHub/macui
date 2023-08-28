import Model, { bind } from '@cip/utils/model'
import req from '@cip/request'
// 应用内部的入口分发器
class ConnectorService extends Model {
  page (params = {}, payLoad = {}) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/connector/page',
      params: {
        ...params,
        ...payLoad
      }
    })
  }

  create (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/connector/save',
      data
    })
  }

  @bind
  update (data) {
    return this.create(data)
  }

  info ({ id } = {}) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/connector/detail',
      params: {
        id
      }
    })
  }

  delete ({ id } = {}) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/connector/delete',
      params: {
        id
      }
    })
  }

  // 获取连接器的服务项
  getItemList (params) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/connector/item/list',
      params
    })
  }

  // 保存连接器的服务项
  saveItem (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/connector/item/save',
      data
    })
  }

  // 获取连接器服务项的详情
  getItemDetail (params) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/connector/item/detail',
      params
    })
  }

  // 删除连接器服务项
  deleteItem (params) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/connector/item/delete',
      params
    })
  }
}
export const connectorService = new ConnectorService()
