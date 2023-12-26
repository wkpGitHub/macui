
export default function useChartPie (securityConfig, dataset, configChartType) {
  let {
    radius = [0, 100], xField = 'name', yField = { columns: [] },
    isShowText = true, text, subtext, textSize, textColor, textAlign = 'auto', textFontStyle = 'bolder', textShadow = false, // 标题配置
    opacity, // 颜色配置
    isShowLabel = false, labelFormat = 'dimension', labelSize, labelColor, pieLabelPosition, keepDecimal, // 标签配置
    isShowTooltip = true, tooltipSize, tooltipColor, tooltipBg, // 提示配置
    isShowLegend = true, legendIcon, legendOrient, legendTextSize, legendTextColor, legendLeft, legendTop, // 图例配置
    roseType = 'radius', borderRadius = 8 // 针对南丁格尔玫瑰图
  } = securityConfig

  // 针对环形图单独做处理
  if (configChartType === 'annulusChart' && radius[0] === 0 && radius[1] === 100) { radius = [60, 80] }

  const handleLabelFormat = ({ name, data, percent }, column) => {
    let labelStr = ''
    labelStr = labelFormat.includes('dimension') ? `${name} ` : ''
    labelStr += labelFormat.includes('index') ? `${data[column.field]} ` : ''
    labelStr += labelFormat.includes('percent') ? `${percent.toFixed(keepDecimal === 'zero' ? 0 : (keepDecimal === 'one' ? 1 : 2))}%` : ''
    return labelStr
  }

  const seriesArr = []
  yField.columns.forEach(column => {
    seriesArr.push({
      type: 'pie',
      radius: [`${radius[0]}%`, `${radius[1]}%`],
      label: {
        show: isShowLabel,
        formatter: (params) => handleLabelFormat(params, column),
        fontSize: labelSize || 14,
        color: labelColor || '#333',
        position: pieLabelPosition || 'outside'
      },
      roseType: configChartType === 'nightingaleChart' ? roseType : '',
      itemStyle: {
        opacity: opacity / 100,
        borderRadius: configChartType === 'nightingaleChart' ? borderRadius : 0
      },
      emphasis: {
        label: {
          show: radius[0] > 10,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      // labelLine: {
      //   show: false
      // },
      encode: {
        itemName: xField,
        value: column.field
      }
    })
  })

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
      textStyle: {
        color: tooltipColor || '#333',
        fontSize: tooltipSize || 14
      },
      backgroundColor: tooltipBg || '#fff'
    },
    legend: {
      show: isShowLegend,
      type: 'scroll',
      icon: legendIcon || 'circle',
      orient: legendOrient || 'horizontal',
      textStyle: {
        color: legendTextColor || '#333',
        fontSize: legendTextSize || 12
      },
      left: legendLeft || 'right',
      top: legendTop || 'auto'
    },
    dataset,
    series: seriesArr
  }
}
