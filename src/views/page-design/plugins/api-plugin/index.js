import CodeSourceComponent from './component'
import { ApiIcon } from '../../svg'
import { h } from 'vue'
import { ModulePlugin } from '@d-render/design'
export class ApiPlugin extends ModulePlugin {
  constructor (options) {
    super(options)
    this.Component = CodeSourceComponent
    this.config = { name: 'api', title: '接口', icon: h(ApiIcon) }
  }
}
