import Model from '@cip/utils/model'
import req from '@cip/request'

class SysDicService extends Model {
  maps () {
    return req('get', 'apiBasic', '/api/sys/dic/maps')
  }
}

export const sysDicService = new SysDicService()
