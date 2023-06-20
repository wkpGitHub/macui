
// undefined
export const 项目-用户关联信息Entity = {
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  memberType: { type: String, _renderConfig: { label: '成员类型', type: 'select', options: ['creator', 'admin', 'normal'] } },
  projectId: { type: Number, _renderConfig: { label: '项目id', type: 'number' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  userAccount: { type: String, _renderConfig: { label: '用户账号' } },
  userId: { type: String, _renderConfig: { label: '用户id' } },
  userName: { type: String, _renderConfig: { label: '用户显示名称' } }
}
