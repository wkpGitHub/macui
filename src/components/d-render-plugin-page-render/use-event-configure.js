import { inject } from 'vue'
import { formatPath, formatQuery } from '@/lib/utils'
// 处理页面跳转
const handleRouter = (event, { router }, options) => {
  const params = event.pageParams.reduce((data, cur) => {
    data[cur.key] = cur.value
    return data
  }, {})
  const queryString = formatQuery(params)
  if (Object.prototype.toString.call(options) === '[object Object]') {
    // TODO 支持outDependOnValues
    event.pageUrl += formatPath(options.dependOnValues)
  }
  event.isNewTab
    ? window.open(`${event.pageUrl}${queryString}`)
    : router.push({ path: event.pageUrl, query: { ...params } })
}
export const handleEvent = async (e, drPageRender, options) => {
  const events = [].concat(e)
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    const { eventType } = event
    if (eventType === 'openDialog') {
      drPageRender.dataBus(event.dialogKey, true)
    } else if (eventType === 'method') {
      const method = drPageRender.methods[event.methods]
      if (method.type === 'event') await handleEvent(method.events, drPageRender, options)
      else if (method.type === 'js') {
        if (method) await method.fn(options)
      }
    } else if (eventType === 'script') {
      // eslint-disable-next-line no-eval
      eval(event.script)
    } else if (eventType === 'router') {
      handleRouter(event, drPageRender, options)
    } else if (eventType === 'api') {
      await drPageRender.apiList[event.api](options)
    } else if (eventType === 'setVal') {
      const _value = getVarValue(event.value, drPageRender.variables, drPageRender.model)
      if (event.type === 'module') {
        debugger
        drPageRender.dataBus(event.target, _value)
      } else if (event.type === 'variable') {
        drPageRender.variables[event.target] = _value
      }
    }
  }
}

/**
 *
 * @param {String} str 需要解析的字符串
 * @param {Object} variables 存储变量值的map对象
 * @returns 真正的值
 */
export function getVarValue (str = '', variables, model) {
  let _value = str.replace(/\${(.*)?}/g, (match, $1) => {
    return $1
  })
  const fxList = _value.split('.')
  fxList.forEach((item, index) => {
    if (index === 0) {
      _value = variables[item] || model[item] || item
    } else {
      _value = _value[item] || model[item] || item
    }
  })
  return _value
}

export const useEventConfigure = () => {
  const drPageRender = inject('drPageRender', {})
  const handleEventBridge = (e, varKey, options) => {
    if (varKey) drPageRender.variables[varKey] = options
    return handleEvent(e, drPageRender, options)
  }
  return handleEventBridge
}

// function getModules (list) {
//   return list.map(item => {
//     const _item = {}
//     _item.name = item.key
//     _item.title = item.config.label
//     if (item.config.options) {
//       const _children = []
//       item.config.options.forEach(o => o.children && _children.push(...o.children))
//       _item.children = getModules(_children)
//     }
//     return _item
//   })
// }
function getModules (list, c) {
  list.forEach(item => {
    const _item = {}
    if (item.config.type === 'pagination') {
      (item.config.otherKey || []).forEach((k, i) => {
        if (i === 0) {
          c.push({
            name: k,
            title: '当前页'
          })
        } else if (i === 1) {
          c.push({
            name: k,
            title: '总条数'
          })
        }
      })
    } else {
      _item.name = item.id
      _item.title = item.config.label
      c.push(_item)
    }
    if (item.config.options) {
      const _children = []
      _item.children = []
      item.config.options.forEach(o => o.children && _children.push(...o.children))
      getModules(_children, _item.children)
    }
  })
}
export function getModuleTree () {
  const drDesign = inject('drDesign', {})
  const c = []
  getModules(drDesign.schema?.list || [], c)
  return c
}
