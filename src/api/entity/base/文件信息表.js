
// undefined
export const 文件信息表Entity = {
  contentType: { type: String, _renderConfig: { label: '文件类型' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  creatorId: { type: String, _renderConfig: { label: '创建者id' } },
  creatorName: { type: String, _renderConfig: { label: '创建者姓名' } },
  id: { type: String, _renderConfig: { label: '主键' } },
  name: { type: String, _renderConfig: { label: '文件名称' } },
  path: { type: String, _renderConfig: { label: '存储路径' } },
  readableSize: { type: String, _renderConfig: { label: '文件大小可读化表示' } },
  size: { type: Number, _renderConfig: { label: '文件大小表示', type: 'number' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  updatorId: { type: String, _renderConfig: { label: '更新者id' } },
  updatorName: { type: String, _renderConfig: { label: '更新者姓名' } }
}
