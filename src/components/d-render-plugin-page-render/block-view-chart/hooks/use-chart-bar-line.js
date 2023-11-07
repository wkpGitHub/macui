
export default function useChartBarLine (securityConfig, dataset) {
  const { chartType: configChartType, text, subtext, titleLeft, grid, xAxis, yType, yAxis, advancedConfig = '', xField = 'name', yField = { columns: [] } } = securityConfig
  const yAxisArr = []
  const seriesArr = []
  let markLineDataArr = []
  let markPointArr = []

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

  yAxis.columns.forEach(column => {
    const { alias, chartType } = column
    yAxisArr.push({
      name: alias,
      type: advancedConfig.includes('isReversed') ? xAxis.xType || 'category' : yType || 'value'
    })
    seriesArr.push({
      name: alias,
      type: configChartType === 'scatter' ? 'scatter' : chartType,
      markLine: {
        data: markLineDataArr
      },
      markPoint: {
        data: markPointArr
      },
      encode: {
        x: advancedConfig.includes('isReversed') ? yField.columns.length ? yField.columns[0].field : 'value' : xField,
        y: advancedConfig.includes('isReversed') ? xField : yField.columns.length ? yField.columns[0].field : 'value'
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
