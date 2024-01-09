import Component from './component-group/index';
import { EditorRenderer } from '../../svg';
import { h } from 'vue';
import { ModulePlugin } from '../plugin';

class PalettePlugin extends ModulePlugin {
  constructor(options) {
    super(options);
    this.Component = Component;
    this.config = { name: "palette", title: "\u7EC4\u4EF6", icon: h(EditorRenderer) };
  }
}

export { PalettePlugin };
