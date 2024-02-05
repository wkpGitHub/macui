import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
class SqlHelperService extends Model {
  // 执行sql语句得到输出字段
  @transformData()
  getSelectFields (data) {
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/zt-base/api/v1/sql/helper/select-fields',
      data
    })
  }

  // 解析变量
  @transformData()
  getVariable (data) {
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/zt-base/api/v1/sql/helper/variable',
      data
    })
  }

  // sql数据查询，最多返回十条
  query (data) {
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/zt-base/api/v1/sql/helper/query',
      data
    })
  }
}
export const sqlHelperService = new SqlHelperService()
