
// 应用配置信息
export const appConfigEntityEntity = {
  appId: { type: Number, _renderConfig: { label: '应用id', type: 'number' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  key: { type: String, _renderConfig: { label: 'key' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  value: { type: String, _renderConfig: { label: 'value' } }
}
