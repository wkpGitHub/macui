import { generateFieldList } from 'd-render'
import { addConfigPrefix, handelLabelSizeOptions, getOutParams } from '../../utils'
import { tooltipConfig, titleConfig, legendConfig } from './common-config'
import req from '@cip/request'

export default {
  searchApi: {
    type: 'select-api',
    label: '查询接口',
    dependOn: ['yField'],
    async onChange ({ api, dependOn }) {
      const { data } = await req({
        method: 'get',
        apiName: 'apiChr',
        url: `/${api.fullPath}`,
        params: { offset: 0, limit: 10 }
      })
      dependOn.yField.data = data?.list || []
    }
  },
  // apiData: {
  //   label: '接口返回的数据',
  //   type: 'storeData',
  //   defaultValue: { data: [] }
  // },
  xField: {
    label: '键字段',
    dependOn: ['searchApi'],
    type: 'select',
    optionProps: { label: 'title', value: 'name' },
    asyncOptions: async ({ searchApi }) => {
      const option = await getOutParams(searchApi)
      return option
    }
  },
  yField: {
    label: '值字段',
    type: 'yAxisField',
    dependOn: ['searchApi'],
    changeConfig: async (config, { searchApi }) => {
      config.yFields = await getOutParams(searchApi, 'value')
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
              otherKey: ['config.yField', 'config.xField'],
              chartType: 'pie'
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
            radius: {
              label: '半径',
              type: 'slider',
              min: 0,
              max: 100,
              range: true
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
              dependOn: ['config.isShowLabel'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLabel) config.readable = false
                return config
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
              dependOn: ['config.isShowLabel'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.isShowLabel) config.readable = false
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
              dependOn: ['config.labelFormat', 'config.isShowLabel'],
              changeConfig: (config, { config: chartConfig }) => {
                if (!chartConfig.labelFormat?.includes('percent') || !chartConfig.isShowLabel) config.readable = false
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
