import DrawFormComponent from './component';
import { DrawPlugin } from '../plugin';

class FormDrawPlugin extends DrawPlugin {
  constructor(options) {
    super(options);
    this.config = { name: "from", title: "\u8868\u5355" };
    this.Component = DrawFormComponent;
  }
}

export { FormDrawPlugin };
