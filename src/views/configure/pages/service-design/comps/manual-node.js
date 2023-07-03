import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'
import { v4 as uuid } from 'uuid'
const showConfig = params => {
  return {
    dependOn: ['viewType'],
    readable: false,
    changeConfig (config, { viewType }) {
      if (viewType === params) {
        config.writable = true
      }
      return config
    }
  }
}
export default {
  category: '流程管理',
  type: 'manualnode',
  title: '人工节点',
  formField: generateFieldList(defineFormFieldConfig({
    taskTitle: { label: '任务标题' },
    viewType: {
      label: '渲染类型',
      type: 'radio',
      isButton: true,
      options: [
        { label: '标准表单', value: 'formView' },
        { label: '自定义页面', value: 'pageView' }
      ]
    },
    formView: {
      label: '表单视图',
      type: 'select',
      options: [
        { label: 'yjq', value: 'd35ABeDfNCmoCQ1r9asRrk' },
        { label: 'tt', value: 'wXsu8Vv3MFc951fzrmbuvr' }
      ],
      dependOn: ['processObject'],
      readable: false,
      changeConfig (config, { processObject }) {
        if (processObject) {
          config.writable = true
        }
        return config
      }
    },
    pageView: {
      label: '任务页面',
      type: 'cascader',
      optionProps: { label: 'name', value: 'id', emitPath: false },
      ...showConfig('pageView'),
      asyncOptions () {
        return [
          {
            name: '产品',
            id: 'bqwesadzxc',
            children: [
              {
                name: '新增产品',
                id: '123axzcads'
              }
            ]
          }
        ]
      }
    },
    dataMapping: {
      type: 'table',
      options: generateFieldList(defineTableFieldConfig({
        key: { required: true, writable: true, label: '页面变量：' },
        formula: { writable: true, label: '流程变量：' }
      })),
      label: '数据映射',
      dependOn: ['pageView'],
      readable: false,
      changeConfig (config, { pageView }) {
        if (pageView) {
          config.writable = true
        }
        return config
      }
    },
    processObject: {
      label: '处理对象',
      type: 'select',
      ...showConfig('formView'),
      options: [
        { label: '开始_fa97', value: '开始_fa97' }
      ]
    },
    nodeOperateType: { // 字段操作权限 未找到对应字段
      label: '字段操作权限',
      type: 'select',
      ...showConfig('formView'),
      options: [
        { label: '编辑', value: '编辑' },
        { label: '查看', value: '查看' }
      ]
    },
    processOperateType: { // 流程操作权限 未找到对应字段
      label: '流程操作权限',
      type: 'select',
      ...showConfig('formView'),
      options: [
        { label: '审批', value: '审批' }
      ]
    },
    transactor: { label: '处理人', type: 'transactorSelect' },
    processStrategy: {
      type: 'radio',
      label: '多人处理策略',
      options: [
        { label: '并行', value: 'parallel' },
        { label: '串行', value: 'serial' }
      ]
    },
    parallelApprove: {
      type: 'select',
      options: [
        {
          label: '全体通过',
          value: 'allOf'
        },
        {
          label: '一人通过即通过',
          value: 'oneOf'
        },
        {
          label: '按比例通过',
          value: 'someOf'
        },
        {
          label: '一人拒绝则拒绝',
          value: 'oneRefuse'
        }
      ]
    },
    processStrategies: {
      label: '合并处理策略',
      type: 'checkbox',
      options: [
        {
          label: '处理人与发起人相同时',
          value: 'sameAsInitiator'
        },
        {
          label: '处理人与上一处理人相同时',
          value: 'sameAsPrev'
        },
        {
          label: '处理人已经处理过',
          value: 'hasApprovedIt'
        }
      ]
    },
    'boundaryTimerEventActivity.ruleType': {
      label: '超期设置',
      type: 'select',
      options: [
        {
          label: '流程统一超期规则',
          value: 'inherit'
        },
        {
          label: '自定义节点超期规则',
          value: 'custom'
        },
        {
          label: '不设置超期规则',
          value: 'none'
        }
      ]
    },
    label: {
      label: '节点名称'
    },
    id: {
      label: '节点id',
      writable: false,
      readable: true,
      defaultValue: uuid()
    },
    rootId: {
      hideItem: true,
      writable: false,
      readable: true,
      defaultValue: uuid()
    },
    inputSource: { // label:'id' value:'id'
      hideItem: true
    },
    outputParamName: {
      hideItem: true,
      dependOn: ['label'],
      changeValue ({ label }) {
        return { value: label + '_371b' }
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'manualnode',
    title: '人工节点',
    conditions: {},
    children: []
  }
}
