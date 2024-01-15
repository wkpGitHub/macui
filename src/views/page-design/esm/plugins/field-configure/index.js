import FieldConfigure from './component';
import { ConfigurePlugin } from '../plugin';

class FieldConfigurePlugin extends ConfigurePlugin {
  constructor(options) {
    super(options);
    this.Component = FieldConfigure;
    this.config = { name: "field", title: "\u5B57\u6BB5\u914D\u7F6E" };
  }
}

export { FieldConfigurePlugin };
