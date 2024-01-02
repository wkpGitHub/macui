import Model, { transformData } from '@cip/utils/model'
// import req from '@cip/request'
import { privilegeEntity } from '@lc/api/entity'
class PrivilegeService extends Model {
  // 获取当前用户权限
  @transformData()
  list () {
    return { data: [] }
  }
}

export const privilegeService = new PrivilegeService(privilegeEntity)
