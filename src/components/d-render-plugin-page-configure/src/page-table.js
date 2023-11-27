import { getItemConfig } from '../utils'
import { generateFieldList } from 'd-render'

export default {
  // key: { readable: true },
  api: {
    label: '接口',
    type: 'select-api',
    dependOn: ['options', 'key'],
    onChange ({ api, dependOn }) {
      const pageTable = dependOn.options?.find(o => o.key === 'default')
      pageTable.children = (api.outParams || []).map(opt => getItemConfig(opt))
    }
  },
  'api.inputParams': {
    label: '参数',
    type: 'table',
    hideIndex: true,
    hideAdd: true,
    hideDelete: true,
    options: generateFieldList({
      name: { label: '变量名', writable: true },
      value: { label: '默认值', writable: true, type: 'pageFx' }
    })
  },
  otherKey: {
    type: 'select',
    allowCreate: true,
    realArray: true,
    multiple: true,
    limit: 2,
    description: '[pageNum]'
  },
  defaultValueType: {
    label: '默认值',
    type: 'select',
    defaultValue: 'custom',
    options: [
      { value: 'custom', label: '自定义' },
      { value: 'dependOn', label: '数据联动' }
    ]
  },
  changeValueStr: {
    type: 'select-dependOn',
    canOutDependOn: true,
    otherKey: ['dependOn', 'valueChangeConfig'],
    readable: false,
    dependOn: ['defaultValueType', 'id', 'label'],
    changeConfig (config, { defaultValueType }) {
      if (defaultValueType === 'dependOn') {
        config.readable = true
        config.writable = true
      }
      return config
    }
  },
  defaultValue: {
    placeholder: '请输入默认值',
    hideLabel: true,
    readable: false,
    dependOn: ['defaultValueType'],
    changeConfig (config, { defaultValueType }) {
      if (defaultValueType === 'custom') {
        config.readable = true
        config.writable = true
      }
      return config
    }
  },
  // changeValueStr: {
  //   type: 'out-dependOn',
  //   otherKey: ['dependOn', ]
  //     defaultValue: `
  //     return new Promise((resolve) => {
  //       fetch("/apiChr/lRoad/api/v2/pdm/device-list").then(res => {
  //         return res.json()
  //       }).then(({data}) => {
  //         console.log(data.list)
  // console.log(dependOnValues, 'dependOnValues')
  //         resolve({value: data.list})
  //       })
  //     })`

  // },
  // model: {
  //   label: '数据模型',
  //   type: 'selectModule'
  // },
  // options: {
  //   dependOn: ['model'],
  //   changeValue ({ model }) {
  //     return {
  //       value: [{
  //         key: 'default',
  //         children: (model?.children || []).map(opt => getItemConfig(opt))
  //       }]
  //     }
  //   }
  // },
  hideLabel: {},
  hideAdd: { type: 'switch' },
  hideDelete: { type: 'switch' },
  tableColumnStatus: { type: 'select', options: ['writable'] }
}
