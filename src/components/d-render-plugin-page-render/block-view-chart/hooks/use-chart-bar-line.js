
export default function useChartBarLine (securityConfig, dataset, configChartType) {
  let {
    grid, xAxis = { alias: '', field: '', xType: '' }, yType, yAxis = { columns: [{ name: '', field: '', alias: '' }] }, advancedConfig = '', colorScheme = ['rgb(84, 112, 198)', 'rgb(145, 204, 117)', 'rgb(250, 200, 88)', 'rgb(238, 102, 102)', 'rgb(115, 192, 222)', 'rgb(59, 162, 114)', 'rgb(252, 132, 82)', 'rgb(154, 96, 180)', 'rgb(234, 124, 204)'], gradation = false, stackAreaGradation = false, opacity = 100, barGapSelfAdaption = true, barGap, barWidth, isShowLabel, labelSize, labelColor, labelPosition, isShowTooltip = true, tooltipSize, tooltipColor, tooltipBg, tooltipContent, isShowXAxis = true, xAxisPosition = 'bottom', xAxisNameColor, xAxisNameSize, isShowAxisTick = true, isShowSplitLine = false, xSplitLineColor, xSplitLineWidth = 1, xSplitLineType = 'solid', isShowAxisLabel = true, axisLabelColor, axisLabelRotate = 0, axisLabelSize,
    isShowYAxis = true, yAxisPosition, yAxisNameColor, yAxisNameSize, yAxisValue = true, yAxisMinValue, yAxisMaxValue, yAxisSplitNumber, isShowYAxisTick = false, isShowYSplitLine = true, ySplitLineColor, ySplitLineWidth, ySplitLineType = 'solid', isShowYAxisLabel = true, yAxisLabelColor, yAxisLabelRotate = 0, yAxisLabelSize, yAxisLabelFormatType = 'auto', yAxisLabelDecimalNum = 0, yAxisLabelNumUnit = '', yAxisLabelUnitSuffix = '', isShowYAxisLabelMillage = false,
    isShowText = true, text, subtext, textSize, textColor, textAlign = 'auto', textFontStyle = 'bolder', textShadow = false,
    isShowLegend = true, legendIcon, legendOrient, legendTextSize, legendTextColor, legendLeft, legendTop,
    lineStyle = 2, lineType = 'solid', lineSymbol = 'circle', lineSymbolSize = 8, lineSmooth = true, scatterSymbol = 'circle', scatterSymbolSize = 20
  } = securityConfig

  // 针对-横向柱状图、横向堆叠柱状图、-单独做处理
  if (['horizontalBarChart', 'stackHorizontalBarChart'].includes(configChartType) && advancedConfig === '') {
    advancedConfig = 'isReversed'
  }

  const yAxisArr = []
  const seriesArr = []
  let markLineDataArr = []
  let markPointArr = []

  const handleColor = (color, isGradation) => {
    return isGradation
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
      type: configChartType === 'stackLine' ? 'line' : (['horizontalBarChart', 'stackBarChart', 'stackHorizontalBarChart'].includes(configChartType) ? 'bar' : configChartType),
      itemStyle: { color: handleColor(colorScheme[index], gradation) },
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
      barWidth: barGapSelfAdaption ? null : barWidth,
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
      stack: ['stackLine', 'stackBarChart', 'stackHorizontalBarChart'].includes(configChartType) ? 'Total' : '',
      areaStyle: {
        opacity: configChartType === 'stackLine' ? 0.7 : 0,
        color: handleColor(colorScheme[index], configChartType === 'stackLine' && stackAreaGradation)
      },
      emphasis: {
        disabled: !['stackLine', 'stackBarChart', 'stackHorizontalBarChart'].includes(configChartType),
        focus: 'series'
      },
      myCustomProp: field
    })
  })

  /**
   * 处理自定义tooltip时，显示的内容
   * @param {*} params 是 formatter 需要的数据集
   */
  let formatterFunction = (params) => {
    return tooltipContent.replace(/\{a\}/g, params.seriesName).replace(/\{b\}/g, params.name).replace(/\{c\}/g, params.value[seriesArr[params.seriesIndex].myCustomProp])
  }
  if (!tooltipContent) {
    formatterFunction = ''
  }

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
      left: textAlign,
      textAlign
    },
    tooltip: {
      trigger: isShowTooltip ? 'item' : 'none',
      textStyle: {
        color: tooltipColor || '#333',
        fontSize: tooltipSize || 14
      },
      backgroundColor: tooltipBg || '#fff',
      axisPointer: {
        type: 'shadow'
      },
      formatter: formatterFunction
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
