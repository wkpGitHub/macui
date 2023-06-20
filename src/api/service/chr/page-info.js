import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 页面信息管理
class PageInfoService extends Model {
  // 名称是否可用
  @transformData()
  checkName ({ id, name, pid }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/page/check-name',
      params: { id, name, pid }
    })
  }

  // 路径是否可用
  @transformData()
  checkPath ({ id, path, pid }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/page/check-path',
      params: { id, path, pid }
    })
  }

  // 详情
  @transformData()
  detail ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/page/detail',
      params: { id }
    })
  }

  // 保存
  @transformData()
  save (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/page/save',
      data: data
    })
  }

  // 树形结构
  @transformData()
  tree ({ name }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/page/tree',
      params: { name }
    })
  }
}
export const pageInfoService = new PageInfoService()
