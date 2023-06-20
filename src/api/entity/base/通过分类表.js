
// undefined
export const 通过分类表Entity = {
  children: { type: ['this'], _renderConfig: { label: '子分类或者资源', type: 'table' } },
  cnt: { type: Number, _renderConfig: { label: '分类下挂载的资源数量', type: 'number' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  creatorId: { type: String, _renderConfig: { label: '创建者id' } },
  creatorName: { type: String, _renderConfig: { label: '创建者姓名' } },
  id: { type: String, _renderConfig: { label: '主键' } },
  isCate: { type: Boolean, _renderConfig: { label: '是否是分类 true:是 false:不是', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  name: { type: String, _renderConfig: { label: '名称' } },
  namespace: { type: String, _renderConfig: { label: '命名空间 用来区分不同的分类树' } },
  pid: { type: String, _renderConfig: { label: '父级id' } },
  remark: { type: String, _renderConfig: { label: '备注' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } },
  updatorId: { type: String, _renderConfig: { label: '更新者id' } },
  updatorName: { type: String, _renderConfig: { label: '更新者姓名' } }
}
