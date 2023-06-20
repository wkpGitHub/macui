import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
import { accountEntity } from '@/api/entity'
class AccountService extends Model {
  // 登录
  // 登录
  login (params) {
    return req('post', 'apiBasic', '/api/auth/login', params)
  }

  // 使用code换取token
  getTokenByCode ({ code }) {
    return req('get', 'apiBasic', '/api/auth/token', { code })
  }

  // 使用其他用户平台的token换取本地token
  loginByToken () {}
  // 获取当前用户信息
  @transformData()
  currentInfo () {
    return req('get', 'apiBasic', '/api/auth/current')
  }

  logout () {
    return req('get', 'apiBasic', '/api/auth/logout')
  }
}

export const accountService = new AccountService(accountEntity, { part: true })
