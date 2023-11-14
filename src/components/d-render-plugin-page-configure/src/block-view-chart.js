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
    async onChange ({ row, updateApis, dependOn }) {
      updateApis('chart')
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
              otherKey: ['config.yAxis', 'config.chartType', 'config.xField'],
              dependOn: ['config.chartType'],
              changeConfig: async (config, { config: chartConfig }) => {
                if (!['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) {
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
              defaultValue: 100,
              dependOn: ['config.chartType'],
              changeConfig: async (config, { config: chartConfig }) => {
                if (!['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) {
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
                if (!['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            labelFormat: {
              type: 'checkbox',
              label: '标签展示',
              defaultValue: 'dimension',
              options: [
                { label: '维度', value: 'dimension' },
                { label: '指标', value: 'index' },
                { label: '占比', value: 'percent' }
              ],
              dependOn: ['config.isShowLabel', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLabel || !['pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            labelSize: {
              type: 'select',
              label: '字体大小',
              defaultValue: 12,
              options: handelLabelSizeOptions(10, 40),
              dependOn: ['config.isShowLabel', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLabel || !['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            labelColor: {
              type: 'colorPicker',
              label: '字体颜色',
              defaultValue: '#333',
              dependOn: ['config.isShowLabel', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLabel || !['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
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
            },
            pieLabelPosition: {
              type: 'select',
              label: '标签位置',
              defaultValue: 'outside',
              options: [
                { label: '内', value: 'inside' },
                { label: '外', value: 'outside' },
                { label: '中心', value: 'center' }
              ],
              dependOn: ['config.isShowLabel', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLabel || !['pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            keepDecimal: {
              type: 'radio',
              label: '保留小数',
              defaultValue: 'two',
              options: [
                { label: '取整', value: 'zero' },
                { label: '一位', value: 'one' },
                { label: '两位', value: 'two' }
              ],
              dependOn: ['config.labelFormat', 'config.isShowLabel', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.labelFormat?.includes('percent') || !chartConfig.isShowLabel || !['pie'].includes(chartConfig.chartType)) config.readable = false
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
                if (!['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            tooltipSize: {
              type: 'select',
              label: '字体大小',
              defaultValue: 14,
              options: handelLabelSizeOptions(10, 20),
              dependOn: ['config.isShowTooltip', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowTooltip || !['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            tooltipColor: {
              type: 'colorPicker',
              label: '字体颜色',
              defaultValue: '#333',
              dependOn: ['config.isShowTooltip', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowTooltip || !['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            tooltipBg: {
              type: 'colorPicker',
              label: '背景',
              defaultValue: '#fff',
              dependOn: ['config.isShowTooltip', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowTooltip || !['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            }
          }
        ))
      },
      {
        title: '横轴',
        children: generateFieldList(addConfigPrefix(
          {
            isShowXAxis: {
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
            xAxisPosition: {
              type: 'radio',
              label: '位置',
              isButton: true,
              defaultValue: 'bottom',
              options: [{ label: '上', value: 'top' }, { label: '下', value: 'bottom' }],
              dependOn: ['config.isShowXAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowXAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            // xAxisName: {
            //   label: '名称'
            // },
            xAxisNameColor: {
              type: 'colorPicker',
              label: '名称颜色',
              defaultValue: '#333',
              dependOn: ['config.isShowXAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowXAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            xAxisNameSize: {
              type: 'select',
              label: '名称字体',
              defaultValue: 12,
              options: handelLabelSizeOptions(10, 40),
              dependOn: ['config.isShowXAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowXAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            isShowAxisTick: {
              type: 'singleCheckbox',
              label: '轴线显示',
              defaultValue: true,
              option: {
                value: true,
                inactiveValue: false,
                label: '轴线显示'
              },
              dependOn: ['config.isShowXAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowXAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            isShowSplitLine: {
              type: 'singleCheckbox',
              label: '网格线显示',
              defaultValue: false,
              option: {
                value: true,
                inactiveValue: false,
                label: '网格线显示'
              },
              dependOn: ['config.isShowXAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowXAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            isShowAxisLabel: {
              type: 'singleCheckbox',
              label: '标签显示',
              defaultValue: true,
              option: {
                value: true,
                inactiveValue: false,
                label: '标签显示'
              },
              dependOn: ['config.isShowXAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowXAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            axisLabelColor: {
              type: 'colorPicker',
              label: '标签颜色',
              defaultValue: '#333',
              dependOn: ['config.isShowAxisLabel', 'config.chartType', 'config.isShowXAxis'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowXAxis || !chartConfig.isShowAxisLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            axisLabelRotate: {
              type: 'slider',
              label: '标签角度',
              min: -90,
              max: 90,
              showInput: true,
              defaultValue: 0,
              dependOn: ['config.isShowAxisLabel', 'config.chartType', 'config.isShowXAxis'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowXAxis || !chartConfig.isShowAxisLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            axisLabelSize: {
              type: 'select',
              label: '标签大小',
              defaultValue: 12,
              options: handelLabelSizeOptions(6, 40),
              dependOn: ['config.isShowAxisLabel', 'config.chartType', 'config.isShowXAxis'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowXAxis || !chartConfig.isShowAxisLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            }
          }
        ))
      },
      {
        title: '纵轴',
        children: generateFieldList(addConfigPrefix(
          {
            isShowYAxis: {
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
            yAxisPosition: {
              type: 'radio',
              label: '位置',
              isButton: true,
              defaultValue: 'left',
              options: [{ label: '左', value: 'left' }, { label: '右', value: 'right' }],
              dependOn: ['config.isShowYAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            // yAxisName: {
            //   label: '名称'
            // },
            yAxisNameColor: {
              type: 'colorPicker',
              label: '名称颜色',
              defaultValue: '#333',
              dependOn: ['config.isShowYAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisNameSize: {
              type: 'select',
              label: '名称字体',
              defaultValue: 12,
              options: handelLabelSizeOptions(10, 40),
              dependOn: ['config.isShowYAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisValue: {
              type: 'singleCheckbox',
              label: '轴值',
              defaultValue: true,
              option: {
                value: true,
                inactiveValue: false,
                label: '自动'
              },
              dependOn: ['config.isShowYAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisMinValue: {
              type: 'number',
              label: '最小值',
              dependOn: ['config.yAxisValue', 'config.isShowYAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (chartConfig.yAxisValue || !chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisMaxValue: {
              type: 'number',
              label: '最大值',
              dependOn: ['config.yAxisValue', 'config.isShowYAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (chartConfig.yAxisValue || !chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisSplitNumber: {
              type: 'number',
              label: '刻度数',
              dependOn: ['config.yAxisValue', 'config.isShowYAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (chartConfig.yAxisValue || !chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            isShowYAxisTick: {
              type: 'singleCheckbox',
              label: '轴线显示',
              defaultValue: false,
              option: {
                value: true,
                inactiveValue: false,
                label: '轴线显示'
              },
              dependOn: ['config.isShowYAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            isShowYSplitLine: {
              type: 'singleCheckbox',
              label: '网格线显示',
              defaultValue: true,
              option: {
                value: true,
                inactiveValue: false,
                label: '网格线显示'
              },
              dependOn: ['config.isShowYAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            ySplitLineColor: {
              type: 'colorPicker',
              label: '网格线颜色',
              defaultValue: '#ccc',
              dependOn: ['config.isShowYAxis', 'config.chartType', 'config.isShowYSplitLine'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYSplitLine || !chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            ySplitLineWidth: {
              type: 'slider',
              label: '网格线宽度',
              min: 1,
              max: 10,
              showInput: true,
              defaultValue: 1,
              dependOn: ['config.isShowYAxis', 'config.chartType', 'config.isShowYSplitLine'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYSplitLine || !chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            isShowYAxisLabel: {
              type: 'singleCheckbox',
              label: '标签显示',
              defaultValue: true,
              option: {
                value: true,
                inactiveValue: false,
                label: '标签显示'
              },
              dependOn: ['config.isShowYAxis', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisLabelColor: {
              type: 'colorPicker',
              label: '标签颜色',
              defaultValue: '#333',
              dependOn: ['config.isShowYAxisLabel', 'config.chartType', 'config.isShowYAxis'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisLabelRotate: {
              type: 'slider',
              label: '标签角度',
              min: -90,
              max: 90,
              showInput: true,
              defaultValue: 0,
              dependOn: ['config.isShowYAxisLabel', 'config.chartType', 'config.isShowYAxis'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisLabelSize: {
              type: 'select',
              label: '标签大小',
              defaultValue: 12,
              options: handelLabelSizeOptions(6, 40),
              dependOn: ['config.isShowYAxisLabel', 'config.chartType', 'config.isShowYAxis'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisLabelFormatType: {
              type: 'select',
              label: '格式类型',
              defaultValue: 'auto',
              options: [
                { label: '自动', value: 'auto' },
                { label: '数值', value: 'value' },
                { label: '百分比', value: 'percent' }
              ],
              dependOn: ['config.isShowYAxisLabel', 'config.chartType', 'config.isShowYAxis'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisLabelDecimalNum: {
              type: 'number',
              label: '小数位数',
              defaultValue: 0,
              min: 0,
              max: 10,
              step: 1,
              dependOn: ['config.isShowYAxisLabel', 'config.chartType', 'config.isShowYAxis', 'config.yAxisLabelFormatType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (chartConfig.yAxisLabelFormatType === 'auto' || !chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisLabelNumUnit: {
              type: 'select',
              label: '数量单位',
              defaultValue: '',
              options: [
                { label: '无', value: '' },
                { label: '千', value: '千' },
                { label: '万', value: '万' },
                { label: '百万', value: '百万' },
                { label: '亿', value: '亿' }
              ],
              dependOn: ['config.isShowYAxisLabel', 'config.chartType', 'config.isShowYAxis', 'config.yAxisLabelFormatType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (chartConfig.yAxisLabelFormatType === 'percent' || !chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            yAxisLabelUnitSuffix: {
              label: '单位后缀',
              defaultValue: '',
              dependOn: ['config.isShowYAxisLabel', 'config.chartType', 'config.isShowYAxis'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            isShowYAxisLabelMillage: {
              type: 'singleCheckbox',
              label: '千分符',
              defaultValue: false,
              option: {
                value: true,
                inactiveValue: false,
                label: ''
              },
              dependOn: ['config.isShowYAxisLabel', 'config.chartType', 'config.isShowYAxis'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel || !['barline', 'scatter'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            }
          }
        ))
      },
      {
        title: '标题',
        children: generateFieldList(addConfigPrefix(
          {
            isShowText: {
              type: 'singleCheckbox',
              label: '显示',
              defaultValue: true,
              option: {
                value: true,
                inactiveValue: false,
                label: '显示'
              }
            },
            text: {
              type: 'input',
              label: '标题',
              dependOn: ['config.isShowText'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowText) config.readable = false
                return config
              }
            },
            subtext: {
              type: 'input',
              label: '子标题',
              dependOn: ['config.isShowText'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowText) config.readable = false
                return config
              }
            },
            textSize: {
              type: 'select',
              label: '字体大小',
              defaultValue: 18,
              options: handelLabelSizeOptions(10, 60),
              dependOn: ['config.isShowText'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowText) config.readable = false
                return config
              }
            },
            textColor: {
              type: 'colorPicker',
              label: '字体颜色',
              defaultValue: '#333',
              dependOn: ['config.isShowText'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowText) config.readable = false
                return config
              }
            },
            textAlign: {
              type: 'radio',
              label: '标题显示位置',
              isButton: true,
              defaultValue: 'auto',
              options: [
                { label: '自动', value: 'auto' },
                { label: '居左', value: 'left' },
                { label: '居中', value: 'center' },
                { label: '居右', value: 'right' }
              ],
              dependOn: ['config.isShowText'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowText) config.readable = false
                return config
              }
            },
            textFontStyle: {
              type: 'checkbox',
              label: '字体样式',
              defaultValue: 'bolder',
              options: [
                { label: '倾斜', value: 'italic' },
                { label: '加粗', value: 'bolder' }
              ],
              dependOn: ['config.isShowText'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowText) config.readable = false
                return config
              }
            },
            textShadow: {
              type: 'singleCheckbox',
              label: '字体阴影',
              defaultValue: false,
              option: {
                value: true,
                inactiveValue: false,
                label: '字体阴影'
              },
              dependOn: ['config.isShowText'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowText) config.readable = false
                return config
              }
            }
          }
        ))
      },
      {
        title: '图例',
        children: generateFieldList(addConfigPrefix(
          {
            isShowLegend: {
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
                if (!['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            legendIcon: {
              type: 'select',
              label: '图标',
              defaultValue: 'circle',
              options: [
                { label: '圆形', value: 'circle' },
                { label: '矩形', value: 'rect' },
                { label: '圆矩形', value: 'roundRect' },
                { label: '三角形', value: 'triangle' },
                { label: '棱形', value: 'diamond' },
                { label: '箭头形', value: 'arrow' }
              ],
              dependOn: ['config.isShowLegend', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLegend || !['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            legendOrient: {
              type: 'radio',
              label: '方向',
              isButton: true,
              defaultValue: 'horizontal',
              options: [
                { label: '水平', value: 'horizontal' },
                { label: '垂直', value: 'vertical' }
              ],
              dependOn: ['config.isShowLegend', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLegend || !['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            legendTextSize: {
              type: 'select',
              label: '字体大小',
              defaultValue: 12,
              options: handelLabelSizeOptions(10, 60),
              dependOn: ['config.isShowLegend', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLegend || !['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            legendTextColor: {
              type: 'colorPicker',
              label: '字体颜色',
              defaultValue: '#333',
              dependOn: ['config.isShowLegend', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLegend || !['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            legendLeft: {
              type: 'radio',
              label: '水平位置',
              isButton: true,
              defaultValue: 'right',
              options: [
                { label: '左', value: 'left' },
                { label: '中', value: 'center' },
                { label: '右', value: 'right' }
              ],
              dependOn: ['config.isShowLegend', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLegend || !['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
                return config
              }
            },
            legendTop: {
              type: 'radio',
              label: '垂直位置',
              isButton: true,
              defaultValue: 'top',
              options: [
                { label: '上', value: 'top' },
                { label: '中', value: 'middle' },
                { label: '下', value: 'bottom' }
              ],
              dependOn: ['config.isShowLegend', 'config.chartType'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLegend || !['barline', 'scatter', 'pie'].includes(chartConfig.chartType)) config.readable = false
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
