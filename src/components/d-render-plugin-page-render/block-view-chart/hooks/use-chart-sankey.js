
export default function useChartSankey (securityConfig, dataset) {
  const { text, subtext, titleLeft, grid } = securityConfig
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
      text: text || '标题',
      subtext: subtext || '',
      textAlign: titleLeft
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
