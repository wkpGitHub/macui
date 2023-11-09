import { generateFieldList } from 'd-render'
import { addConfigPrefix, xField, yField, handelLabelSizeOptions } from '../utils'
import { centerService } from '@/api'
import req from '@cip/request'

const getOutParams = async (searchApi, type) => {
  let fields = []
  if (searchApi) {
    const { data } = await centerService.getContent(searchApi)
    const { outParams = [] } = data.flow || {}
    fields = outParams.filter(column => {
      if (type === 'value') {
        return yField(column)
      } else {
        return xField(column)
      }
    })
  }
  return fields
}

export default {
  searchApi: {
    type: 'select-api',
    label: '查询接口',
    dependOn: ['yAxis'],
    async onChange ({ row, updateApis, updateDataModel, updateMethod, dependOn }) {
      updateApis('page')
      updateMethod('page', null, true)
      updateDataModel('查询接口')
      const { data } = await req({
        method: 'get',
        apiName: 'apiChr',
        url: `/${row.fullPath}`,
        params: { offset: 0, limit: 10 }
      })
      dependOn.yAxis.data = data?.list || []
    }
  },
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
      xType: '',
      field: ''
    },
    dependOn: ['chartType', 'searchApi'],
    changeConfig: async (config, { chartType, searchApi }) => {
      if (['pie', 'sankey'].includes(chartType)) {
        config.readable = false
      }
      config.xFields = await getOutParams(searchApi)
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
    dependOn: ['chartType', 'searchApi'],
    changeConfig: async (config, { chartType, searchApi }) => {
      if (['pie', 'sankey'].includes(chartType)) {
        config.readable = false
      } else {
        config.chartTypeDisabled = chartType === 'scatter'
      }
      config.yFields = await getOutParams(searchApi, 'value')
      return config
    }
  },
  xField: {
    label: '键字段',
    dependOn: ['chartType', 'searchApi'],
    type: 'select',
    optionProps: { label: 'title', value: 'name' },
    asyncOptions: async ({ searchApi }) => {
      const option = await getOutParams(searchApi)
      return option
    },
    changeConfig: async (config, { chartType }) => {
      if (!['pie'].includes(chartType)) {
        config.readable = false
      }
      return config
    }
  },
  yField: {
    label: '值字段',
    type: 'yAxisField',
    dependOn: ['chartType', 'searchApi'],
    changeConfig: async (config, { chartType, searchApi }) => {
      if (!['pie'].includes(chartType)) {
        config.readable = false
      }
      config.yFields = await getOutParams(searchApi, 'value')
      return config
    }
  },
  xAxisField: {
    label: '源',
    dependOn: ['chartType', 'searchApi'],
    type: 'select',
    required: true,
    optionProps: { label: 'title', value: 'name' },
    asyncOptions: async ({ searchApi }) => {
      const option = await getOutParams(searchApi)
      return option
    },
    changeConfig: async (config, { chartType }) => {
      if (!['sankey'].includes(chartType)) {
        config.readable = false
      }
      return config
    }
  },
  yAxisColumns: {
    label: '目标',
    dependOn: ['chartType', 'searchApi'],
    type: 'select',
    required: true,
    optionProps: { label: 'title', value: 'name' },
    asyncOptions: async ({ searchApi }) => {
      const option = await getOutParams(searchApi)
      return option
    },
    changeConfig: async (config, { chartType }) => {
      if (!['sankey'].includes(chartType)) {
        config.readable = false
      }
      return config
    }
  },
  zAxisField: {
    label: '值',
    dependOn: ['chartType', 'searchApi'],
    type: 'select',
    optionProps: { label: 'title', value: 'name' },
    asyncOptions: async ({ searchApi }) => {
      const option = await getOutParams(searchApi, 'value')
      return option
    },
    changeConfig: async (config, { chartType }) => {
      if (!['sankey'].includes(chartType)) {
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
        title: '颜色',
        children: generateFieldList(addConfigPrefix(
          {
            colorScheme: {
              type: 'colorScheme',
              defaultValue: ['rgb(84, 112, 198)', 'rgb(145, 204, 117)', 'rgb(250, 200, 88)', 'rgb(238, 102, 102)', 'rgb(115, 192, 222)', 'rgb(59, 162, 114)', 'rgb(252, 132, 82)', 'rgb(154, 96, 180)', 'rgb(234, 124, 204)'],
              label: '配色方案',
              otherKey: 'config.yAxis',
              dependOn: ['config.chartType'],
              changeConfig: async (config, { config: chartConfig }) => {
                if (!['barline', 'scatter'].includes(chartConfig.chartType)) {
                  config.readable = false
                }
                return config
              }
            },
            gradation: {
              label: '渐变',
              type: 'singleCheckbox',
              option: {
                value: true,
                inactiveValue: false,
                label: ''
              },
              dependOn: ['config.chartType'],
              changeConfig: async (config, { config: chartConfig }) => {
                if (!['barline', 'scatter'].includes(chartConfig.chartType)) {
                  config.readable = false
                }
                return config
              }
            },
            opacity: {
              type: 'slider',
              label: '不透明度',
              showInput: true,
              dependOn: ['config.chartType'],
              changeConfig: async (config, { config: chartConfig }) => {
                if (!['barline', 'scatter'].includes(chartConfig.chartType)) {
                  config.readable = false
                }
                return config
              }
            }
          }
        ))
      },
      {
        title: '大小',
        children: generateFieldList(addConfigPrefix(
          {
            barGapSelfAdaption: {
              type: 'singleCheckbox',
              label: '自适应',
              defaultValue: true,
              option: {
                value: true,
                inactiveValue: false,
                label: '自适应'
              },
              dependOn: ['config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (chartConfig.chartType !== 'barline') {
                  config.readable = false
                }
                return config
              }
            },
            barGap: {
              type: 'slider',
              label: '柱间隔',
              min: 0,
              max: 50,
              showInput: true,
              dependOn: ['config.barGapSelfAdaption', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                config.disabled = chartConfig.barGapSelfAdaption
                if (chartConfig.chartType !== 'barline') {
                  config.readable = false
                }
                return config
              },
              changeValue: ({ config: chartConfig }) => {
                if (chartConfig) return { value: 0 }
              }
            },
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
              },
              dependOn: ['config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            labelSize: {
              type: 'select',
              label: '字体大小',
              defaultValue: 12,
              options: handelLabelSizeOptions(40),
              dependOn: ['config.isShowLabel', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            labelColor: {
              type: 'colorPicker',
              label: '字体颜色',
              defaultValue: '#333',
              dependOn: ['config.isShowLabel', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            labelPosition: {
              type: 'select',
              label: '标签位置',
              defaultValue: 'inside',
              options: [
                { label: '上', value: 'top' },
                { label: '中心', value: 'inside' },
                { label: '下', value: 'insideBottom' }
              ],
              dependOn: ['config.isShowLabel', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            }
          }
        ))
      },
      {
        title: '提示',
        children: generateFieldList(addConfigPrefix(
          {
            isShowTooltip: {
              type: 'singleCheckbox',
              label: '显示',
              defaultValue: true,
              option: {
                value: true,
                inactiveValue: false,
                label: '显示'
              },
              dependOn: ['config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            tooltipSize: {
              type: 'select',
              label: '字体大小',
              defaultValue: 14,
              options: handelLabelSizeOptions(20),
              dependOn: ['config.isShowTooltip', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowTooltip || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            tooltipColor: {
              type: 'colorPicker',
              label: '字体颜色',
              defaultValue: '#333',
              dependOn: ['config.isShowTooltip', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowTooltip || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            tooltipBg: {
              type: 'colorPicker',
              label: '背景',
              defaultValue: '#fff',
              dependOn: ['config.isShowTooltip', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowTooltip || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            }
          }
        ))
      },
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
