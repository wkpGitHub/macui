import { generateFieldList, defineFormFieldConfig } from 'd-render'

export const gatewayBranchLineConfig = {
  type: 'gateway-branch-line',
  title: '连线属性',
  labelWidth: '170px',
  formField: generateFieldList(defineFormFieldConfig({
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
    }
  }))
}
export const gatewayParallelLineConfig = {
  type: 'gateway-parallel-line',
  title: '连线属性',
  labelWidth: '170px',
  formField: generateFieldList(defineFormFieldConfig({

  }))
}
