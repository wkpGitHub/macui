// micro-app __webpack_public_path__ 修改
import '@cip/components/cip-subapp-container/micro-app/public-path'
import { render } from '@/render/index.js'
import { microAppRender } from '@cip/components/cip-subapp-container/micro-app/util'
import 'element-plus/theme-chalk/index.css'
// @cip/components样式
import '@cip/styles'
// d-render组件样式
import 'd-render/style'
// cci标准主题样式
import '@cip/cci-standard-theme'
// element-ui时期使用的iconfont
import '@cip/plugins/element-icon/index.css'
// 项目全局样式
import '@/style/global.less'
// 项目iconfont(Deprecated)
import '@/assets/icon/iconfont.css'
// 项目svg-icon
import '@/assets/svg-icon'
// dayjs的中文库
import 'dayjs/locale/zh-cn'
// d-render组件配置
import { DRender } from 'd-render'
import renderConfig from '../d-render.config'

import { request } from '@cip/request'
// @cip/request配置
import axiosConfig from '_config/axios-config'
// apiConfig配置，从proxyConfig中提取
import proxyConfig from '_config/proxy-config'
// 求错出错时的提示组件
import CipMessage from '@cip/components/cip-message'

import { menuService } from '@/api'
// import * as xx from 'https://unpkg.com/vue@3/dist/vue.global.js'
const dRender = new DRender()
dRender.setConfig(renderConfig)
request.use({ install: axiosConfig.customAxiosConfig })
request.setConfig({ ...axiosConfig, MessageError: CipMessage.error })
request.setApiConfig(proxyConfig)

if (window.__MICRO_APP_ENVIRONMENT__) {
  microAppRender(render, (cb) => {
    menuService
      .getManagerMenu()
      .then(res => {
        cb(res.data)
      })
  })
} else {
  // 独立时的渲染方式
  console.time('render')
  render().then((res) => {
    console.timeEnd('render')
  })
}
