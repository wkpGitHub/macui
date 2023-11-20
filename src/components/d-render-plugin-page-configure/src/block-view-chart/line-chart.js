import { generateFieldList } from 'd-render'
import { addConfigPrefix, handelLabelSizeOptions, getOutParams } from '../../utils'
import { tooltipConfig, titleConfig, legendConfig, xAxisConfig, yAxisConfig } from './common-config'

export default {
  searchApi: {
    type: 'select-api',
    label: '查询接口'
  },
  xAxis: {
    label: 'x轴(维度)',
    required: true,
    type: 'xAxis',
    defaultValue: {
      alias: '',
      xType: '',
      field: ''
    },
    dependOn: ['searchApi'],
    changeConfig: async (config, { searchApi }) => {
      config.xFields = await getOutParams(searchApi?.apiId)
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
    ]
  },
  yAxis: {
    label: 'y轴(度量)',
    required: true,
    type: 'yAxis',
    dependOn: ['searchApi'],
    changeConfig: async (config, { searchApi }) => {
      config.yFields = await getOutParams(searchApi?.apiId, 'value')
      return config
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
        title: '颜色',
        children: generateFieldList(addConfigPrefix(
          {
            colorScheme: {
              type: 'colorScheme',
              defaultValue: ['rgb(84, 112, 198)', 'rgb(145, 204, 117)', 'rgb(250, 200, 88)', 'rgb(238, 102, 102)', 'rgb(115, 192, 222)', 'rgb(59, 162, 114)', 'rgb(252, 132, 82)', 'rgb(154, 96, 180)', 'rgb(234, 124, 204)'],
              label: '配色方案',
              otherKey: ['config.yAxis'],
              chartType: 'bar'
            },
            opacity: {
              type: 'slider',
              label: '不透明度',
              showInput: true,
              defaultValue: 100
            }
          }
        ))
      },
      {
        title: '大小',
        children: generateFieldList(addConfigPrefix(
          {
            lineStyle: {
              type: 'slider',
              label: '线宽',
              min: 0,
              max: 10,
              showInput: true,
              defaultValue: 2
            },
            lineSymbol: {
              type: 'select',
              label: '折点',
              defaultValue: 'circle',
              options: [
                { label: '圆形', value: 'circle' },
                { label: '矩形', value: 'rect' },
                { label: '三角形', value: 'triangle' },
                { label: '菱形', value: 'diamond' }
              ]
            },
            lineSymbolSize: {
              type: 'slider',
              label: '折点大小',
              min: 0,
              max: 20,
              showInput: true,
              defaultValue: 8
            },
            lineSmooth: {
              type: 'singleCheckbox',
              label: '平滑折线',
              defaultValue: true,
              option: {
                value: true,
                inactiveValue: false,
                label: '平滑折线'
              }
            }
          }
        ))
      },
      {
        title: '标签',
        children: generateFieldList(addConfigPrefix(
          {
            isShowLabel: {
              type: 'singleCheckbox',
              label: '显示',
              defaultValue: false,
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
          tooltipConfig
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
        title: '横轴',
        children: generateFieldList(addConfigPrefix(
          xAxisConfig
        ))
      },
      {
        title: '纵轴',
        children: generateFieldList(addConfigPrefix(
          yAxisConfig
        ))
      },
      {
        title: '标题',
        children: generateFieldList(addConfigPrefix(
          titleConfig
        ))
      },
      {
        title: '图例',
        children: generateFieldList(addConfigPrefix(
          legendConfig
        ))
      },
      {
        title: '高级配置',
        children: generateFieldList(addConfigPrefix(
          {
            advancedConfig: {
              label: '',
              type: 'checkbox',
              options: [
                { label: '是否翻转', value: 'isReversed' },
                { label: 'x轴区域缩放', value: 'xDataZoom' },
                // { label: '是否多y轴', value: 'multiY' },
                { label: '标注最小最大', value: 'minMax' },
                { label: '标注平均值', value: 'average' }
              // { label: '堆叠显示', value: 'stack' }
              ]
            }
          })
        )
      },
      {
        title: '组件样式',
        children: generateFieldList(addConfigPrefix(
          {
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
      }
    ]
  }
}
