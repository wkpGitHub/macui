import CodeSourceComponent from './component'
import { MethodIcon } from '../../svg'
import { h } from 'vue'
import { ModulePlugin } from '@d-render/design'
export class FxPlugin extends ModulePlugin {
  constructor (options) {
    super(options)
    this.Component = CodeSourceComponent
    this.config = { name: 'fx', title: '函数', icon: h(MethodIcon) }
  }
}
