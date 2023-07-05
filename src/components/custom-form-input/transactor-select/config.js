import { generateFieldList, defineTableFieldConfig, defineFormFieldConfig } from 'd-render'

const options = [
  {
    label: '当前部门',
    value: '当前部门'
  },
  {
    label: '上1级',
    value: '上1级'
  },
  {
    label: '上2级',
    value: '上2级'
  },
  {
    label: '上3级',
    value: '上3级'
  },
  {
    label: '上4级',
    value: '上4级'
  },
  {
    label: '下1级',
    value: '下1级'
  },
  {
    label: '下2级',
    value: '下2级'
  },
  {
    label: '下3级',
    value: '下3级'
  },
  {
    label: '下4级',
    value: '下4级'
  }
]
const showConfig = basePost => {
  return {
    dependOn: ['params.reportType'],
    readable: false,
    changeConfig (config, obj) {
      const type = obj.params.reportType
      if (type === basePost) {
        config.writable = true
      }
      return config
    }
  }
}
export const tableColumns = generateFieldList(defineTableFieldConfig({
  label: {}
}))
export const formFieldList = generateFieldList(defineFormFieldConfig({
  label: {
    hideItem: true,
    dependOn: ['depLabel', 'postLabel'],
    changeValue ({ depLabel, postLabel }) {
      return { value: depLabel + postLabel }
    }
  },
  scopeLabel: {
    hideItem: true,
    defaultValue: '岗位上下级'
  },
  'params.user': {
    label: '人员变量'
  },
  'params.reportType': {
    label: '汇报类型',
    type: 'radio',
    defaultValue: 'basePost',
    options: [
      { label: '基于部门层级', value: 'basePost' },
      { label: '基于人员汇报', value: 'baseUserId' }
    ]
  },
  'params.depValue': {
    defaultValue: '1thManageOf',
    hideItem: true
  },
  'params.post': {
    hideItem: true,
    defaultValue: 'manager'
  },
  'params.depLabel': {
    label: '部门层级',
    ...showConfig('basePost'),
    type: 'select',
    options
  },
  'params.postLabel': {
    label: '岗位',
    type: 'select',
    ...showConfig('basePost'),
    options: [
      {
        label: '部门管理员',
        value: '部门管理员'
      },
      {
        label: '部门主管',
        value: '部门主管'
      },
      {
        label: '部门员工',
        value: '部门员工'
      }
    ]
  },
  'params.userLabel': {
    label: '部门层级',
    type: 'select',
    options,
    ...showConfig('baseUserId')
  },
  'params.userPost': {
    defaultValue: 'manager',
    hideItem: true
  },
  'params.userValue': {
    defaultValue: '2thManageOf',
    hideItem: true
  },
  userType: {
    defaultValue: 2,
    hideItem: true
  }
}))
