import DataModelComponent from './component'
import { DataModel } from '../../svg'
import { h } from 'vue'
import { ModulePlugin } from '@d-render/design'
export class DataModelPlugin extends ModulePlugin {
  constructor (options) {
    super(options)
    this.Component = DataModelComponent
    this.config = { name: 'data-model', title: '数据模型', icon: h(DataModel) }
  }
}
