// 将configure文件注入 render组件
import { defineAsyncComponent } from 'vue'
export const insertConfigureFile = (plugin, configures) => {
  return Object.keys(configures).reduce((acc, key) => {
    const originConfig = plugin[key]
    let newConfig = {}
    if (originConfig) {
      // 生成新的组件配置
      if (typeof originConfig === 'function') {
        newConfig = (mode) => {
          if (mode === '/configure') {
            return configures[key]
          } else {
            return originConfig
          }
        }
      } else {
        const { component, ...otherConfig } = originConfig
        newConfig = { ...otherConfig }
        newConfig.component = (mode) => {
          if (mode === '/configure') {
            return configures[key]
          } else {
            return component(mode)
          }
        }
      }
      acc[key] = newConfig
    }
    return acc
  }, plugin)
}
