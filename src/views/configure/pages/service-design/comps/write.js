import { generateFieldList, defineFormFieldConfig } from 'd-render'

const staticInfoStyle = {
  fontWeight: 'bold',
  fontSize: 16,
  inputStyle: {
    borderBottom: '1px solid #ccc',
    padding: '0 0 10px 0'
  }
}

export default {
  category: '人工节点',
  type: 'write',
  title: '填写节点',
  labelWidth: '120px',
  formField: generateFieldList(defineFormFieldConfig({
    _staticInfo1: {
      type: 'staticInfo',
      staticInfo: '节点信息',
      ...staticInfoStyle
    },
    label: { label: '节点名称', defaultValue: '填写节点' },
    taskTitle: { label: '任务标题', type: 'setFx' },
    objectKey: {
      type: 'dataSource',
      label: '选择对象',
      required: true,
      otherKey: 'fields'
    },
    formView: {
      label: '表单视图',
      type: 'select',
      dependOn: ['fields']
    },
    _staticInfo2: {
      type: 'staticInfo',
      staticInfo: '处理人',
      ...staticInfoStyle
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
    _staticInfo3: {
      type: 'staticInfo',
      staticInfo: '权限设置',
      ...staticInfoStyle
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
    _staticInfo4: {
      type: 'staticInfo',
      staticInfo: '提交规则',
      ...staticInfoStyle
    },
    submitRule: {
      label: '提交规则',
      type: 'select',
      options: [
        { label: '提交', value: 'submit' },
        { label: '不提交', value: 'unsubmit' }
      ]
    },
    _staticInfo5: {
      type: 'staticInfo',
      staticInfo: '输出参数',
      ...staticInfoStyle
    },
    outputParamName: {
      label: '参数名称',
      dependOn: ['label']
    }
  })),
  initData: {
    id: '',
    type: 'write',
    title: '填写节点'
  }
}
