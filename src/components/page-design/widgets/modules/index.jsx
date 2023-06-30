import { PageParams, EditorCode, EditorTpl, EditorOutline, EditorRenderer } from './svg/editor-renderer'
import { ElIcon } from 'element-plus'
export default {
  setup () {
    const modulesConfig = [
      { name: 'pageParams', icon: <PageParams/> },
      { name: 'renderer', icon: <EditorRenderer/> },
      { name: 'code', icon: <EditorCode/> },
      { name: 'outline', icon: <EditorOutline/> },
      { name: 'tpl', icon: <EditorTpl/> }
    ]
    return () => <div>
      {modulesConfig.map(module => <div>
        <ElIcon style={'font-size: 24px;'}>{module.icon}</ElIcon>
      </div>)}
    </div>
  }
}
