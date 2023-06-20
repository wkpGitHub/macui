
// undefined
export const 系统功能Entity = {
  children: { type: ['this'], _renderConfig: { label: '子资源', type: 'table' } },
  createTime: { type: Date, _renderConfig: { label: '创建时间', type: 'date', viewType: 'datetime' } },
  ename: { type: String, _renderConfig: { label: '编码' } },
  fullPathName: { type: String, _renderConfig: { label: '名称全路径' } },
  icon: { type: String, _renderConfig: { label: '图标' } },
  id: { type: Number, _renderConfig: { label: '主键', type: 'number' } },
  isBack: { type: Boolean, _renderConfig: { label: '是否回退', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  isBtn: { type: Boolean, _renderConfig: { label: '是否是按钮', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  isCache: { type: Boolean, _renderConfig: { label: '是否缓存', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  isDir: { type: Boolean, _renderConfig: { label: '是否是分类', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  isOpen: { type: Boolean, _renderConfig: { label: 'isOpen', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  isPublic: { type: Boolean, _renderConfig: { label: '表示其和其子功能权限能够被租户角色管理功能浏览并配置授权', type: 'select', options: [{ value: true, label: '是' }, { value: false, label: '否' }] } },
  name: { type: String, _renderConfig: { label: '名称' } },
  pid: { type: Number, _renderConfig: { label: '父级id', type: 'number' } },
  seq: { type: Number, _renderConfig: { label: '排序', type: 'number' } },
  updateTime: { type: Date, _renderConfig: { label: '更新时间', type: 'date', viewType: 'datetime' } }
}
