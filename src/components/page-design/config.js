import {
  EditorCode,
  EditorOutline,
  EditorRenderer, EditorTpl, MethodIcon,
  PageParams,
  DataModel
} from './widgets/modules/svg/editor-renderer'

export const modulesConfig = [
  { name: 'pageParams', title: '页面参数', icon: <PageParams/> },
  { name: 'renderer', title: '组件', icon: <EditorRenderer/> },
  { name: 'structure', title: '结构', icon: <EditorOutline/> },
  { name: 'code', title: '源码', icon: <EditorCode/> },
  { name: 'entity', title: '数据模型', icon: <DataModel/> },
  { name: 'tpl', title: '模版', icon: <EditorTpl/> },
  { name: 'methods', title: 'Methods', icon: <MethodIcon /> }
]
