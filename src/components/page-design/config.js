import {
  EditorCode,
  EditorOutline,
  EditorRenderer, EditorTpl, MethodIcon,
  PageParams
} from './widgets/modules/svg/editor-renderer'

export const modulesConfig = [
  { name: 'pageParams', title: '页面参数', icon: <PageParams/> },
  { name: 'renderer', title: '组件', icon: <EditorRenderer/> },
  { name: 'structure', title: '结构', icon: <EditorOutline/> },
  { name: 'code', title: '源码', icon: <EditorCode/> },
  { name: 'tpl', title: '模版', icon: <EditorTpl/> },
  { name: 'methods', title: 'Methods', icon: <MethodIcon /> }
]
