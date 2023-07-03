import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'
import { v4 as uuid } from 'uuid'
export default {
  category: '流程管理',
  type: 'web-api',
  title: '调用服务',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称' },
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
    outputParamName: {
      label: '输出参数名称',
      dependOn: ['label'],
      changeValue ({ label }) {
        return { value: label + '_371b' }
      },
      description: '输出当前记录的ID，方便于流程中的其他节点引用它；可输入中文、数字、字母或者下划线_'
    },
    inputParams: {
      label: '输入参数',
      type: 'table',
      options: generateFieldList(defineTableFieldConfig({
        key: { required: true, writable: true },
        formula: { writable: true }
      }))
    },
    objectType: {
      hideItem: true,
      defaultValue: 'api'
    },
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
      writable: false,
      readable: true,
      defaultValue: uuid()
    },
    rootId: {
      hideItem: true,
      writable: false,
      readable: true,
      defaultValue: uuid()
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'web-api',
    title: '流程管理',
    conditions: {},
    children: []
  }
}
