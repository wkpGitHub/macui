import AdvancedConfigure from '../css/configure'
import { ConfigurePlugin } from '@d-render/design'
export class AdvancedConfigurePlugin extends ConfigurePlugin {
  constructor (options) {
    super(options)
    this.Component = <AdvancedConfigure type="advanced"></AdvancedConfigure>
    this.config = { name: 'advanced', title: '高级' }
  }
}
