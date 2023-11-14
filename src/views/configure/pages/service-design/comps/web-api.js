import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'
import { v4 as uuid } from 'uuid'

function findObjectById (arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr[i]
    } else if (arr[i].children && arr[i].children.length > 0) {
      const result = findObjectById(arr[i].children, id)
      if (result) {
        return result
      }
    }
  }
  return null
}
const staticInfoStyle = {
  fontWeight: 'bold',
  fontSize: 16,
  inputStyle: {
    borderBottom: '1px solid #ccc',
    padding: '0 0 10px 0'
  }
}
let apiList = ''
export default {
  category: '流程管理',
  type: 'web-api',
  title: '调用服务',
  labelWidth: '120px',
  formField: generateFieldList(defineFormFieldConfig({
    _staticInfo1: { type: 'staticInfo', staticInfo: '节点信息', ...staticInfoStyle },
    label: { label: '节点名称', defaultValue: '调用服务' },
    apiKey: {
      label: '调用服务',
      required: true,
      type: 'cascader',
      optionProps: { label: 'name', value: 'id', emitPath: false },
      asyncOptions () {
        apiList = [{
          name: '拜访跟进',
          id: 'bqwesadzxc',
          children: [
            {
              name: '添加合同',
              id: '123axzcads',
              apiInputParams: '',
              apiOutputParams: {
                type: 'object',
                requried: [],
                properties: {
                  data: {
                    type: 'string'
                  },
                  msg: {
                    type: 'string'
                  },
                  status: {
                    type: 'number'
                  }
                }
              },
              inputSource: [],
              outputSource: [
                {
                  label: 'msg',
                  value: 'msg',
                  type: 'string'
                },
                {
                  label: 'data',
                  value: 'data',
                  type: 'string'
                },
                {
                  label: 'status',
                  value: 'status',
                  type: 'number'
                }
              ]
            }
          ]
        }]
        return apiList
      }
    },
    outputParamName: {
      label: '输出参数名称',
      dependOn: ['label'],
      changeValue ({ label }) {
        return { value: label + '_371b' }
      },
      description: '输出当前记录的ID，方便于流程中的其他节点引用它；可输入中文、数字、字母或者下划线_'
    },
    _staticInfo2: { type: 'staticInfo', staticInfo: '输入参数', ...staticInfoStyle },
    inputParams: {
      label: '输入参数',
      type: 'table',
      options: generateFieldList(defineTableFieldConfig({
        key: { writable: true },
        formula: { writable: true }
      }))
    },
    objectType: {
      hideItem: true,
      defaultValue: 'api'
    },
    _staticInfo3: { type: 'staticInfo', staticInfo: '输出参数', ...staticInfoStyle },
    useMapping: {
      label: '参数映射',
      type: 'radio',
      defaultValue: false,
      options: [
        { label: '无', value: false },
        { label: '参数映射', value: true }
      ]
    },
    outputMapping: {
      type: 'table',
      readable: false,
      dependOn: [
        'useMapping'
      ],
      changeConfig (config, { useMapping }) {
        config.writable = useMapping === true
        return config
      },
      changeValue ({ useMapping }) {
        if (useMapping === false) {
          return {
            value: []
          }
        }
      },
      options: generateFieldList(defineTableFieldConfig({
        key: { required: true, writable: true },
        formula: { writable: true }
      }))
    },
    id: {
      label: '节点id',
      hideItem: true,
      defaultValue: uuid()
    },
    rootId: {
      hideItem: true,
      defaultValue: uuid()
    },
    inputSource: {
      hideItem: true,
      dependOn: ['apiKey'],
      changeValue ({ apiKey }) {
        const obj = findObjectById(apiList, apiKey)
        console.log(obj)
        return { value: obj ? obj.inputSource : '' }
      }
    },
    outputSource: {
      hideItem: true,
      dependOn: ['apiKey'],
      changeValue ({ apiKey }) {
        const obj = findObjectById(apiList, apiKey)
        console.log(obj)
        return { value: obj ? obj.outputSource : '' }
      }
    },
    apiInputParams: {
      hideItem: true,
      dependOn: ['apiKey'],
      changeValue ({ apiKey }) {
        const obj = findObjectById(apiList, apiKey)
        console.log(obj)
        return { value: obj ? obj.apiOutputParams : '' }
      }
    },
    apiOutputParams: {
      hideItem: true,
      dependOn: ['apiKey'],
      changeValue ({ apiKey }) {
        const obj = findObjectById(apiList, apiKey)
        console.log(obj)
        return { value: obj ? obj.apiOutputParams : '' }
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'web-api',
    title: '调用服务',
    conditions: {},
    children: []
  }
}
