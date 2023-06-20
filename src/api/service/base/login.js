import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 用户信息
class LoginService extends Model {
  // 当前用户信息
  @transformData()
  current ({ teamId }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/auth/current',
      params: { teamId }
    })
  }

  // 用户登录,前端需要对密码进行sha1加密
  @transformData()
  login (data) {
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/auth/login',
      data: data
    })
  }

  // 验证码
  @transformData()
  code ({ uuid }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/auth/login/code',
      params: { uuid }
    })
  }

  // 退出登录
  @transformData()
  logout () {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/auth/logout'
    })
  }

  // 通过code换取token
  @transformData()
  token ({ code }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/auth/token',
      params: { code }
    })
  }

  // 通过token获取用户信息,仅用作测试前端不要使用
  @transformData()
  info ({ token }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/auth/token/info',
      params: { token }
    })
  }
}
export const loginService = new LoginService()
