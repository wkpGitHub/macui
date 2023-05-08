import { accountService } from '@/api'
import store from '@cip/components/store'
import { Token } from '@/lib/token'
import { settingValueTransformState } from '@cip/components/cip-form-input/form-value-store'
/**
 * 根据code获取token
 * @param code
 * @return {*|Promise|Promise<unknown>}
 */
export const loginByCode = (code) => {
  return accountService.getTokenByCode(code)
}
// TODO: 此处方法需要更具实际返回修改
/**
 * 持久化本地数据
 * @param access_token
 * @param scope
 */
// eslint-disable-next-line camelcase
export function persistingData ({ access_token, scope } = {}) {
  localStorage.setItem('websiteId', scope) // 设置站点 顺序不可调换
  Token.set(access_token)
}

export const loginInfo = async () => {
  const { data: user } = await accountService.currentInfo()
  return user
}

export const loginByToken = async (token) => {
  const { data } = await accountService.loginByToken({ token })
  return data
}

export const setUserInfo = async () => {
  const { data: user } = await accountService.currentInfo()
  store.dispatch('setAccountInfo', user)
  // 提供给cip-form的默认值为模版的数据使用
  settingValueTransformState('user', user)
  return user
}

// WARN: axios-config.js引入此方法进行清除用户信息将导致webpack循环引入，有概率出现问题，建议需要使用时直接复制一个过去
export const removeUserInfo = () => {
  store.dispatch('setAccountInfo', {})
  settingValueTransformState('user', {})
}
