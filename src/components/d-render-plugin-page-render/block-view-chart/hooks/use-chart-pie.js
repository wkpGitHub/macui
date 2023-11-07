
export default function useChartPie (securityConfig, dataset) {
  const { text, subtext, titleLeft, grid, radius = [0, 100], xField = 'name', yField = { columns: [] } } = securityConfig
  let seriesArr = []

  seriesArr = [{
    type: 'pie',
    radius: [`${radius[0]}%`, `${radius[1]}%`],
    label: {
      fontSize: 20,
      show: false,
      position: 'center'
    },
    emphasis: {
      label: {
        show: radius[0] > 10,
        fontSize: 20,
        fontWeight: 'bold'
      }
    },
    labelLine: {
      show: false
    },
    encode: {
      itemName: xField,
      value: yField.columns.length ? yField.columns[0].field : 'value'
    }
  }]

  return {
    title: {
      text: text || '标题',
      subtext: subtext || '',
      textAlign: titleLeft
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      top: 'middle',
      right: 0
    },
    grid: {
      left: grid.left || '3%',
      right: grid.right || '10%',
      bottom: grid.bottom || '3%',
      top: grid.top || 60,
      containLabel: true
    },
    dataset,
    series: seriesArr
  }
}
