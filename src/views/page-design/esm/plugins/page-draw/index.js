import DrawPageComponent from './component';
import { DrawPlugin } from '../plugin';

class PageDrawPlugin extends DrawPlugin {
  constructor(options) {
    super(options);
    this.config = { name: "page", title: "\u9875\u9762" };
    this.Component = DrawPageComponent;
  }
}

export { PageDrawPlugin };
