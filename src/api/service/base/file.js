import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 文件存储中心
class FileService extends Model {
  // 删除文件
  @transformData()
  del ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/file/del/{id}',
      pathParams: { id }
    })
  }

  // 下载文件
  @transformData()
  down ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/file/down/{id}',
      pathParams: { id }
    })
  }

  // 上传文件 返回文件id
  @transformData()
  upload (data) {
    const { basePath } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/file/upload',
      params: { basePath }
    })
  }

  // 上传图片 返回文件信息
  @transformData()
  image (data) {
    const { basePath } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/file/upload/image',
      params: { basePath }
    })
  }

  // 显示图片
  @transformData()
  file ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/file/{id}',
      pathParams: { id }
    })
  }
}
export const fileService = new FileService()
