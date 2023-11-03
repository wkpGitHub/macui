import { computed } from 'vue'
import { useFormInput, formInputProps } from '@d-render/shared'
import CipCharts from '@cip/charts'

export default {
  name: 'BlockViewChart',
  props: formInputProps,
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    const chartBindProps = computed(() => {
      if (securityConfig.value.chartType === 'pie') {
        return {
          name: 'product',
          value: '2015'
        }
      } else {
        return {
          name: 'name',
          value: 'value'
        }
      }
    })
    const option = computed(() => {
      console.log('~~~~proxyValue~~~~', proxyValue, securityConfig.value)
      const { chartType: configChartType, text, subtext, titleLeft, grid, xAxis, yType, yAxis, advancedConfig = '', radius = [0, 100] } = securityConfig.value
      const yAxisArr = []
      let seriesArr = []
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
      let markLineDataArr = []
      let markPointArr = []
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

      let tempOption = {
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
        dataset: {
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
            { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
            { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
            { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
            { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
          ]
        }
      }

      if (configChartType === 'pie') {
        seriesArr = [{
          type: configChartType,
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
          }
        }]
        // tempOption.series = seriesArr
        tempOption = {
          ...tempOption,
          series: seriesArr,
          tooltip: {
            trigger: 'item'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            top: 'middle',
            right: 0
          }
        }
      } else if (configChartType === 'sankey') {
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
        tempOption = {
          ...tempOption,
          series: seriesArr,
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          }
        }
      } else {
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
            }
          })
        })
        tempOption = {
          ...tempOption,
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
          series: seriesArr,
          dataZoom: dataZoomArr
        }
      }
      return tempOption
    })

    return () => <div style="width: 100%; height: 250px;" >
      <CipCharts
        // dataset={dataset.value}
        options={option.value}
        bindProps={chartBindProps.value}
      ></CipCharts>
    </div>
  }
}
