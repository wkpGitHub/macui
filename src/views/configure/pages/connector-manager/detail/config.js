import { baseDicService } from '@/api'
import {
  generateFieldList,
  defineFormFieldConfig,
  defineTableFieldConfig
} from 'd-render'

const baseConnectService = {
  name: { label: '方法名称', required: true }
}

const tableColumns = generateFieldList(defineTableFieldConfig({
  name: {
    label: '英文名称',
    required: true,
    regexpValidate: /^[0-9a-zA-Z_]+$/,
    regexpValidateErrorMessage: '英文名称由英文字母、数字、下划线组成'
  },
  title: {
    label: '中文名称'
  },
  dataType: {
    required: true,
    label: '字段类型',
    type: 'select',
    optionProps: {
      value: 'id',
      label: 'name'
    },
    async asyncOptions () {
      const { data } = await baseDicService.basicType()
      return data || []
    }
  },
  required: {
    label: '是否必填',
    type: 'singleCheckbox',
    option: {
      value: true,
      inactiveValue: false,
      label: ''
    }
  },
  value: {
    label: '默认值'
  }
}))

function validateJson (val) {
  if (!val?.trim?.()) {
    return {
      data: true
    }
  }
  try {
    JSON.parse(val)
    return {
      data: true
    }
  } catch (error) {
    return {
      data: false,
      message: '请输入合法JSON'
    }
  }
}
validateJson.type = 'change'

export const httpFormFieldList = generateFieldList(defineFormFieldConfig({
  ...baseConnectService,
  'config.inputParams': {
    label: '方法入参',
    type: 'table',
    tableColumnStatus: 'writable',
    options: tableColumns
  },
  'config.path': {
    label: '请求路径',
    required: true,
    otherKey: 'config.httpMethod',
    type: 'urlWithMethod',
    requiredErrorMessage: '请输入请求路径'
  },
  _tabsLayout: {
    type: 'tabsLayout',
    options: [
      {
        label: 'query参数',
        value: 'query',
        children: generateFieldList(defineTableFieldConfig({
          'config.query': {
            type: 'table',
            tableColumnStatus: 'writable',
            options: tableColumns
          }
        }))
      },
      {
        label: 'header',
        value: 'header',
        children: generateFieldList(defineTableFieldConfig({
          'config.header': {
            type: 'table',
            tableColumnStatus: 'writable',
            options: tableColumns
          }
        }))
      },
      {
        label: 'body',
        value: 'body',
        children: generateFieldList(defineTableFieldConfig({
          'config.body.mode': {
            type: 'radio',
            options: [
              { label: 'formdata', value: 'formdata' },
              { label: 'raw', value: 'raw' }
            ],
            defaultValue: 'raw'
          },
          'config.body.formdata': {
            type: 'table',
            readable: false,
            dependOn: ['config.body.mode'],
            tableColumnStatus: 'writable',
            options: tableColumns,
            changeConfig (config, { config: _config }) {
              const mode = _config?.body?.mode
              if (mode === 'formdata') {
                config.writable = true
              } else {
                config.readable = false
              }
              return config
            }
          },
          'config.body.raw': {
            type: 'codemirrorInput',
            mode: 'json',
            height: '200px',
            dependOn: ['config.body.mode'],
            changeConfig (config, { config: _config }) {
              const mode = _config?.body?.mode
              if (mode === 'raw') {
                config.writable = true
              } else {
                config.readable = false
              }
              return config
            },
            customValidators: [
              validateJson
            ]
          }
        }))
      }
    ]
  }
}))

export const emailFormFieldList = generateFieldList(defineFormFieldConfig({
  ...baseConnectService,
  'config.inputParams': {
    label: '方法入参',
    type: 'table',
    tableColumnStatus: 'writable',
    options: tableColumns
  }
}))
