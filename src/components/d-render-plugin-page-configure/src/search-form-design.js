import { getItemConfig } from '../utils'

export default {
  label: { },
  api: {
    label: '接口',
    type: 'select-api',
    hideInputParams: true,
    hideInitSearch: true,
    dependOn: ['options'],
    onChange ({ api, dependOn }) {
      const form = dependOn.options?.find(o => o.key === 'default')
      form.children = (api.inputParams || []).map(opt => getItemConfig(opt))
    }
  },
  grid: {
    label: '栅格数',
    defaultValue: 6,
    type: 'number'
  },
  hideSearch: {
    label: '是否隐藏操作按钮',
    type: 'switch'
  },
  searchButtonText: {
    label: '查询按钮文本',
    defaultValue: '查询'
  },
  labelPosition: {
    type: 'select',
    defaultValue: 'right',
    options: [
      {
        label: '上对齐',
        value: 'top'
      },
      {
        label: '左对齐',
        value: 'left'
      },
      {
        label: '右对齐',
        value: 'right'
      }
    ]
  },
  events: {
    hideItem: true,
    options: [{ label: '查询', value: 'search' }, { label: '重置', value: 'reset' }]
  }
}
