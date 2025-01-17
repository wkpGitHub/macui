import TableRender from './component';
import { PreviewPlugin } from '../plugin';

class TablePreviewPlugin extends PreviewPlugin {
  constructor(options) {
    super(options);
    this.Component = TableRender;
  }
}

export { TablePreviewPlugin };
