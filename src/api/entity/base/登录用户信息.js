
// undefined
export const 登录用户信息Entity = {
  code: { type: String, _renderConfig: { label: '验证码' } },
  deptId: { type: Number, _renderConfig: { label: '部门id', type: 'number' } },
  id: { type: String, _renderConfig: { label: '用户id' } },
  name: { type: String, _renderConfig: { label: '显示的用户名' } },
  password: { type: String, _renderConfig: { label: '登录密码' } },
  salt: { type: String, _renderConfig: { label: '盐' } },
  username: { type: String, _renderConfig: { label: '登录用户名' } },
  uuid: { type: String, _renderConfig: { label: '验证码uuid' } }
}
