import { generateFieldList, defineFormFieldConfig } from 'd-render'
import { cloneDeep } from 'lodash-es'
import { intervalOptions, minuteOptions, monthOptions, weekOptions, recordOpts } from './constant'
// import { dataTypeTableColumns } from '../dialog/config'

// {
//   id: '',
//   type: 'start',
//   title: '开始',
//
//   validateFailed: Boolean,
//   children: [],
//   trigger: '', // emptyEvent|modelEntityEvent|timeStart
//   // 服务入参 trigger === emptyEvent 时显示
//   inputParams: {
//     type: 'object',
//     required: [],
//     properties: {
//       vatt: {
//         type: 'array',
//         title: 'vatt', // title与键相同 为手动输入的变量名
//         arrayType: 'number', // arrayType type: 'array'时 array的成员类型
//         items: {
//           type: 'number'
//         }
//       },
//       bbb: {
//         type: 'object',
//         title: 'bbb',
//         required: [],
//         properties: {
//           c: {
//             type: 'string'
//           },
//           b: {
//             type: 'string'
//           }
//         }
//       },
//       redt: {
//         type: 'object',
//         title: 'redt',
//         entity: { // 有这个意味着是模型变量
//           value: 'model.all_data_type',
//           label: '数据源model / all_data_type'
//         },
//         required: [
//           'sex' // 模型中的必填字段
//         ],
//         properties: {
//           deletedAt: {
//             type: 'string',
//             key: 'deletedAt', // 模型中的字段名
//             title: '删除时间' // 模型中的显示名称
//           },
//           name: {
//             type: 'string',
//             key: 'name',
//             title: 'name111'
//           },
//           sex: {
//             type: 'string',
//             key: 'sex',
//             title: 'sex'
//           }
//         }
//       }
//     }
//   },
//   // 服务变量 trigger === emptyEvent 时显示
//   variableParams: {}, // 结构与inputParams完全一致 为json schema
//   // trigger === model-entity-event时显示
//   modelEventTarget: '', // 实体
//   fields: [], // 实体带出来的
//   eventType: '',
//   // eventType === before-update|after-update时显示
//   updateFields: [], // 下来来源于fields 除主键外的其他字段 多选
//   filterMode: '', // 类型选择
//   filterFields: {}, // 过滤条件
//   outputParamName: '', // 输出参数

//   triggerMode: '', // interval|periodic
//   intervalSetting: {
//     interval: '3day', // 间隔设置
//     timesType: 'custom', // 触发次数
//     times: 100, // 触发次数 timesType === unlimited 不显示
//     startTime: '2023-06-29 17:10:46', // 开始时间
//     endTime: '2023-07-01 00:00:02' // 结束时间
//   },
//   periodicSetting: {
//     periodic: 'month', // 触发周期 minute|hour|day|week|month
//     timesType: 'unlimited',
//     times: 1,
//     periodicDay: [
//       1,
//       2,
//       3
//     ], // 重复日期 periodic===month 1-31 periodic===week 1-7 其余不显示
//     periodicTime: '01:00', // 重复时间 periodic===hour 00-59 periodic===day|week|month 显示时间选择器 格式 01:01
//     startTime: '2023-07-02 06:00:00', // 开始时间
//     endTime: '2023-07-30 06:00:00' // 结束时间
//   }
// }

