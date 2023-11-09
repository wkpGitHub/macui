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
  type: 'notify-node',
  title: '知会节点',
  labelWidth: '120px',
  formField: generateFieldList(defineFormFieldConfig({
    _staticInfo1: {
      type: 'staticInfo',
      staticInfo: '节点信息',
      ...staticInfoStyle
    },
    label: { label: '节点名称', defaultValue: '知会节点' },
    transactor: {
      label: '知会人',
      required: true
    },
    _staticInfo2: {
      type: 'staticInfo',
      staticInfo: '消息配置',
      ...staticInfoStyle
    },
    sendType: {
      label: '消息通知渠道',
      type: 'checkbox',
      options: [{ label: '消息', value: 'message' }],
      required: true
    },
    taskTitle: {
      label: '标题',
      type: 'setFx',
      required: true
    },
    message: {
      label: '消息模板',
      dependOn: ['fields'],
      type: 'setFx',
      required: true
    },
    _staticInfo3: {
      type: 'staticInfo',
      staticInfo: '待办任务',
      ...staticInfoStyle
    },
    withTask: {
      label: '待办任务',
      type: 'switch',
      activeValue: true,
      inactiveValue: false
    },
    processObject: {
      label: '处理对象',
      type: 'select',
      options: [
        {
          label: '开始',
          value: '开始'
        }
      ]
    },
    formViewBody: {
      label: '表单视图',
      dependOn: ['processObject'],
      readable: false,
      changeConfig (config, { processObject }) {
        if (processObject) {
          config.writable = true
          return config
        }
      }
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
    }
  })),
  initData: {
    id: '',
    type: 'notify-node',
    title: '知会节点'
  }
}
