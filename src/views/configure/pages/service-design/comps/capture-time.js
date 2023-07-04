import { generateFieldList, defineFormFieldConfig } from 'd-render'

// {
//   "id": "4984157b0c46",
//   "rootId": "4984157b0c46",
//   "type": "capture-time",
//   "x": -48.5,
//   "y": 576.96875,
//   "label": "延时节点", // 节点名称
//   "delayType": "period", // 类型
//   "baseTime": "after", // 基准时间 （上节点完成后/after 、 自定义/custom）
//   "customBaseTime": "2023-07-06 06:06:06", // 基准时间-自定义
//   "delayTime": {  // 延期时间
//       "type": "day", // 天/day 、 时/hour 、 分/minute
//       "day": "1",
//       "hour": "1",
//       "minute": "10"
//   },
//   "specifiedDelayTime": "2023-07-08 00:02:02" // 指定日期
// }

export default {
  category: '自动节点',
  type: 'capture-time',
  label: '延时节点',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称' },
    delayType: {
      label: '类型',
      type: 'radio',
      options: [
        { label: '延期一段时间', value: 'period' },
        { label: '延期到指定时间', value: 'specified' }
      ]
    },
    baseTime: {
      label: '基准时间',
      type: 'radio',
      options: [
        { label: '上节点完成后', value: 'after' },
        { label: '自定义', value: 'custom' }
      ],
      dependOn: ['delayType'],
      changeConfig (config, { delayType }) {
        config.readable = delayType !== 'specified'
        return config
      }
    },
    customBaseTime: {
      label: '自定义基准时间',
      type: 'date',
      viewType: 'datetime',
      dependOn: ['baseTime', 'delayType'],
      changeConfig (config, { baseTime, delayType }) {
        if (delayType !== 'specified') {
          config.readable = baseTime === 'custom'
        } else {
          config.readable = false
        }
        return config
      }
    },
    delayTime: {
      label: '延期时间',
      dependOn: ['delayType'],
      changeConfig (config, { delayType }) {
        config.readable = delayType !== 'specified'
        return config
      }
    },
    specifiedDelayTime: {
      label: '指定日期',
      type: 'date',
      viewType: 'datetime',
      dependOn: ['delayType'],
      changeConfig (config, { delayType }) {
        config.readable = delayType === 'specified'
        return config
      }
    }
  })),
  initData: {
    id: '',
    type: 'capture-time',
    label: '延时节点'
  }
}
