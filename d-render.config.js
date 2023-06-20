// cci插件
import CCIPlugin from '@cip/d-render-plugin-cci'
import { insertConfigureFile } from '@/lib/helper'
import '@cip/d-render-plugin-cci/dist/index.css'
// 自定义的输入插件
import customInputsPlugin from '@/components/custom-form-input/component-config'
import customLayoutPlugin from '@/components/custom-form-layout/component-config'
import customConfigurePlugin from '@/components/page-design/component-configure/config'
export default {
  components: {
    // 自定义的输入类型
    codeMirror: (mode) => () => import(`@cip/plugins/form/form-input/basic/code-mirror${mode}`)
  },
  plugins: [
    CCIPlugin,
    customInputsPlugin,
    customLayoutPlugin
  ].map(v => insertConfigureFile(v, customConfigurePlugin))
}
