import { parseTemplate } from 'url-template'
const qs = require('qs')
// 根据参数对象返回path
export const formatPath = (params = {}) => {
  const keys = Object.keys(params)
  const url = keys.reduce((path, key) => {
    path += `/${key}`
    return path
  }, '')
  const urlTemplate = parseTemplate(url)
  return urlTemplate.expand(params)
}

// 根据参数对象返回query参数
export const formatQuery = (params) => {
  return qs.stringify(params, { addQueryPrefix: true })
}

// 根据exclude和include筛选数据
export const filterList = (originList, exclude = [], include = [], key = 'value') => {
  const isExclude = Array.isArray(exclude) && exclude.length
  const _keyArr = isExclude ? exclude : include
  if (!_keyArr.length) return originList
  return originList.filter(item => _keyArr.includes(item[key]) ^ isExclude)
}
