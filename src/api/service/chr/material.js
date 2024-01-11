import Model, { transformData, bind } from '@cip/utils/model'
import req, { store as requestStore } from '@cip/request'

class MaterialService extends Model {
  @transformData()
  page (searchFilter, { offset = 0, limit = 10 }) {
    return req('get', 'apiChr', '/api/v1/material/page', { ...searchFilter, offset, limit })
  }

  tree (name) {
    return req('get', 'apiChr', '/api/v1/material/tree', { name })
  }

  // 创建文件夹
  mkdir (data) {
    return req('post', 'apiChr', '/api/v1/material/mkdir', data)
  }

  @transformData()
  create (data) {
    const form = new FormData()
    Object.keys(data).forEach(key => {
      form.append(key, data[key])
    })
    return req('post', 'apiChr', '/api/v1/material/save', form)
  }

  img (id) {
    return `${requestStore.apiConfig.apiChr}/api/v1/material/img/${id}`
  }

  download (id) {
    return `${requestStore.apiConfig.apiChr}/api/v1/material/down/${id}`
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
    return req('get', 'apiChr', '/api/v1/material/delete', { id })
  }
}

export const materialService = new MaterialService()
