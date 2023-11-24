import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'
export default {
  category: '流程管理',
  type: 'examine-and-approve-task',
  title: '审批人',
  labelWidth: '270px',
  formField: generateFieldList(defineFormFieldConfig({
    type: {
      type: 'radio',
      isButton: true,
      defaultValue: 'TRANSTACTOR',
      options: [
        { label: '审批人', value: 'TRANSTACTOR' },
        { label: '审批按钮', value: 'BTN_GROUP' },
        { label: '设置字段权限', value: 'FIELD_PERMISSION' },
        { label: '高级设置', value: 'ADANVANCED_SETTING' }
      ]
    },
    assignedType: {
      label: '⚙ 选择审批对象',
      type: 'radio',
      required: true,
      dependOn: ['type'],
      defaultValue: 'ASSIGN_USER',
      readable: false,
      options: [
        { label: '指定成员', value: 'ASSIGN_USER' },
        { label: '指定角色', value: 'ROLE' },
        { label: '部门主管', value: 'LEADER' },
        { label: '连续多级主管', value: 'LEADER_TOP' },
        { label: '发起人自己', value: 'SELF' },
        { label: '发起人自选', value: 'SELF_SELECT' },
        { label: '表单内联系人', value: 'FORM_USER' }
      ],
      changeConfig (config, { type }) {
        if (type === 'TRANSTACTOR') {
          config.writable = true
          return config
        }
      }
    },
    _staticInfo0: {
      type: 'staticInfo',
      staticInfo: '*发起人自己作为审批人进行办理',
      dependOn: ['assignedType', 'type'],
      readable: false,
      changeConfig (config, { type, assignedType }) {
        if (type === 'TRANSTACTOR' && assignedType === 'SELF') {
          config.writable = true
          return config
        }
      }
    },
    formUser: {
      label: '选择表单联系人项',
      type: 'select',
      dependOn: ['assignedType', 'type'],
      readable: false,
      changeConfig (config, { type, assignedType }) {
        if (type === 'TRANSTACTOR' && assignedType === 'FORM_USER') {
          config.writable = true
          return config
        }
      }
    },
    leaderTop: {
      label: '审批终点',
      type: 'radio',
      options: [
        { label: '直到最上层主管', value: 'TOP' },
        { label: '不超过发起人的', value: 'LEAVE' }
      ],
      defaultValue: 'TOP',
      readable: false,
      dependOn: ['assignedType', 'type'],
      changeConfig: (config, { type, assignedType }) => {
        if (type === 'TRANSTACTOR' && assignedType === 'LEADER_TOP') config.writable = true
        return config
      }
    },
    leaderLevel: {
      label: '指定主管级别',
      dependOn: ['assignedType', 'type'],
      type: 'number',
      readable: false,
      defaultValue: 1,
      changeConfig: (config, { type, assignedType }) => {
        if (type === 'TRANSTACTOR' && assignedType === 'LEADER') config.writable = true
        return config
      }
    },
    departmentFilter: {
      label: '部门过滤',
      dependOn: ['assignedType', 'type'],
      type: 'radio',
      readable: false,
      defaultValue: 'ALL',
      options: [
        { label: '所有部门', value: 'ALL' },
        { label: '跳过无主管的部门', value: 'SKIP' },
        { label: '找不到主管时，由上级主管代审批', value: 'SUPERIOR' }
      ],
      changeConfig: (config, { type, assignedType }) => {
        if (type === 'TRANSTACTOR' && assignedType === 'LEADER') config.writable = true
        return config
      }
    },
    choosePeople: {
      type: 'roleSelect',
      text: '选择人员',
      readable: false,
      dependOn: ['assignedType', 'type'],
      changeConfig: (config, { type, assignedType }) => {
        if (type === 'TRANSTACTOR' && assignedType === 'ASSIGN_USER') config.writable = true
        return config
      }
    },

    role: {
      type: 'roleSelect',
      text: '选择系统角色',
      readable: false,
      dependOn: ['assignedType', 'type'],
      changeConfig: (config, { type, assignedType }) => {
        if (type === 'TRANSTACTOR' && assignedType === 'ROLE') config.writable = true
        return config
      }
    },
    chooseArea: {
      label: '选择范围',
      dependOn: ['assignedType', 'type'],
      readable: false,
      type: 'radio',
      defaultValue: 'ALL',
      options: [
        { label: '全公司', value: 'ALL' },
        { label: '指定成员', value: 'MEMBER' },
        { label: '指定角色', value: 'ROLE' }
      ],
      changeConfig: (config, { type, assignedType }) => {
        if (type === 'TRANSTACTOR' && assignedType === 'SELF_SELECT') config.writable = true
        return config
      }
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
      label: '👩‍👦‍👦 多人审批时审批方式',
      type: 'radio',
      readable: false,
      dependOn: ['multiple', 'assignedType'],
      defaultValue: 'AND',
      options: [
        { label: '依次审批 （按选择顺序审批，每个人必须同意）', value: 'NEXT' },
        { label: '会签（可同时审批，每个人必须同意）', value: 'AND' },
        { label: '或签（有一人同意即可）', value: 'OR' }
      ],
      changeConfig (config, { multiple, assignedType }) {
        if (multiple || assignedType === 'ROLE' || assignedType === 'LEADER' || assignedType === 'SELF_SELECT') {
          config.writable = true
          return config
        }
      }
    },
    sign: {
      label: '✍ 审批同意时是否需要签字',
      type: 'switch',
      activeText: '需要',
      inactiveText: '不用',
      readable: false,
      dependOn: ['type'],
      changeConfig (config, { type }) {
        if (type === 'TRANSTACTOR1') {
          config.writable = true
          return config
        }
      }
    },
    timeLimit: {
      label: '⏱ 审批期限（为 0 则不生效）',
      type: 'timeLimit',
      readable: false,
      dependOn: ['type'],
      changeConfig (config, { type }) {
        if (type === 'TRANSTACTOR1') {
          config.writable = true
          return config
        }
      }
    },
    rejectResult: {
      label: '🙅‍ 如果审批被驳回 👇',
      type: 'radio',
      defaultValue: 'TO_END',
      options: [
        { label: '直接结束流程', value: 'TO_END' },
        { label: '驳回到上级审批节点', value: 'TO_BEFORE' },
        { label: '驳回到指定节点', value: 'TO_NODE' }
      ],
      readable: false,
      dependOn: ['type'],
      changeConfig (config, { type }) {
        if (type === 'TRANSTACTOR1') {
          config.writable = true
          return config
        }
      }
    },
    operateBtn: {
      readable: false,
      dependOn: ['type'],
      type: 'table',
      label: '操作按钮',
      hideIndex: true,
      hideAdd: true,
      hideDelete: true,
      options: generateFieldList(defineTableFieldConfig({
        btn: { label: '操作', writable: false },
        enable: {
          label: '启用',
          type: 'switch',
          activeValue: 1,
          inactiveValue: 0,
          writable: true
        }
      })),
      changeConfig: (config, { type }) => {
        if (type === 'BTN_GROUP') {
          config.writable = true
          return config
        }
      },
      defaultValue: [
        { btn: '同意', enable: 0 },
        { btn: '拒绝', enable: 0 },
        { btn: '保存', enable: 0 },
        { btn: '转交', enable: 0 },
        { btn: '退回', enable: 0 }
      ]
    },
    automaticApproval: {
      type: 'radio',
      dependOn: ['type'],
      readable: false,
      changeConfig (config, { type }) {
        if (type === 'ADANVANCED_SETTING') {
          config.writable = true
          return config
        }
      },
      options: [
        { label: '发起人自动审批(当前节点人员为发起人时，自动审批)', value: 'Promoter' },
        { label: '相邻节点自动审批(当前节点人员为上一节点人员时，自动审批)', value: 'AdjacentNodes' }
      ]
    },
    nobody: {
      label: '👤 审批人为空时',
      type: 'radio',
      required: true,
      readable: false,
      dependOn: ['type'],
      changeConfig (config, { type }) {
        if (type === 'ADANVANCED_SETTING') {
          config.writable = true
          return config
        }
      },
      defaultValue: 'TO_PASS',
      options: [
        { label: '自动通过', value: 'TO_PASS' },
        { label: '自动驳回', value: 'TO_REFUSE' },
        { label: '转交审批管理员', value: 'TO_ADMIN' },
        { label: '转交到指定人员', value: 'TO_USER' }
      ]
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'examine-and-approve-task',
    title: '审批人',
    conditions: {},
    children: []
  }
}
