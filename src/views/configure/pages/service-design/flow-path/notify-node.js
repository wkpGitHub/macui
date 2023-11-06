import { generateFieldList, defineFormFieldConfig } from 'd-render'

export default {
  category: '人工节点',
  type: 'notify-node',
  title: '知会节点',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称' },
    objectKey: {
      type: 'dataSource',
      label: '选择对象',
      required: true,
      otherKey: 'fields'
    },
    taskTitle: { label: '任务标题' },
    formView: {
      label: '表单视图',
      type: 'select',
      dependOn: ['fields']
    },
    transactor: {
      label: '处理人',
      required: true
    },
    processStrategy: {
      label: '多人处理策略',
      type: 'radio',
      required: true,
      options: [
        { label: '串行填写一条记录、', value: 'serial' },
        { label: '并行填写多条记录', value: 'parallel' }
      ]
    },
    fieldAclGroup: {
      label: '字段操作权限',
      type: 'select',
      required: true,
      dependOn: ['fields'],
      changeConfig (config, { fields }) {
        config.disabled = !!fields
        return config
      }
    },
    actionGroup: {
      label: '流程操作权限',
      type: 'select',
      required: true
    },
    submitRule: {
      label: '提交规则',
      type: 'select',
      options: [
        { label: '提交', value: 'submit' },
        { label: '不提交', value: 'unsubmit' }
      ]
    },
    outputParamName: {
      label: '参数名称',
      dependOn: ['label']
    }
  })),
  initData: {
    id: '',
    type: 'notify-node',
    title: '知会节点'
  }
}
