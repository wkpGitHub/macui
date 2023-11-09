
export default function useChartBarLine (securityConfig, dataset) {
  const { chartType: configChartType, text, subtext, titleLeft, grid, xAxis, yType, yAxis, advancedConfig = '', colorScheme, gradation = false, opacity } = securityConfig

  const yAxisArr = []
  const seriesArr = []
  let markLineDataArr = []
  let markPointArr = []

  const handleColor = (color) => {
    return gradation
      ? {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: color.replace('rgb', 'rgba').replace(')', `, ${opacity / 100})`)
          }, {
            offset: 1, color: 'white'
          }],
          global: false
        }
      : color.replace('rgb', 'rgba').replace(')', `, ${opacity / 100})`)
  }

  const dataZoomArr = advancedConfig.includes('xDataZoom')
    ? [
        {
          show: true,
          type: 'slider',
          start: 0,
          end: 100
        }
      ]
    : []

  if (advancedConfig.includes('minMax')) {
    markPointArr = [
      {
        type: 'min',
        name: '最小值'
      },
      {
        type: 'max',
        name: '最大值'
      }
    ]
  }

  if (advancedConfig.includes('average')) {
    markLineDataArr = [{
      type: 'average',
      name: '平均值'
    }]
  }

  yAxis.columns.forEach((column, index) => {
    const { alias, chartType, field = 'value' } = column
    yAxisArr.push({
      name: alias,
      type: advancedConfig.includes('isReversed') ? xAxis.xType || 'category' : yType || 'value'
      // axisLabel: {
      //   formatter: '{yyyy}-{MM}-{dd}'
      // }
    })
    seriesArr.push({
      name: alias,
      type: configChartType === 'scatter' ? 'scatter' : chartType,
      itemStyle: colorScheme ? { color: handleColor(colorScheme[index]) } : {},
      markLine: {
        data: markLineDataArr
      },
      markPoint: {
        data: markPointArr
      },
      encode: {
        x: advancedConfig.includes('isReversed') ? field : (xAxis.field ? xAxis.field : 'name'),
        y: advancedConfig.includes('isReversed') ? (xAxis.field ? xAxis.field : 'name') : field,
        tooltip: [advancedConfig.includes('isReversed') ? (xAxis.field ? xAxis.field : 'name') : field]
      }
    })
  })

  return {
    title: {
      text: text || '标题',
      subtext: subtext || '',
      textAlign: titleLeft
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
      // formatter: (params) => {
      //   const name = params[0].value[xAxis.field]
      //   const year = params[0].value.year
      //   if (yType === 'time') {
      //     return name + '-' + year
      //   } else {

      //   }
      // }
    },
    legend: {},
    grid: {
      left: grid.left || '3%',
      right: grid.right || '10%',
      bottom: advancedConfig.includes('xDataZoom') ? grid.bottom || 50 : grid.bottom || '3%',
      top: grid.top || 60,
      containLabel: true
    },
    xAxis: [
      {
        name: xAxis.alias,
        type: advancedConfig.includes('isReversed') ? yType || 'value' : xAxis.xType || 'category',
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: yAxisArr,
    dataset,
    series: seriesArr,
    dataZoom: dataZoomArr
  }
}
