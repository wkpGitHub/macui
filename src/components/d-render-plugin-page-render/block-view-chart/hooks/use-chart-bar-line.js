
export default function useChartBarLine (securityConfig, dataset, configChartType) {
  const {
    grid, xAxis, yType, yAxis, advancedConfig = '', colorScheme, gradation = false, opacity, barGapSelfAdaption = true, barGap, isShowLabel, labelSize, labelColor, labelPosition, isShowTooltip = true, tooltipSize, tooltipColor, tooltipBg, isShowXAxis = true, xAxisPosition = 'bottom', xAxisNameColor, xAxisNameSize, isShowAxisTick = true, isShowSplitLine = false, xSplitLineColor, xSplitLineWidth = 1, xSplitLineType = 'solid', isShowAxisLabel = true, axisLabelColor, axisLabelRotate = 0, axisLabelSize,
    isShowYAxis = true, yAxisPosition, yAxisNameColor, yAxisNameSize, yAxisValue = true, yAxisMinValue, yAxisMaxValue, yAxisSplitNumber, isShowYAxisTick = false, isShowYSplitLine = true, ySplitLineColor, ySplitLineWidth, ySplitLineType = 'solid', isShowYAxisLabel = true, yAxisLabelColor, yAxisLabelRotate = 0, yAxisLabelSize, yAxisLabelFormatType = 'auto', yAxisLabelDecimalNum = 0, yAxisLabelNumUnit = '', yAxisLabelUnitSuffix = '', isShowYAxisLabelMillage = false,
    isShowText = true, text, subtext, textSize, textColor, textAlign = 'auto', textFontStyle = 'bolder', textShadow = false,
    isShowLegend = true, legendIcon, legendOrient, legendTextSize, legendTextColor, legendLeft, legendTop,
    lineStyle = 2, lineType = 'solid', lineSymbol = 'circle', lineSymbolSize = 8, lineSmooth = true, scatterSymbol = 'circle', scatterSymbolSize = 20
  } = securityConfig

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
    const { name, alias, field = 'value' } = column
    yAxisArr.push({
      name: alias,
      type: advancedConfig.includes('isReversed') ? xAxis.xType || 'category' : yType || 'value',
      show: isShowYAxis,
      position: yAxisPosition || 'left',
      // name: 'x名称',
      nameTextStyle: {
        color: yAxisNameColor || '#333',
        fontSize: yAxisNameSize || 12
      },
      min: yAxisValue ? null : yAxisMinValue,
      max: yAxisValue ? null : yAxisMaxValue,
      splitNumber: yAxisValue ? null : yAxisSplitNumber,
      axisLine: {
        show: isShowYAxisTick
      },
      splitLine: {
        show: isShowYSplitLine,
        lineStyle: {
          color: ySplitLineColor || '#ccc',
          width: ySplitLineWidth || 1,
          type: ySplitLineType
        }
      },
      axisLabel: {
        show: isShowYAxisLabel,
        color: yAxisLabelColor || '#333',
        rotate: yAxisLabelRotate,
        fontSize: yAxisLabelSize || 12,
        formatter: (value) => {
          const formattedValue = isShowYAxisLabelMillage
            ? (yAxisLabelFormatType !== 'auto' ? value.toFixed(yAxisLabelDecimalNum).toLocaleString() : value.toLocaleString())
            : (yAxisLabelFormatType !== 'auto' ? value.toFixed(yAxisLabelDecimalNum) : value)

          return yAxisLabelFormatType === 'percent'
            ? `${formattedValue}%${yAxisLabelUnitSuffix}`
            : `${formattedValue}${yAxisLabelNumUnit}${yAxisLabelUnitSuffix}`
        }
      }
    })
    seriesArr.push({
      name: alias || name,
      type: configChartType === 'stackArea' ? 'line' : configChartType,
      itemStyle: colorScheme ? { color: handleColor(colorScheme[index]) } : {},
      markLine: {
        data: markLineDataArr
      },
      markPoint: {
        data: markPointArr
      },
      encode: {
        x: advancedConfig.includes('isReversed') ? field : (xAxis.field ? xAxis.field : 'name'),
        y: advancedConfig.includes('isReversed') ? (xAxis.field ? xAxis.field : 'name') : field
        // tooltip: [advancedConfig.includes('isReversed') ? (xAxis.field ? xAxis.field : 'name') : field]
      },
      barGap: barGapSelfAdaption ? null : `${barGap}%`,
      label: {
        show: !!isShowLabel,
        fontSize: labelSize,
        color: labelColor,
        position: configChartType === 'line' ? 'top' : labelPosition
      },
      lineStyle: {
        width: lineStyle,
        type: lineType
      },
      symbol: configChartType === 'scatter' ? scatterSymbol : lineSymbol,
      symbolSize: configChartType === 'scatter' ? scatterSymbolSize : lineSymbolSize,
      smooth: lineSmooth,
      stack: configChartType === 'stackArea' ? 'Total' : '',
      areaStyle: {
        opacity: configChartType === 'stackArea' ? 0.7 : 0
      },
      emphasis: {
        disabled: configChartType !== 'stackArea',
        focus: 'series'
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
      trigger: isShowTooltip ? (configChartType === 'scatter' ? 'axis' : 'item') : 'none',
      textStyle: {
        color: tooltipColor || '#333',
        fontSize: tooltipSize || 14
      },
      backgroundColor: tooltipBg || '#fff',
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
    grid: {
      left: grid?.left || '3%',
      right: grid?.right || '10%',
      bottom: advancedConfig.includes('xDataZoom') ? grid?.bottom || 50 : grid?.bottom || '3%',
      top: grid?.top || 60,
      containLabel: true
    },
    xAxis: [
      {
        name: xAxis.alias,
        type: advancedConfig.includes('isReversed') ? yType || 'value' : xAxis.xType || 'category',
        show: isShowXAxis,
        position: xAxisPosition,
        // name: 'x名称',
        nameTextStyle: {
          color: xAxisNameColor || '#333',
          fontSize: xAxisNameSize || 14
        },
        axisTick: {
          show: isShowAxisTick,
          alignWithLabel: true
        },
        axisLine: {
          onZero: xAxisPosition === 'bottom',
          lineStyle: {
            color: gradation ? 'rgba(204, 204, 204, 0.5)' : '#333'
          }
        },
        splitLine: {
          show: isShowSplitLine,
          lineStyle: {
            color: xSplitLineColor || '#ccc',
            width: xSplitLineWidth,
            type: xSplitLineType
          }
        },
        axisLabel: {
          show: isShowAxisLabel,
          color: axisLabelColor || '#333',
          rotate: axisLabelRotate,
          fontSize: axisLabelSize || 12
        }
      }
    ],
    yAxis: yAxisArr,
    dataset,
    series: seriesArr,
    dataZoom: dataZoomArr
  }
}
