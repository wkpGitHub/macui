
import { generateFieldList } from 'd-render'
import { addConfigPrefix } from '../utils'

export default {
  defaultValue: { },
  chartType: {
    label: '显示方式',
    type: 'radio',
    defaultValue: 'barline',
    options: [
      { label: '柱状图/折线图', value: 'barline' },
      { label: '散点图', value: 'scatter' },
      { label: '饼图', value: 'pie' },
      { label: '桑基图', value: 'sankey' }
      // { label: '地图', value: 'map' },
      // { label: 'echarts自定义', value: 'echarts' }
    ]
  },
  xAxis: {
    label: 'x轴(维度)',
    required: true,
    type: 'xAxis',
    defaultValue: {
      alias: '',
      xType: ''
    },
    dependOn: ['chartType'],
    changeConfig: (config, { chartType }) => {
      if (['pie', 'sankey'].includes(chartType)) {
        config.readable = false
      }
      return config
    }
  },
  yType: {
    label: 'y轴类型',
    required: true,
    placeholder: '请选择y轴类型',
    type: 'select',
    options: [
      {
        label: '数值轴',
        value: 'value'
      },
      {
        label: '类目轴',
        value: 'category'
      },
      {
        label: '时间轴',
        value: 'time'
      },
      {
        label: '对数轴',
        value: 'log'
      }
    ],
    dependOn: ['chartType'],
    changeConfig: (config, { chartType }) => {
      if (['pie', 'sankey'].includes(chartType)) {
        config.readable = false
      }
      return config
    }
  },
  yAxis: {
    label: 'y轴(度量)',
    required: true,
    type: 'yAxis',
    dependOn: ['chartType'],
    changeConfig: (config, { chartType }) => {
      if (['pie', 'sankey'].includes(chartType)) {
        config.readable = false
      } else {
        config.chartTypeDisabled = chartType === 'scatter'
      }
      return config
    }
  },
  xField: {
    label: '键字段',
    type: 'select',
    options: [],
    dependOn: ['chartType'],
    changeConfig: (config, { chartType }) => {
      if (!['pie'].includes(chartType)) {
        config.readable = false
      }
      return config
    }
  },
  yField: {
    label: '值字段',
    type: 'yAxisField',
    dependOn: ['chartType'],
    changeConfig: (config, { chartType }) => {
      if (!['pie'].includes(chartType)) {
        config.readable = false
      }
      return config
    }
  }
}

export const cssConfigure = {
  __collapse: {
    type: 'collapse',
    options: [
      {
        title: '组件样式',
        children: generateFieldList(addConfigPrefix(
          {
            text: { type: 'input', label: '标题' },
            subtext: { type: 'input', label: '子标题' },
            titleLeft: {
              type: 'select',
              label: '标题显示位置',
              defaultValue: 'auto',
              options: [
                { label: '自动', value: 'auto' },
                { label: '居左', value: 'left' },
                { label: '居中', value: 'center' },
                { label: '居右', value: 'right' }
              ]
            },
            grid: {
              type: 'chartMargin',
              label: '边距',
              defaultValue: {
                top: '',
                right: '',
                left: '',
                bottom: ''
              }
            }
          })
        )
      },
      {
        title: '大小',
        children: generateFieldList(addConfigPrefix(
          {
            radius: {
              label: '半径',
              type: 'slider',
              min: 0,
              max: 100,
              range: true,
              dependOn: ['config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (chartConfig.chartType !== 'pie') {
                  config.readable = false
                }
                return config
              }
            // formatTooltip: (val) => {
            //   return val + '%'
            // }
            }
          })
        )
      }
    ]
  }
}

export const advancedConfigure = {
  __collapse: {
    type: 'collapse',
    options: [
      {
        title: '功能设置',
        children: generateFieldList(addConfigPrefix(
          {
            advancedConfig: {
              label: '高级配置',
              type: 'checkbox',
              options: [
                { label: '是否翻转', value: 'isReversed' },
                { label: 'x轴区域缩放', value: 'xDataZoom' },
                // { label: '是否多y轴', value: 'multiY' },
                { label: '标注最小最大', value: 'minMax' },
                { label: '标注平均值', value: 'average' }
              // { label: '堆叠显示', value: 'stack' }
              ],
              dependOn: ['config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (['pie', 'sankey'].includes(chartConfig.chartType)) {
                  config.readable = false
                }
                return config
              }
            }
          })
        )
      }
    ]
  }
}
