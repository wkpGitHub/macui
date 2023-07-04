// cci插件
import CCIPlugin from '@cip/d-render-plugin-cci'
import { insertConfig } from '@d-render/shared'
import '@cip/d-render-plugin-cci/dist/index.css'
import CCIPluginConfigure from '@cip/d-render-plugin-cci-configure'
// 自定义的输入插件
import customInputsPlugin from '@/components/custom-form-input/component-config'
import customLayoutPlugin from '@/components/custom-form-layout/component-config'
import pageDesignPlugin from '@/components/page-design-components/component-config'
import customConfigurePlugin from '@/components/page-design/component-configure/config'
export default {
  components: {
    // 自定义的输入类型
    codeMirror: (mode) => () => import(`@cip/plugins/form/form-input/basic/code-mirror${mode}`)
  },
  plugins: [
    CCIPlugin,
    customInputsPlugin,
    customLayoutPlugin,
    pageDesignPlugin
  ].map(v => insertConfig(v, CCIPluginConfigure, 'configure'))
    .map(v => insertConfig(v, customConfigurePlugin, 'configure')) // insertConfigureFile(v, customConfigurePlugin))
}
