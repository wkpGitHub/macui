import CssConfigure from './configure'
import { ConfigurePlugin } from '@d-render/design'
export class CssConfigurePlugin extends ConfigurePlugin {
  constructor (options) {
    super(options)
    this.Component = <CssConfigure type="css"></CssConfigure>
    this.config = { name: 'css', title: '样式' }
  }
}
