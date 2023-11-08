import { generateFieldList } from 'd-render'
import { addConfigPrefix, xField, yField } from '../utils'
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
