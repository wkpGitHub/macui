import FieldConfigure from './component'
import { ConfigurePlugin } from '@d-render/design'
export class FieldConfigurePlugin extends ConfigurePlugin {
  constructor(options) {
    super(options)
    this.Component = FieldConfigure
    this.config = { name: 'field', title: '字段配置' }
  }
}
