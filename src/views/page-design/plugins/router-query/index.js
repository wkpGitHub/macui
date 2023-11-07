import RouterQueryComponent from './component'
import { routerQuery } from '../../svg'
import { h } from 'vue'
import { ModulePlugin } from '@d-render/design'
export class RouterQueryPlugin extends ModulePlugin {
  constructor (options) {
    super(options)
    this.Component = RouterQueryComponent
    this.config = { name: 'routerQuery', title: '路由参数', icon: h(routerQuery) }
  }
}
