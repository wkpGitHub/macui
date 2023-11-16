import { handelLabelSizeOptions } from '../../utils'

export const tooltipConfig = {
  isShowTooltip: {
    type: 'singleCheckbox',
    label: '显示',
    defaultValue: true,
    option: {
      value: true,
      inactiveValue: false,
      label: '显示'
    }
  },
  tooltipSize: {
    type: 'select',
    label: '字体大小',
    defaultValue: 14,
    options: handelLabelSizeOptions(10, 20),
    dependOn: ['config.isShowTooltip'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowTooltip) config.readable = false
      return config
    }
  },
  tooltipColor: {
    type: 'colorPicker',
    label: '字体颜色',
    defaultValue: '#333',
    dependOn: ['config.isShowTooltip'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowTooltip) config.readable = false
      return config
    }
  },
  tooltipBg: {
    type: 'colorPicker',
    label: '背景',
    defaultValue: '#fff',
    dependOn: ['config.isShowTooltip'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowTooltip) config.readable = false
      return config
    }
  }
}

export const titleConfig = {
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

export const legendConfig = {
  isShowLegend: {
    type: 'singleCheckbox',
    label: '显示',
    defaultValue: true,
    option: {
      value: true,
      inactiveValue: false,
      label: '显示'
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
    dependOn: ['config.isShowLegend'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowLegend) config.readable = false
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
    dependOn: ['config.isShowLegend'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowLegend) config.readable = false
      return config
    }
  },
  legendTextSize: {
    type: 'select',
    label: '字体大小',
    defaultValue: 12,
    options: handelLabelSizeOptions(10, 60),
    dependOn: ['config.isShowLegend'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowLegend) config.readable = false
      return config
    }
  },
  legendTextColor: {
    type: 'colorPicker',
    label: '字体颜色',
    defaultValue: '#333',
    dependOn: ['config.isShowLegend'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowLegend) config.readable = false
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
    dependOn: ['config.isShowLegend'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowLegend) config.readable = false
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
    dependOn: ['config.isShowLegend'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowLegend) config.readable = false
      return config
    }
  }
}

