import { defineFormFieldConfig, generateFieldList, defineTableFieldConfig } from 'd-render'

export const CUSTOM = 'custom'
export const HTTP = 'http'
export const CTX = 'ctx'
export const formFieldList = generateFieldList(defineFormFieldConfig({
  optType: {
    type: 'select',
    hideLabel: true,
    defaultValue: 'custom',
    options: [
      { label: '自定义选项', value: CUSTOM },
      { label: '外部接口', value: HTTP },
      { label: '上下文变量', value: CTX }
    ]
  },
  options: {
    label: ' ',
    type: 'table',
    dependOn: ['isTree', 'optType'],
    tableColumnStatus: 'writable',
    options: generateFieldList(defineTableFieldConfig({
      label: { label: '显示文本' },
      value: { label: '值', type: 'setFx' }
    })),
    changeConfig (config, { optType, isTree }) {
      config.rowKey = isTree ? 'id' : ''
      config.writable = optType === CUSTOM
      config.readable = optType === CUSTOM
      return config
    }
  },
  optHttp: {
    readable: false,
    label: '接口地址',
    resetValue: true,
    dependOn: ['optType'],
    changeConfig (config, { optType }) {
      config.writable = optType === HTTP
      config.readable = optType === HTTP
      return config
    }
  },
  optCtxVar: {
    readable: false,
    label: '表达式',
    resetValue: true,
    type: 'setFx',
    dependOn: ['optType'],
    changeConfig (config, { optType }) {
      config.writable = optType === CTX
      config.readable = optType === CTX
      return config
    }
  },
  'optionProps.label': {
    readable: false,
    label: '显示字段',
    dependOn: ['optType'],
    changeConfig (config, { optType }) {
      config.writable = optType !== CUSTOM
      config.readable = optType !== CUSTOM
      return config
    }
  },
  'optionProps.value': {
    readable: false,
    label: '值字段',
    dependOn: ['optType'],
    changeConfig (config, { optType }) {
      config.writable = optType !== CUSTOM
      config.readable = optType !== CUSTOM
      return config
    }
  }
}))
