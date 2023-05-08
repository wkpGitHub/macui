import Model from '@cip/utils/model'
// import req from '@cip/request'
import { accountEntity } from '@/api/entity'
class AccountService extends Model {
  // 登录
  login () {}
  // 使用code换取token
  getTokenByCode () {}
  // 使用其他用户平台的token换取本地token
  loginByToken () {}
  // 获取当前用户信息
  currentInfo () {
    return { userName: '测试' }
  }
}

export const accountService = new AccountService(accountEntity)
