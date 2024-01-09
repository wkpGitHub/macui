import Component from './component';
import { PreviewPlugin } from '../plugin';

class FormPreviewPlugin extends PreviewPlugin {
  constructor(options) {
    super(options);
    this.Component = Component;
  }
}

export { FormPreviewPlugin };
