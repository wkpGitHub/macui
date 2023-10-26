


# 主体框架：design/src/components/basic/index
### modules 左侧  
export class CodeSourcePlugin extends ModulePlugin 
this.type = PLUGIN_ENUM.MODULE
### nav 左二侧
```js
// 渲染代码：design/src/components/basic/index
// 根据name来区别，渲染哪个module
{modules.map(module => {
  const { Component, config } = module
  return config.name === currentModuleName.value && <Component

// 实际代码在插件js中，指定的component
export class CodeSourcePlugin extends ModulePlugin {
  constructor (options) {
    super(options)
    this.Component = CodeSourceComponent
    this.config = { name: 'code', title: '源码', icon: h(EditorCode) }
  }
}
```
### content中间内容

内容组件： design\src\widgets\drawing\index.jsx
```
// 其中的props.Component :design/src/plugins/page-draw 

// 真正根据type渲染内容函数在 design\src\widgets\drawing\widgets\content.jsx
了解数据结构，如何根据结构生成页面 ？？ 如何扩展

```

### configure右侧配置
// design\src\plugins\field-configure
// 根据插件的type: this.type = PLUGIN_ENUM.CONFIGURE
```js
export class ConfigurePlugin extends Plugin {
  constructor (options) {
    super(options)
    this.type = PLUGIN_ENUM.CONFIGURE
  }
}

export class FieldConfigurePlugin extends ConfigurePlugin {
  constructor (options) {
    super(options)
    this.Component = FieldConfigure
    this.config = { name: 'field', title: '字段配置' }
  }
}
```
// 根据插槽中有没有 configure，来决定使用默认的还是自定义
// 默认的值在config字段里绑定
```js
{configure.map(conf => {
  const { config, Component } = conf
  return config.name === currentTab.value && <Component
    key={config.name}
    schema={props.schema}
    onUpdate:schema={updateSchema}
    v-model:selectItem={selectItem.value}
  />
})}
{ slots.configure?.({ name: currentTab.value, selectItem, updateSelectItem }) }
```

### preview 
// 还没有开发完，自己提供插件
// 根据插件的type: this.type = PLUGIN_ENUM.PREVIEW


@/views/app/pages/low-code
@/components/page-render