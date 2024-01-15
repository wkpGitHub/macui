import DrawFormComponent from './component';
import { DrawPlugin } from '../plugin';

class TableDrawPlugin extends DrawPlugin {
  constructor(options) {
    super(options);
    this.config = { name: "table", title: "\u8868\u683C" };
    this.Component = DrawFormComponent;
  }
}

export { TableDrawPlugin };
