import RouterQueryComponent from './component'
import { routerQuery } from '../../svg'
import { h } from 'vue'
import { ModulePlugin } from '@d-render/design'
export class VariablesPlugin extends ModulePlugin {
  constructor (options) {
    super(options)
    this.Component = RouterQueryComponent
    this.config = { name: 'variables', title: '页面变量', icon: h(routerQuery) }
  }
}
