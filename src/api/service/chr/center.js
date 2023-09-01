import Model, { transformData, bind } from '@cip/utils/model'
import req from '@cip/request'

class CenterService extends Model {
  @transformData()
  page (searchFilter, { offset = 0, limit = 10 }) {
    return req('get', 'apiSecurity', '/api/v1/discovery/rule/page', { ...searchFilter, offset, limit })
  }

  @transformData()
  create (data) {
    return req('post', 'apiSecurity', '/api/v1/discovery/rule/save', data)
  }

  @transformData()
  info ({ id }) {
    return {}
  }

  @bind
  update (data) {
    return this.create(data)
  }

  @transformData()
  delete ({ id }) {
    return req('delete', 'apiSecurity', `/api/v1/discovery/rule/${id}/del`)
  }

  @transformData()
  batchDelete (data) {
    return req('delete', 'apiSecurity', '/api/v1/discovery/rule/deleteBatch', { ids: data.map(item => item.id) })
  }

  // 保存内容
  saveContent (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/api/center/config/save-content',
      data: data
    })
  }

  // 保存内容
  getContent (id) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/api/center/config/content',
      params: { id }
    })
  }
}

export const centerService = new CenterService()
