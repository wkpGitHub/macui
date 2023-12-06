import Component from './component'
import { PreviewPlugin } from '@d-render/design'
export class FormPreviewPlugin extends PreviewPlugin {
  constructor (options) {
    super(options)
    this.Component = Component
  }
}
