import { generateFieldList, defineFormFieldConfig } from 'd-render'

// 存在疑惑 先不写

// 分支的children有些特殊
// expression: '分支'
// conditions
// conditionType： condition  formula
export const branchConfig = {
  category: '逻辑控制',
  type: 'branch',
  title: '分支',
  formField: [],
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'branch',
    title: '分支',

    children: []
  }
}

export const branchLineConfig = {
  type: 'branch-line',
  title: '连线属性',
  labelWidth: '70px',
  formField: generateFieldList(defineFormFieldConfig({
    expression: { label: '条件名称', defaultValue: '分支' },
    conditions: {
      label: '条件',
      type: 'setFx'
    }
  }))
}
