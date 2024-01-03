import { generateFieldList } from 'd-render'
import { addConfigPrefix, handelLabelSizeOptions, getOutParams } from '../../utils'
import { tooltipConfigNoContent, titleConfig } from './common-config'

export default {
  api: {
    type: 'select-api',
    label: '查询接口'
  },
  xAxisField: {
    label: '源',
    dependOn: ['api'],
    type: 'select',
    required: true,
    optionProps: { label: 'title', value: 'name' },
    asyncOptions: ({ api }) => {
      const option = getOutParams(api.outParams)
      return option
    }
  },
  yAxisColumns: {
    label: '目标',
    dependOn: ['api'],
    type: 'select',
    required: true,
    optionProps: { label: 'title', value: 'name' },
    asyncOptions: ({ api }) => {
      const option = getOutParams(api.outParams)
      return option
    }
  },
  zAxisField: {
    label: '值',
    dependOn: ['api'],
    type: 'select',
    optionProps: { label: 'title', value: 'name' },
    asyncOptions: ({ api }) => {
      const option = getOutParams(api.outParams, 'value')
      return option
    }
  },
  events: {
    hideItem: true,
    options: [{ label: '点击事件', value: 'click' }]
  }
}

export const cssConfigure = {
  __collapse1: {
    type: 'staticInfo',
    staticInfo: '图形属性',
    fontSize: 13,
    fontWeight: 'bold',
    inputStyle: {
      paddingLeft: '12px',
      height: '20px',
      lineHeight: '36px'
    }
  },
  __collapse2: {
    type: 'collapse',
    options: [
      {
        title: '标签',
        children: generateFieldList(addConfigPrefix(
          {
            isShowLabel: {
              type: 'singleCheckbox',
              label: '显示',
              defaultValue: true,
              option: {
                value: true,
                inactiveValue: false,
                label: '显示'
              }
            },
            labelSize: {
              type: 'select',
              label: '字体大小',
              defaultValue: 12,
              options: handelLabelSizeOptions(10, 40),
              dependOn: ['config.isShowLabel'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLabel) config.readable = false
                return config
              }
            },
            labelColor: {
              type: 'colorPicker',
              label: '字体颜色',
              defaultValue: '#333',
              dependOn: ['config.isShowLabel'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLabel) config.readable = false
                return config
              }
            }
          }
        ))
      },
      {
        title: '提示',
        children: generateFieldList(addConfigPrefix(
          tooltipConfigNoContent
        ))
      }
    ]
  },
  __collapse3: {
    type: 'staticInfo',
    staticInfo: '组件样式',
    fontSize: 13,
    fontWeight: 'bold',
    inputStyle: {
      paddingLeft: '12px',
      height: '20px',
      lineHeight: '36px'
    }
  },
  __collapse4: {
    type: 'collapse',
    options: [
      {
        title: '标题',
        children: generateFieldList(addConfigPrefix(
          titleConfig
        ))
      }
    ]
  }
}
