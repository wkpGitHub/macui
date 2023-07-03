import {
  EditorCode,
  EditorOutline,
  EditorRenderer, EditorTpl,
  PageParams
} from './widgets/modules/svg/editor-renderer'

export const modulesConfig = [
  { name: 'pageParams', title: '页面参数', icon: <PageParams/>, component: () => import('./widgets/side-components/page-params') },
  { name: 'renderer', title: '组件', icon: <EditorRenderer/>, component: () => import('@d-render/design/esm/cip-form-design/widgets/form-components') },
  { name: 'outline', title: '结构', icon: <EditorOutline/> },
  { name: 'code', title: '源码', icon: <EditorCode/> },
  { name: 'tpl', title: '模版', icon: <EditorTpl/> }
]