export default {
  type: 'start',
  title: '开始',
  labelWidth: '90px',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    trigger: {
      label: '节点类型',
      type: 'select',
      defaultValue: 'emptyEvent',
      options: [
        { label: '开始', value: 'emptyEvent' },
        { label: '事件触发', value: 'modelEntityEvent' },
        { label: '定时开始', value: 'timeStart' }
      ]
    },
    // trigger === emptyEvent
    // inputParams: {
    //   hideIndex: true,
    //   dependOn: ['trigger'],
    //   changeConfig (config, { trigger }) {
    //     config.readable = trigger === 'emptyEvent'
    //     config.writable = trigger === 'emptyEvent'
    //     return config
    //   },
    //   type: 'table',
    //   label: '服务入参',
    //   options: dataTypeTableColumns
    // },
    // variableParams: {
    //   dependOn: ['trigger'],
    //   changeConfig (config, { trigger }) {
    //     config.readable = trigger === 'emptyEvent'
    //     config.writable = trigger === 'emptyEvent'
    //     return config
    //   },
    //   label: '服务变量'
    // },
    // trigger === modelEntityEvent
    modelEventTarget: {
      dependOn: ['trigger'],
      readable: false,
      changeConfig (config, { trigger }) {
        config.writable = trigger === 'modelEntityEvent'
        return config
      },
      type: 'dataSource',
      otherKey: 'fields',
      label: '请选择实体' // 默认选第一个
    },
    eventType: {
      dependOn: ['trigger'],
      readable: false,
      changeConfig (config, { trigger }) {
        config.writable = trigger === 'modelEntityEvent'
        return config
      },
      label: '事件类型',
      type: 'select',
      options: recordOpts
    },
    updateFields: {
      dependOn: ['trigger', 'eventType'],
      readable: false,
      changeConfig (config, { trigger, eventType }) {
        console.log(trigger, eventType, 'trigger, modelEventTarget')
        config.writable = trigger === 'modelEntityEvent' & (eventType === 'beforeUpdate' || eventType === 'afterUpdate')
        return config
      },
      label: '更新字段',
      type: 'select',
      options: []
    },
    filterMode: {
      dependOn: [
        'trigger',
        {
          key: 'modelEventTarget',
          effect: {
            changeConfig: true,
            changeValue () {
              return {
                value: 'normal'
              }
            }
          }
        }
      ],
      readable: false,
      changeConfig (config, { modelEventTarget, trigger }) {
        config.writable = trigger === 'modelEntityEvent' & !!modelEventTarget
        return config
      },
      label: '类型选择',
      required: true,
      type: 'radio',
      defaultValue: 'normal',
      options: [
        { label: '简单模式', value: 'normal' },
        { label: '复杂模式', value: 'advanced' }
      ]
    },
    filterFields: {
      type: 'filterCondition',
      dependOn: [
        {
          key: 'modelEventTarget',
          effect: {
            changeConfig: true,
            changeValue () {
              return {
                value: {}
              }
            }
          }
        },
        'fields',
        'trigger'
      ],
      readable: false,
      changeConfig (config, { modelEventTarget, fields, trigger }) {
        config.writable = trigger === 'modelEntityEvent' & !!modelEventTarget
        config.options = cloneDeep(fields || [])
        return config
      }
    },
    outputParamName: {
      readable: false,
      dependOn: ['trigger'],
      changeConfig (config, { trigger }) {
        config.writable = trigger === 'modelEntityEvent'
        return config
      },
      label: '输出参数'
    },
    // trigger === timeStart
    triggerMode: {
      readable: false,
      dependOn: ['trigger'],
      changeConfig (config, { trigger }) {
        config.writable = trigger === 'timeStart'
        return config
      },
      label: '触发模式',
      type: 'radio',
      defaultValue: 'interval',
      options: [
        { label: '间隔触发', value: 'interval' },
        { label: '周期触发', value: 'periodic' }
      ]
    },
    'intervalSetting.startTime': {
      readable: false,
      dependOn: ['trigger', 'triggerMode'],
      changeConfig (config, { trigger, triggerMode }) {
        config.writable = trigger === 'timeStart' & triggerMode === 'interval'
        return config
      },
      label: '开始时间',
      required: true,
      type: 'date'
    },
    'intervalSetting.endTime': {
      readable: false,
      dependOn: ['trigger', 'triggerMode'],
      changeConfig (config, { trigger, triggerMode }) {
        config.writable = trigger === 'timeStart' & triggerMode === 'interval'
        return config
      },
      label: '结束时间',
      required: true,
      type: 'date'
    },
    'intervalSetting.interval': {
      type: 'cascader',
      options: intervalOptions,
      optionProps: { emitPath: false },
      readable: false,
      dependOn: ['trigger', 'triggerMode'],
      changeConfig (config, { trigger, triggerMode }) {
        config.writable = trigger === 'timeStart' & triggerMode === 'interval'
        return config
      },
      label: '间隔设置'
    },
    'intervalSetting.timesType': {
      readable: false,
      dependOn: ['trigger', 'triggerMode'],
      changeConfig (config, { trigger, triggerMode }) {
        config.writable = trigger === 'timeStart' & triggerMode === 'interval'
        return config
      },
      label: '触发次数',
      type: 'select',
      defaultValue: 'custom',
      options: [
        { label: '自定义', value: 'custom' },
        { label: '无限制', value: 'unlimited' }
      ]
    },
    'intervalSetting.times': {
      readable: false,
      dependOn: ['trigger', 'triggerMode', 'intervalSetting.timesType'],
      changeConfig (config, { trigger, triggerMode, intervalSetting: { timesType } }) {
        config.writable = trigger === 'timeStart' & triggerMode === 'interval' & timesType === 'custom'
        return config
      },
      label: '触发次数',
      type: 'number'
    },

    'periodicSetting.periodic': {
      readable: false,
      dependOn: ['trigger', 'triggerMode'],
      changeConfig (config, { trigger, triggerMode }) {
        config.writable = trigger === 'timeStart' & triggerMode === 'periodic'
        return config
      },
      label: '触发周期',
      type: 'select',
      defaultValue: 'minute',
      options: [
        { label: '每分', value: 'minute' },
        { label: '每时', value: 'hour' },
        { label: '每天', value: 'day' },
        { label: '每周', value: 'week' },
        { label: '每月', value: 'month' }
      ]
    },
    // periodicSetting.periodic === week/month
    'periodicSetting.periodicDay': {
      label: '重复日期',
      readable: false,
      type: 'select',
      multiple: true,
      dependOn: [
        'trigger',
        'triggerMode', {
          key: 'periodicSetting.periodic',
          effect: {
            changeConfig: true,
            changeValue () {
              return {
                value: []
              }
            }
          }
        }
      ],
      changeConfig (config, { trigger, triggerMode, periodicSetting: { periodic } }) {
        config.writable = trigger === 'timeStart' & triggerMode === 'periodic' & (periodic === 'week' || periodic === 'month')
        return config
      },
      asyncOptions ({ periodicSetting: { periodic } = {} }) {
        if (periodic === 'week') { return weekOptions }
        if (periodic === 'month') { return monthOptions }
        return []
      }
    },
    //  periodicSetting.periodic === hour/day/week/month
    'periodicSetting.periodicTime': {
      readable: false,
      dependOn: [
        'trigger',
        'triggerMode', {
          key: 'periodicSetting.periodic',
          effect: {
            changeConfig: true,
            changeValue () {
              return {
                value: ''
              }
            }
          }
        }
      ],
      changeConfig (config, { trigger, triggerMode, periodicSetting: { periodic } }) {
        const needShow = ['hour', 'day', 'week', 'month']
        config.writable = trigger === 'timeStart' & triggerMode === 'periodic' & needShow.includes(periodic)
        if (periodic === 'hour') {
          config.type = 'select'
          config.options = minuteOptions
        }
        return config
      },
      label: '重复时间',
      type: 'time'
    },
    'periodicSetting.startTime': {
      readable: false,
      dependOn: ['trigger', 'triggerMode'],
      changeConfig (config, { trigger, triggerMode }) {
        config.writable = trigger === 'timeStart' & triggerMode === 'periodic'
        return config
      },
      label: '开始时间',
      type: 'date'
    },
    'periodicSetting.endTime': {
      readable: false,
      dependOn: ['trigger', 'triggerMode'],
      changeConfig (config, { trigger, triggerMode }) {
        config.writable = trigger === 'timeStart' & triggerMode === 'periodic'
        return config
      },
      label: '结束时间',
      type: 'date'
    },
    'periodicSetting.timesType': {
      readable: false,
      dependOn: ['trigger', 'triggerMode'],
      changeConfig (config, { trigger, triggerMode }) {
        config.writable = trigger === 'timeStart' & triggerMode === 'periodic'
        return config
      },
      label: '触发次数',
      type: 'select',
      defaultValue: 'custom',
      options: [
        { label: '自定义', value: 'custom' },
        { label: '无限制', value: 'unlimited' }
      ]
    },
    'periodicSetting.times': {
      readable: false,
      dependOn: ['trigger', 'triggerMode', 'periodicSetting.timesType'],
      changeConfig (config, { trigger, triggerMode, periodicSetting: { timesType } }) {
        config.writable = trigger === 'timeStart' & triggerMode === 'periodic' & timesType === 'custom'
        return config
      },
      label: '触发次数',
      type: 'number'
    }
  })),
  // 暂时不需要initData
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'start',
    title: '开始',

    children: []
  }
}
