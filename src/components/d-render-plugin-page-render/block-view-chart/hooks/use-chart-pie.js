
export default function useChartPie (securityConfig, dataset) {
  const {
    grid, radius = [0, 100], xField = 'name', yField = { columns: [] },
    isShowText = true, text, subtext, textSize, textColor, textAlign = 'auto', textFontStyle = 'bolder', textShadow = false
  } = securityConfig
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
      show: isShowText,
      text: text || '标题',
      subtext: subtext || '',
      textStyle: {
        fontSize: textSize || 18,
        color: textColor || '#333',
        fontStyle: textFontStyle.includes('italic') ? 'italic' : 'normal',
        fontWeight: textFontStyle.includes('bolder') ? 'bolder' : 'normal',
        textShadowColor: textColor || '#333',
        textShadowBlur: textShadow ? 8 : 0,
        textShadowOffsetX: 6,
        textShadowOffsetY: 6
      },
      textAlign
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
