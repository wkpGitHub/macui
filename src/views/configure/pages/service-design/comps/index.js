import { branchConfig } from './branch'
import breakConfig from './break'
import continueConfig from './continue'
import exitConfig from './exit'
import loopConfig from './loop'
import setConfig from './set'
import coderConfig from './coder'
import notificationConfig from './notification'
import webApiConfig from './web-api'
import manualNodeConfig from './manual-node'
import dateFormatConfig from './date-format'
import mappingConfig from './mapping'
import createDataRecordsConfig from './create-data-records'
import deleteDataRecordsConfig from './delete-data-records'
import updateDataRecordsConfig from './update-data-records'
import queryDataRecordsConfig from './query-data-records'
import httpConfig from './http'
import apicenterConfig from './apicenter'
import datasourceSqlConfig from './datasource-sql'
import scriptConfig from './script'
import connectorConfig from './connector'
import emailConfig from './email'
import writeConfig from './write'
import captureTimeConfig from './capture-time'
import startConfig from './start'
import endConfig from './end'
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
  mappingConfig,
  createDataRecordsConfig,
  deleteDataRecordsConfig,
  updateDataRecordsConfig,
  queryDataRecordsConfig,
  httpConfig,
  apicenterConfig,
  notificationConfig,
  webApiConfig,
  manualNodeConfig,
  datasourceSqlConfig,
  scriptConfig,
  connectorConfig,
  emailConfig,
  writeConfig,
  captureTimeConfig
]

// 全部组件
export const allCopms = [
  ...compList,
  startConfig,
  endConfig
]
