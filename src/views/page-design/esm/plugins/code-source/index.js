import CodeSourceComponent from './component';
import { EditorCode } from '../../svg';
import { h } from 'vue';
import { ModulePlugin } from '../plugin';

class CodeSourcePlugin extends ModulePlugin {
  constructor(options) {
    super(options);
    this.Component = CodeSourceComponent;
    this.config = { name: "code", title: "\u6E90\u7801", icon: h(EditorCode) };
  }
}

export { CodeSourcePlugin };