export const xAxisConfig = {
  isShowXAxis: {
    type: 'singleCheckbox',
    label: '显示',
    defaultValue: true,
    option: {
      value: true,
      inactiveValue: false,
      label: '显示'
    }
  },
  xAxisPosition: {
    type: 'radio',
    label: '位置',
    isButton: true,
    defaultValue: 'bottom',
    options: [{ label: '上', value: 'top' }, { label: '下', value: 'bottom' }],
    dependOn: ['config.isShowXAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowXAxis) config.readable = false
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
    dependOn: ['config.isShowXAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowXAxis) config.readable = false
      return config
    }
  },
  xAxisNameSize: {
    type: 'select',
    label: '名称字体',
    defaultValue: 12,
    options: handelLabelSizeOptions(10, 40),
    dependOn: ['config.isShowXAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowXAxis) config.readable = false
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
    dependOn: ['config.isShowXAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowXAxis) config.readable = false
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
    dependOn: ['config.isShowXAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowXAxis) config.readable = false
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
    dependOn: ['config.isShowXAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowXAxis) config.readable = false
      return config
    }
  },
  axisLabelColor: {
    type: 'colorPicker',
    label: '标签颜色',
    defaultValue: '#333',
    dependOn: ['config.isShowAxisLabel', 'config.isShowXAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowXAxis || !chartConfig.isShowAxisLabel) config.readable = false
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
    dependOn: ['config.isShowAxisLabel', 'config.isShowXAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowXAxis || !chartConfig.isShowAxisLabel) config.readable = false
      return config
    }
  },
  axisLabelSize: {
    type: 'select',
    label: '标签大小',
    defaultValue: 12,
    options: handelLabelSizeOptions(6, 40),
    dependOn: ['config.isShowAxisLabel', 'config.isShowXAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowXAxis || !chartConfig.isShowAxisLabel) config.readable = false
      return config
    }
  }
}

export const yAxisConfig = {
  isShowYAxis: {
    type: 'singleCheckbox',
    label: '显示',
    defaultValue: true,
    option: {
      value: true,
      inactiveValue: false,
      label: '显示'
    }
  },
  yAxisPosition: {
    type: 'radio',
    label: '位置',
    isButton: true,
    defaultValue: 'left',
    options: [{ label: '左', value: 'left' }, { label: '右', value: 'right' }],
    dependOn: ['config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis) config.readable = false
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
    dependOn: ['config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis) config.readable = false
      return config
    }
  },
  yAxisNameSize: {
    type: 'select',
    label: '名称字体',
    defaultValue: 12,
    options: handelLabelSizeOptions(10, 40),
    dependOn: ['config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis) config.readable = false
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
    dependOn: ['config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis) config.readable = false
      return config
    }
  },
  yAxisMinValue: {
    type: 'number',
    label: '最小值',
    dependOn: ['config.yAxisValue', 'config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (chartConfig.yAxisValue || !chartConfig.isShowYAxis) config.readable = false
      return config
    }
  },
  yAxisMaxValue: {
    type: 'number',
    label: '最大值',
    dependOn: ['config.yAxisValue', 'config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (chartConfig.yAxisValue || !chartConfig.isShowYAxis) config.readable = false
      return config
    }
  },
  yAxisSplitNumber: {
    type: 'number',
    label: '刻度数',
    dependOn: ['config.yAxisValue', 'config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (chartConfig.yAxisValue || !chartConfig.isShowYAxis) config.readable = false
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
    dependOn: ['config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis) config.readable = false
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
    dependOn: ['config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis) config.readable = false
      return config
    }
  },
  ySplitLineColor: {
    type: 'colorPicker',
    label: '网格线颜色',
    defaultValue: '#ccc',
    dependOn: ['config.isShowYAxis', 'config.isShowYSplitLine'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYSplitLine || !chartConfig.isShowYAxis) config.readable = false
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
    dependOn: ['config.isShowYAxis', 'config.isShowYSplitLine'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYSplitLine || !chartConfig.isShowYAxis) config.readable = false
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
    dependOn: ['config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis) config.readable = false
      return config
    }
  },
  yAxisLabelColor: {
    type: 'colorPicker',
    label: '标签颜色',
    defaultValue: '#333',
    dependOn: ['config.isShowYAxisLabel', 'config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel) config.readable = false
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
    dependOn: ['config.isShowYAxisLabel', 'config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel) config.readable = false
      return config
    }
  },
  yAxisLabelSize: {
    type: 'select',
    label: '标签大小',
    defaultValue: 12,
    options: handelLabelSizeOptions(6, 40),
    dependOn: ['config.isShowYAxisLabel', 'config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel) config.readable = false
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
    dependOn: ['config.isShowYAxisLabel', 'config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel) config.readable = false
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
    dependOn: ['config.isShowYAxisLabel', 'config.isShowYAxis', 'config.yAxisLabelFormatType'],
    changeConfig: (config, { config: chartConfig }) => {
      if (chartConfig.yAxisLabelFormatType === 'auto' || !chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel) config.readable = false
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
    dependOn: ['config.isShowYAxisLabel', 'config.isShowYAxis', 'config.yAxisLabelFormatType'],
    changeConfig: (config, { config: chartConfig }) => {
      if (chartConfig.yAxisLabelFormatType === 'percent' || !chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel) config.readable = false
      return config
    }
  },
  yAxisLabelUnitSuffix: {
    label: '单位后缀',
    defaultValue: '',
    dependOn: ['config.isShowYAxisLabel', 'config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel) config.readable = false
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
    dependOn: ['config.isShowYAxisLabel', 'config.isShowYAxis'],
    changeConfig: (config, { config: chartConfig }) => {
      if (!chartConfig.isShowYAxis || !chartConfig.isShowYAxisLabel) config.readable = false
      return config
    }
  }
}
