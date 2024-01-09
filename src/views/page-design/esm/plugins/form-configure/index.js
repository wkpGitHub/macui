import FieldConfigure from './component';
import { ConfigurePlugin } from '../plugin';

class FormConfigurePlugin extends ConfigurePlugin {
  constructor(options) {
    super(options);
    this.Component = FieldConfigure;
    this.config = { name: "form", title: "\u8868\u5355\u914D\u7F6E" };
  }
}

export { FormConfigurePlugin };
