import FieldConfigure from './component';
import { ConfigurePlugin } from '../plugin';

class TableConfigurePlugin extends ConfigurePlugin {
  constructor(options) {
    super(options);
    this.Component = FieldConfigure;
    this.config = { name: "table", title: "\u8868\u683C\u914D\u7F6E" };
  }
}

export { TableConfigurePlugin };
