
export default function useChartSankey (securityConfig, dataset) {
  const {
    xAxisField, yAxisColumns, zAxisField,
    isShowLabel = true, labelSize, labelColor, // 标签配置
    isShowText = true, text, subtext, textSize, textColor, textAlign = 'auto', textFontStyle = 'bolder', textShadow = false, // 标题配置
    isShowTooltip = true, tooltipSize, tooltipColor, tooltipBg // 提示配置
  } = securityConfig

  let seriesArr = []
  const dataArr = []
  const linkArr = []
  dataset.source.forEach(data => {
    dataArr.push({ name: data[xAxisField] })
    dataArr.push({ name: data[yAxisColumns] })
    linkArr.push({
      source: data[xAxisField],
      target: data[yAxisColumns],
      value: data[zAxisField]
    })
  })

  seriesArr = [{
    type: 'sankey',
    label: {
      show: isShowLabel,
      fontSize: labelSize || 14,
      color: labelColor || '#333'
    },
    emphasis: {
      focus: 'adjacency'
    },
    data: dataArr,
    links: linkArr
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
      trigger: isShowTooltip ? 'item' : 'none',
      triggerOn: 'mousemove',
      textStyle: {
        color: tooltipColor || '#333',
        fontSize: tooltipSize || 14
      },
      backgroundColor: tooltipBg || '#fff'
    },
    series: seriesArr
  }
}
