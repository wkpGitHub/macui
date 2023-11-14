
export default function useChartSankey (securityConfig, dataset) {
  const { grid, isShowText = true, text, subtext, textSize, textColor, textAlign = 'auto', textFontStyle = 'bolder', textShadow = false } = securityConfig
  let seriesArr = []

  seriesArr = [{
    type: 'sankey',
    emphasis: {
      focus: 'adjacency'
    },
    data: [
      {
        name: 'a'
      },
      {
        name: 'b'
      },
      {
        name: 'a1'
      },
      {
        name: 'a2'
      },
      {
        name: 'b1'
      },
      {
        name: 'c'
      }
    ],
    links: [
      {
        source: 'a',
        target: 'a1',
        value: 5
      },
      {
        source: 'a',
        target: 'a2',
        value: 3
      },
      {
        source: 'b',
        target: 'b1',
        value: 8
      },
      {
        source: 'a',
        target: 'b1',
        value: 3
      },
      {
        source: 'b1',
        target: 'a1',
        value: 1
      },
      {
        source: 'b1',
        target: 'c',
        value: 2
      }
    ]
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
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    legend: {},
    grid: {
      left: grid.left || '3%',
      right: grid.right || '10%',
      bottom: grid.bottom || '3%',
      top: grid.top || 60,
      containLabel: true
    },
    series: seriesArr
  }
}
