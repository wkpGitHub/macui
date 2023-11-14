import { generateFieldList, defineFormFieldConfig } from 'd-render'

export const gatewayBranchConfig = {
  category: '逻辑控制',
  type: 'gateway-branch',
  title: '分支',
  labelWidth: '270px',
  formField: generateFieldList(defineFormFieldConfig({
    priority: { type: 'custom-priority', label: '测试' },
    groupsType: {
      label: '条件组关系',
      type: 'switch',
      activeValue: 'AND',
      inactiveValue: 'OR',
      activeText: '且',
      inactiveText: '或'
    },
    expression: {
      label: '条件组表达式',
      placeholder: '输入条件组关系表达式  &为与，|为或'
    },
    conditionGroup: {
      type: 'condition-group'
    },
    nodeType: {
      label: '节点类型',
      type: 'radio',
      options: [
        { label: '排他网关', value: 'xor' },
        { label: '包容网关', value: 'inclusive' },
        { label: '并行网关', value: 'parallel' }
      ]
    },
    branches: {
      label: '分支优先级',
      dependOn: ['nodeType'],
      readable: false,
      changeConfig (config, { nodeType }) {
        if (nodeType === 'xor') {
          config.writable = true
          return config
        }
      }
    },
    defaultBranch: {
      label: '不满足时进入',
      dependOn: ['nodeType'],
      readable: false,
      changeConfig (config, { nodeType }) {
        if (nodeType === 'xor' || nodeType === 'inclusive') {
          config.writable = true
          return config
        }
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'gateway-branch',
    title: '分支',
    conditions: {},
    children: []
  }
}

export const gatewayBranchLineConfig = {
  type: 'gateway-branch-line',
  title: '连线属性',
  labelWidth: '70px',
  formField: generateFieldList(defineFormFieldConfig({
    expression: { label: '条件名称' },
    conditionType: {
      label: '条件规则',
      type: 'radio',
      options: [
        { label: '条件规则', value: 'rules' },
        { label: '公式', value: 'formula' }
      ]
    },
    conditions: {
      label: '条件',
      type: 'filterCondition',
      dependOn: ['conditionType'],
      changeConfig (config, { conditionType }) {
        if (conditionType === 'rules') {
          config.type = 'filterCondition'
        } else {
          config.type = 'input'
        }
        return config
      },
      changeValue ({ conditionType }) {
        if (conditionType === 'rules') {
          return { value: [] }
        } else {
          return { value: '' }
        }
      }
    }
  }))
}
