import { branchConfig } from './branch'
import breakConfig from './break'
import continueConfig from './continue'
import exitConfig from './exit'
import loopConfig from './loop'
import setConfig from './set'
import coderConfig from './coder'
import dateFormatConfig from './date-format'
import mappingConfig from './mapping'

/**
 * 通过category字段对组件进行分类
 */
export function classifyCompByCategory (compList) {
  let categorys = compList.map(comp => comp.category)
  // 去重
  categorys = [...new Set(categorys)]
  return categorys.map(category => {
    const comps = compList.filter(comp => comp.category === category)
    return {
      category,
      children: comps
    }
  })
}

// 组件面板展示的组件
export const compList = [
  branchConfig,
  loopConfig,
  continueConfig,
  breakConfig,
  exitConfig,
  setConfig,
  coderConfig,
  dateFormatConfig,
  mappingConfig
]

// 全部组件
export const allCopms = [
  ...compList
]
