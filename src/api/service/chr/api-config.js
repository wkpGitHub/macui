import Model, { transformData, bind } from '@cip/utils/model'
import req from '@cip/request'
// 应用接口管理
class ApiConfigService extends Model {
  // 名称是否可用
  @transformData()
  checkName ({ id, name, pid }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/center/config/check-name',
      params: { id, name, pid }
    })
  }

  // 编码是否可用
  @transformData()
  checkPath ({ id, path, pid }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/center/config/check-path',
      params: { id, path, pid }
    })
  }

  // 详情
  @transformData()
  detail ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/center/config/detail',
      params: { id }
    })
  }

  // 带配置内容的详情
  @transformData()
  detailFull ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/center/config/detail-full',
      params: { id }
    })
  }

  // 列表
  @transformData()
  list (params) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/center/config/list',
      params
    })
  }

  // 保存
  @transformData()
  save (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/api/center/config/save',
      data: data
    })
  }

  // 树状结构
  @transformData()
  tree ({ apiMethod, dataId, devMode, name, path, pid, isApi }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/center/config/tree',
      params: { apiMethod, dataId, devMode, name, path, pid, isApi }
    })
  }

  // api分类信息 有一个默认分类 全部API 选中展示全部api
  @bind
  async getGroupWithDefault (params) {
    const res = await this.list(params)
    ;(res.data || []).unshift({
      id: '',
      name: '全部API',
      isApi: true
    })
    return res
  }
}
export const apiConfigService = new ApiConfigService()
