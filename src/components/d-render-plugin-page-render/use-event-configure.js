import { inject } from 'vue'
import { formatPath, formatQuery } from '@/lib/utils'
import { isLayoutType } from 'd-render'

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
      eventHandleMap.setVal(event, drPageRender)
    } else if (eventType === 'visible') {
      const item = getListConfigByKey(drPageRender.fieldList, event.target)
      item.config.hideItem = getFxValue(event.value, drPageRender.variables, drPageRender.model)
    } else if (eventType === 'disabled') {
      const item = getListConfigByKey(drPageRender.fieldList, event.target)
      item.config.disabled = getFxValue(event.value, drPageRender.variables, drPageRender.model)
    }
  }
}

const eventHandleMap = {
  setVal (event, drPageRender) {
    const _value = getFxValue(event.value, drPageRender.variables, drPageRender.model)
    // 给组件赋值
    if (event.type === 'module') {
      const item = getListConfigByKey(drPageRender.fieldList, event.target)
      if (item.config.type === 'curd') {
        const pageTable = getListConfigByType([item], 'pageTable')
        drPageRender.dataBus(pageTable.key, _value.list)
        const pagination = getListConfigByType([item], 'pagination')
        drPageRender.dataBus(pagination.config.otherKey[0], _value.page.pageNum)
        drPageRender.dataBus(pagination.config.otherKey[1], _value.page.total)
      } else if (item.config.type === 'pageTable') {
        drPageRender.dataBus(event.target, _value.list)
      } else if (item.config.type === 'pagination') {
        drPageRender.dataBus(item.config.otherKey[0], _value.page.pageNum)
        drPageRender.dataBus(item.config.otherKey[1], _value.page.total)
      } else if (item.config.type === 'blockViewChart') {
        drPageRender.dataBus(event.target, _value.list)
      } else {
        drPageRender.dataBus(event.target, _value)
      }
    } else if (event.type === 'variable') {
      drPageRender.variables[event.target] = _value
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
  let _matched = false
  let _value = str.replace(/\${(.*)?}/g, (match, $1) => {
    _matched = true
    return $1
  })
  const fxList = _value.split('.')
  fxList.forEach((item, index) => {
    if (index === 0) {
      if (_matched) {
        _value = variables[item] || model[item]
      } else {
        _value = item
      }
    } else {
      if (_matched) {
        _value = _value[item]
      } else {
        _value = item
      }
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

export function bindEvent (fn, type, props, e) {
  const { events, id } = props.config
  const value = events?.[type]?.value
  value && fn(value, `${id}_${type}`, e)
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
export function getModules (list, c, pKey = '', disabledLayout) {
  list.forEach(item => {
    const _item = { disabled: disabledLayout && isLayoutType(item.config.type), source: 'module' }
    let _pKey
    if (item.config.type === 'pagination') {
      if (disabledLayout) {
        (item.config.otherKey || []).forEach((k, i) => {
          if (i === 0) {
            c.push({
              name: k,
              title: '当前页',
              source: 'module'
            })
          } else if (i === 1) {
            c.push({
              name: k,
              title: '总条数',
              source: 'module'
            })
          }
        })
      } else {
        _item.name = pKey ? `${pKey}.${item.key}` : item.key
        _item.title = item.config.label
        // 是layout继承当前父亲key，否则继承父亲key+当前key
        _pKey = isLayoutType(item.config.type) ? pKey : _item.name
        c.push(_item)
      }
    } else {
      _item.name = pKey ? `${pKey}.${item.key}` : item.key
      _item.title = item.config.label
      // 是layout继承当前父亲key，否则继承父亲key+当前key
      _pKey = isLayoutType(item.config.type) ? pKey : _item.name
      c.push(_item)
    }
    if (item.config.options) {
      const _children = []
      _item.children = []
      item.config.options.forEach(o => o.children && _children.push(...o.children))
      getModules(_children, _item.children, _pKey, disabledLayout)
    }
  })
}

/**
 *
 * @param {*} disabledLayout 是否禁用layout组件
 * @returns 布局结构
 */
export function getModuleTree (disabledLayout, drDesign) {
  const c = []
  getModules(drDesign.schema?.list || [], c, '', disabledLayout)
  return c
}

function getListConfig (list, key, findType = 'key') {
  let _item = { config: {} }
  function findConfig (list) {
    list.forEach(item => {
      if (item.config[findType] === key) {
        _item = item
        return
      }
      if (item.config?.options) {
        const _children = []
        item.config?.options.forEach(o => o.children && _children.push(...o.children))
        findConfig(_children)
      }
    })
  }
  findConfig(list)
  return _item
}

export function getListConfigByKey (list, key) {
  const keys = key.split('.')
  let _item = { config: {} }
  keys.forEach(k => {
    _item = getListConfig(list, k)
    if (_item.config?.options) {
      const _children = []
      _item.config?.options.forEach(o => o.children && _children.push(...o.children))
      getListConfig(_children)
    }
  })
  return _item
}

export function getListConfigByType (list, type) {
  return getListConfig(list, type, 'type')
}

export function downloadFile (res) {
  // filename放到相应头里，因为返回的数据是二进制流
  const filename = res.headers.filename
  const stream = res.data
  const blob = new Blob([stream])
  const eLink = document.createElement('a')
  eLink.download = filename
  eLink.style.display = 'none'
  eLink.href = URL.createObjectURL(blob)
  document.body.appendChild(eLink)
  eLink.click()
  URL.revokeObjectURL(eLink.href)
  document.body.removeChild(eLink)
}

const fxToValueMap = {
  fx (item, variables, model) {
    const startText = item.value + '('
    const endText = ')'
    let args = ''
    item.arguments.forEach((argList, argIndex) => {
      if (argIndex > 0) {
        args += ','
      }
      let varItemStr = ' '
      argList.forEach((varItem, i) => {
        varItemStr += fxToValueMap[varItem.type](varItem, variables, model)
        if (i < argList.length - 1) {
          varItemStr += ' '
        }
      })
      args += varItemStr
    })
    return startText + args + endText
  },
  var (item, variables, model) {
    // eslint-disable-next-line quotes
    // return `variables['${item.value}'] || model['${item.value}']`
    return JSON.stringify(variables[item.value] || model[item.value])
  },
  constant (item) {
    return (isNaN(Number(item.value))) ? `'${item.value}'` : item.value
  },
  operate (item) {
    return item.value
  }
}
/* eslint-disable */
export function getFxValue (list, variables, model) {
  let str = ''
  list.forEach((item, index) => {
    str += fxToValueMap[item.type](item, variables, model)
  })

  function isNull (value) {
    return !value
  }

  function isNotNull (value) {
    return !!value
  }

  function arrayAt(arr, index) {
    return arr[index]
  }

  return eval(str)
}
/* eslint-enable */
