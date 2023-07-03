import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'

export default {
  category: '调用服务',
  type: 'apicenter',
  title: 'API中心节点',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    validateFailed: {
      hideItem: true,
      defaultValue: false
    },
    apiKey: {
      label: '调用服务',
      required: true,
      otherKey: ['inputSource', 'outputSource'],
      type: 'cascader',
      optionProps: { label: 'name', value: 'id', emitPath: false },
      asyncOptions () {
        return [
          {
            name: '拜访跟进',
            id: 'bqwesadzxc',
            children: [
              {
                name: '添加合同',
                id: '123axzcads'
              }
            ]
          }
        ]
      }
    },
    targetName: { label: '节点出参' },

    inputParams: {
      label: '输入参数',
      type: 'table',
      resetValue: true,
      dependOn: ['inputSource'],
      options: generateFieldList(defineTableFieldConfig({
        key: {
          dynamic: true,
          writable: true,
          outDependOn: ['inputSource'],
          type: 'select',
          asyncOptions ({ inputSource }) {
            return inputSource || []
          }
        },
        formula: { writable: true }
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
    conditions: {},
    children: []
  }
}
