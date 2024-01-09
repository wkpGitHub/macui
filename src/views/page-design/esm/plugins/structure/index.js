import Component from './component';
import { EditorOutline } from '../../svg';
import { h } from 'vue';
import { ModulePlugin } from '../plugin';

class StructurePlugin extends ModulePlugin {
  constructor(options) {
    super(options);
    this.Component = Component;
    this.config = { name: "structure", title: "\u7ED3\u6784", icon: h(EditorOutline) };
  }
}

export { StructurePlugin };
