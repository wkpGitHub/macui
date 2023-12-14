import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 基础字典信息
class BaseDicService extends Model {
  // 接口认证校验方式
  @transformData()
  apiAuthMethod () {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/base/dic/api-auth-method'
    })
  }

  // 基础数据类型
  @transformData()
  basicType () {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/base/dic/basic-type'
    })
  }

  // 集合类型
  @transformData()
  collectionType () {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/base/dic/collection-type'
    })
  }

  // 后台数据库类型
  @transformData()
  dbType () {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/base/dic/db-type'
    })
  }

  // 主键策略列表
  @transformData()
  idStrategy () {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/base/dic/id-strategy'
    })
  }

  // 字段内容校验规则
  @transformData()
  validateRule () {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/base/dic/validate-rule'
    })
  }

  // 连接器类型
  @transformData()
  connectorType () {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/base/dic/connector-type'
    })
  }
}
export const baseDicService = new BaseDicService()
