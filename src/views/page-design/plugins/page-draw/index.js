import DrawPageComponent from './component'
import { DrawPlugin } from '@d-render/design'
export class PageDrawPlugin extends DrawPlugin {
  constructor (options) {
    super(options)
    this.config = { name: 'page', title: '页面' }
    this.Component = DrawPageComponent
  }
}
