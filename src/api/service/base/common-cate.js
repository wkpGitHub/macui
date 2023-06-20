import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 通用分类
class CommonCateService extends Model {
  // 删除分类
  @transformData()
  del (data) {
    const { id } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/cate/del/{id}',
      pathParams: { id }
    })
  }

  // 检测名称是否重复，重复:true
  @transformData()
  check (data) {
    const { namespace } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/cate/{namespace}/check',
      pathParams: { namespace },
      data: data
    })
  }

  // 创建/更新通用分类
  @transformData()
  save (data) {
    const { namespace } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/cate/{namespace}/save',
      pathParams: { namespace },
      data: data
    })
  }

  // 分类树-不带资源信息
  @transformData()
  tree ({ namespace, name }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/cate/{namespace}/tree',
      pathParams: { namespace },
      params: { name }
    })
  }

  // 分类树-带资源信息
  @transformData()
  treeRes ({ namespace, name }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/cate/{namespace}/treeRes',
      pathParams: { namespace },
      params: { name }
    })
  }
}
export const commonCateService = new CommonCateService()
