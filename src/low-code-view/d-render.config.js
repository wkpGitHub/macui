// cci插件
import CCIPlugin from '@cip/d-render-plugin-cci'
import { insertConfig } from '@d-render/shared'
import '@cip/d-render-plugin-cci/dist/index.css'
import CCIPluginConfigure from '@cip/d-render-plugin-cci-configure'
// 自定义的输入插件
import customInputsPlugin from './custom-form-input/component-config'
import pageRenderPlugin from './d-render-plugin-page-render/config'
import pageRenderDesignPlugin from './d-render-plugin-page-deisgn'
import pageRenderConfigurePlugin from './d-render-plugin-page-configure'
export default {
  components: {
    // 自定义的输入类型
    codeMirror: (mode) => () => import(`@cip/plugins/form/form-input/basic/code-mirror${mode}`)
    // blockViewChart: (mode) => () => import(`@lc/components/block-view-chart${mode}`)
  },
  plugins: [
    CCIPlugin,
    customInputsPlugin,
    pageRenderPlugin,
    pageRenderDesignPlugin
  ].map(v => insertConfig(v, CCIPluginConfigure, 'configure'))
    .map(v => insertConfig(v, pageRenderConfigurePlugin, 'configure')) // insertConfigureFile(v, customConfigurePlugin))
}
