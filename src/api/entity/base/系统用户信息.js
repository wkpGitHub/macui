
// undefined
export const 系统用户信息Entity = {
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  deptId: { type: Number, _renderConfig: { label: '部门id', type: 'number' } },
  deptName: { type: String, _renderConfig: { label: '部门名称' } },
  id: { type: String, _renderConfig: { label: '主键' } },
  markedForDeletion: { type: Boolean, _renderConfig: { label: '标记为将要删除', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  name: { type: String, _renderConfig: { label: '用户显示名称' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  username: { type: String, _renderConfig: { label: '登录用户名' } }
}
