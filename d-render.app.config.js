// cci插件
import CCIPlugin from '@cip/d-render-plugin-cci'
import '@cip/d-render-plugin-cci/dist/index.css'
// 自定义的输入插件
import pageRenderPlugin from '@/components/d-render-plugin-page-render/config'
export default {
  components: {
    // 自定义的输入类型
    // codeMirror: (mode) => () => import(`@cip/plugins/form/form-input/basic/code-mirror${mode}`)
  },
  plugins: [
    CCIPlugin,
    pageRenderPlugin
  ]
}
