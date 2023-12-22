import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'
import { apiConfigService } from '@/api'

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
const apiList = ''
export default {
  category: '调用服务',
  type: 'apicenter',
  title: 'API中心节点',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题', defaultValue: 'API中心节点' },
    apiKey: {
      label: '调用服务',
      required: true,
      type: 'cascader',
      optionProps: { label: 'name', value: 'id', emitPath: false },
      async asyncOptions () {
        const { data } = await apiConfigService.tree({})
        return data || []
      }
    },
    targetName: { label: '节点出参' },
    inputSource: { hideItem: true, defaultValue: {} },
    outputSource: {
      hideItem: true,
      dependOn: ['apiKey'],
      changeValue ({ apiKey }) {
        const obj = findObjectById(apiList, apiKey)
        console.log(obj)
        return { value: obj ? obj.outputSource : '' }
      }
    },
    inputParams: {
      label: '输入参数',
      type: 'table',
      resetValue: true,
      dependOn: ['inputSource'],
      options: generateFieldList(defineTableFieldConfig({
        key: { writable: true },
        formula: { writable: true, type: 'setFx' }
      }))
    },

    useMapping: {
      label: '参数映射',
      type: 'radio',
      readable: false,
      changeConfig (config, { targetName }) {
        config.writable = !!targetName
        return config
      },
      dependOn: ['targetName'],
      defaultValue: 'none',
      options: [
        { label: '无', value: 'none' },
        { label: '参数映射', value: 'mapping' }
      ]
    },
    outputMapping: {
      type: 'table',
      readable: false,
      dependOn: [
        'targetName',
        'useMapping'
      ],
      changeConfig (config, { targetName, useMapping }) {
        config.writable = !!targetName && useMapping === 'mapping'
        return config
      },
      changeValue ({ useMapping }) {
        if (useMapping === 'none') {
          return {
            value: []
          }
        }
      },
      options: generateFieldList(defineTableFieldConfig({
        key: { required: true, writable: true },
        formula: { writable: true }
      }))
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'apicenter',
    title: 'API中心节点',

    children: [],
    validateFailed: false
  }
}
