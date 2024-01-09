const PLUGIN_ENUM = {
  MODULE: 1,
  DRAW: 2,
  CONFIGURE: 3,
  PREVIEW: 4,
  ICON_HANDLE: 5
};
class Plugin {
  constructor(options) {
    this.options = options;
  }
}
class ModulePlugin extends Plugin {
  constructor(options) {
    super(options);
    this.type = PLUGIN_ENUM.MODULE;
  }
}
class DrawPlugin extends Plugin {
  constructor(options) {
    super(options);
    this.type = PLUGIN_ENUM.DRAW;
  }
}
class ConfigurePlugin extends Plugin {
  constructor(options) {
    super(options);
    this.type = PLUGIN_ENUM.CONFIGURE;
  }
}
class PreviewPlugin extends Plugin {
  constructor(options) {
    super(options);
    this.type = PLUGIN_ENUM.PREVIEW;
  }
}
class IconHandlePlugin extends Plugin {
  constructor(options) {
    super(options);
    this.type = PLUGIN_ENUM.ICON_HANDLE;
  }
}

export { ConfigurePlugin, DrawPlugin, IconHandlePlugin, ModulePlugin, PLUGIN_ENUM, PreviewPlugin };
