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
  title: '办理人',
  labelWidth: '270px',
  formField: generateFieldList(defineFormFieldConfig({
    assignedType: {
      label: '⚙ 选择办理对象',
      type: 'radio',
      required: true,
      defaultValue: 'ASSIGN_USER',
      options: [
        { label: '指定人员', value: 'ASSIGN_USER' },
        { label: '发起人自选', value: 'SELF_SELECT' },
        { label: '连续多级主管', value: 'LEADER_TOP' },
        { label: '主管', value: 'LEADER' },
        { label: '角色', value: 'ROLE' },
        { label: '发起人自己', value: 'SELF' },
        { label: '表单内联系人', value: 'FORM_USER' }
      ]
    },
    _staticInfo0: {
      type: 'staticInfo',
      staticInfo: '发起人自己作为办理人进行办理',
      dependOn: ['assignedType'],
      readable: false,
      changeConfig (config, { assignedType }) {
        if (assignedType === 'SELF') {
          config.writable = true
          return config
        }
      }
    },
    formUser: {
      label: '选择表单联系人项',
      type: 'select',
      dependOn: ['assignedType'],
      readable: false,
      changeConfig (config, { assignedType }) {
        if (assignedType === 'FORM_USER') {
          config.writable = true
          return config
        }
      }
    },
    leaderTop: {
      label: '办理终点',
      type: 'radio',
      options: [
        { label: '直到最上层主管', value: 'TOP' },
        { label: '不超过发起人的', value: 'LEAVE' }
      ],
      defaultValue: 'TOP',
      readable: false,
      dependOn: ['assignedType'],
      changeConfig: (config, { assignedType }) => {
        if (assignedType === 'LEADER_TOP') config.writable = true
        return config
      }
    },
    leaderLevel: {
      label: '指定主管级别',
      dependOn: ['assignedType'],
      type: 'number',
      readable: false,
      defaultValue: 1,
      changeConfig: (config, { assignedType }) => {
        if (assignedType === 'LEADER') config.writable = true
        return config
      }
    },
    choosePeople: {
      type: 'roleSelect',
      text: '选择人员',
      readable: false,
      dependOn: ['assignedType'],
      changeConfig: (config, { assignedType }) => {
        if (assignedType === 'ASSIGN_USER') config.writable = true
        return config
      }
    },

    role: {
      type: 'roleSelect',
      text: '选择系统角色',
      readable: false,
      dependOn: ['assignedType'],
      changeConfig: (config, { assignedType }) => {
        if (assignedType === 'ROLE') config.writable = true
        return config
      }
    },
    multiple: {
      label: '',
      dependOn: ['assignedType'],
      readable: false,
      type: 'radio',
      isButton: true,
      defaultValue: false,
      options: [
        { label: '自选一个人', value: false },
        { label: '自选多个人', value: true }
      ],
      changeConfig: (config, { assignedType }) => {
        if (assignedType === 'SELF_SELECT') config.writable = true
        return config
      }
    },
    _staticInfo2: {
      type: 'staticInfo',
      staticInfo: '',
      ...staticInfoStyle
    },
    nobody: {
      label: '👤 办理人为空时',
      type: 'radio',
      required: true,
      defaultValue: 'TO_PASS',
      options: [
        { label: '自动通过', value: 'TO_PASS' },
        { label: '自动驳回', value: 'TO_REFUSE' },
        { label: '转交办理管理员', value: 'TO_ADMIN' },
        { label: '转交到指定人员', value: 'TO_USER' }
      ]
    },
    assignedUser: {
      type: 'roleSelect',
      text: '选择人员',
      readable: false,
      dependOn: ['nobody'],
      changeConfig: (config, { nobody }) => {
        if (nobody === 'TO_USER') config.writable = true
        return config
      }
    },
    mode: {
      label: '👩‍👦‍👦 多人办理时办理方式',
      type: 'radio',
      readable: false,
      dependOn: ['multiple', 'assignedType'],
      defaultValue: 'AND',
      options: [
        { label: '会签 （按选择顺序办理，每个人必须同意）', value: 'NEXT' },
        { label: '会签（可同时办理，每个人必须同意）', value: 'AND' },
        { label: '或签（有一人同意即可）', value: 'OR' }
      ],
      changeConfig (config, { multiple, assignedType }) {
        if (multiple || assignedType === 'ROLE' || assignedType === 'FORM_USER') {
          config.writable = true
          return config
        }
      }
    },

    _staticInfo3: {
      type: 'staticInfo',
      staticInfo: '高级设置',
      ...staticInfoStyle
    },
    sign: {
      label: '✍ 办理同意时是否需要签字',
      type: 'switch',
      activeText: '需要',
      inactiveText: '不用'
    },
    timeLimit: {
      label: '⏱ 办理期限（为 0 则不生效）',
      type: 'timeLimit'
    },
    rejectResult: {
      label: '🙅‍ 如果办理被驳回 👇',
      type: 'radio',
      defaultValue: 'TO_END',
      options: [
        { label: '直接结束流程', value: 'TO_END' },
        { label: '驳回到上级办理节点', value: 'TO_BEFORE' },
        { label: '驳回到指定节点', value: 'TO_NODE' }
      ]
    }
  })),
  initData: {
    id: '',
    type: 'write',
    title: '填写节点'
  }
}
