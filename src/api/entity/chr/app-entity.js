
// 应用信息
export const appEntityEntity = {
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  creatorId: { type: String, _renderConfig: { label: '创建者id' } },
  creatorName: { type: String, _renderConfig: { label: '创建者姓名' } },
  enabled: { type: Boolean, _renderConfig: { label: '是否启用', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  logo: { type: String, _renderConfig: { label: 'logo图片id' } },
  name: { type: String, _renderConfig: { label: '名称' } },
  path: { type: String, _renderConfig: { label: '唯一编码,应用访问路径' } },
  remark: { type: String, _renderConfig: { label: '描述' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  updatorId: { type: String, _renderConfig: { label: '更新者id' } },
  updatorName: { type: String, _renderConfig: { label: '更新者姓名' } }
}
