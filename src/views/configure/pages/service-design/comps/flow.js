import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'

export default {
  category: '自动节点',
  type: 'flow',
  title: '调用流程',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点名称', defaultValue: '调用流程' },
    id: {
      label: '子流程',
      required: true,
      type: 'cascader',
      optionProps: { label: 'name', value: 'id', emitPath: false },
      asyncOptions () {
        const apiList = [
          {
            name: '拜访跟进',
            id: 'bqwesadzxc',
            children: [
              {
                name: '添加合同',
                id: '123axzcads',
                outputSource: [
                  {
                    label: '服务出参',
                    selectMode: 'tree',
                    type: 'object',
                    tag: '对象',
                    children: [
                      {
                        type: 'string',
                        tag: '文本',
                        label: 'msg',
                        value: 'msg'
                      },
                      {
                        type: 'string',
                        tag: '文本',
                        label: 'data',
                        value: 'data'
                      },
                      {
                        type: 'number',
                        tag: '数字',
                        label: 'status',
                        value: 'status'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
        return apiList
      }
    },
    blockMaster: {
      type: 'select',
      label: '流转规则',
      options: [
        { label: '等待：子流程结束后继续流转', value: true },
        { label: '不等待：子流程发起后继续流转', value: false }
      ]
    },
    processStrategy: {
      type: 'select',
      label: '多例处理',
      options: [
        { label: '并行', value: 'parallel' },
        { label: '串行', value: 'serial' }
      ]
    },
    activityControllers: {
      label: '实例控制'
    },
    activityInitiators: {
      label: '子流程启动者'
    },
    inputParams: {
      label: '输入参数',
      type: 'table',
      options: generateFieldList(defineTableFieldConfig({
        key: { writable: true },
        formula: { writable: true }
      }))
    },
    outputParams: {
      label: '输出参数',
      type: 'table',
      options: generateFieldList(defineTableFieldConfig({
        key: { writable: true },
        formula: { writable: true }
      }))
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'flow',
    title: '调用流程',
    conditions: {},
    validateFailed: false,
    children: []
  }
}
