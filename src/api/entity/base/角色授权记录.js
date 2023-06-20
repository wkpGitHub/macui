
// undefined
export const 角色授权记录Entity = {
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  deptId: { type: Number, _renderConfig: { label: '部门id', type: 'number' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  roleCode: { type: String, _renderConfig: { label: '角色编码' } },
  roleId: { type: Number, _renderConfig: { label: '角色id', type: 'number' } },
  roleName: { type: String, _renderConfig: { label: '角色显示名称' } },
  teamId: { type: Number, _renderConfig: { label: '租户id', type: 'number' } },
  teamName: { type: String, _renderConfig: { label: '租户名称（角色的生效范围）' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  userAccount: { type: String, _renderConfig: { label: '用户账号' } },
  userId: { type: String, _renderConfig: { label: '用户id' } },
  userName: { type: String, _renderConfig: { label: '用户显示名称' } }
}
