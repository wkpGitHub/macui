import Model, { transformData, bind } from '@cip/utils/model'
import req, { store as requestStore } from '@cip/request'

class MaterialService extends Model {
  @transformData()
  page (searchFilter, { offset = 0, limit = 10 }) {
    return req('get', 'apiChr', '/api/v1/material/page', { ...searchFilter, offset, limit })
  }

  @transformData()
  create (data) {
    const form = new FormData()
    form.append('file', data.file)
    return req('post', 'apiChr', '/api/v1/material/save', form)
  }

  img (id) {
    return `${requestStore.apiConfig.apiChr}/api/v1/material/img/${id}`
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
    return req('delete', 'apiChr', `/api/v1/discovery/rule/${id}/del`)
  }

  @transformData()
  batchDelete (data) {
    return req('delete', 'apiChr', '/api/v1/discovery/rule/deleteBatch', { ids: data.map(item => item.id) })
  }
}

export const materialService = new MaterialService()
