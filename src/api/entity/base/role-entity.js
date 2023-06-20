
// undefined
export const roleEntityEntity = {
  authRoleId: { type: Number, _renderConfig: { label: undefined, type: 'number' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  editable: { type: Boolean, _renderConfig: { label: '是否可编辑', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  ename: { type: String, _renderConfig: { label: '角色编码' } },
  functionIds: { type: String, _renderConfig: { label: '角色功能id列表' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  name: { type: String, _renderConfig: { label: '名称' } },
  remark: { type: String, _renderConfig: { label: '说明' } },
  teamId: { type: Number, _renderConfig: { label: '租户id', type: 'number' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } }
}
