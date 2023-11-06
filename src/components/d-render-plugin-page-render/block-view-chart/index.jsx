import { computed } from 'vue'
import { useFormInput, formInputProps } from '@d-render/shared'
import CipCharts from '@cip/charts'

export default {
  name: 'BlockViewChart',
  props: formInputProps,
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    const chartBindProps = computed(() => {
      const { xField = 'name', yField = { columns: [] } } = securityConfig.value
      return {
        name: xField,
        value: yField.columns.length ? yField.columns[0].field : 'value'
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
          source: [
            {
              id: '1',
              name: 'f小明',
              password: '123456',
              haha: '',
              card: '123456',
              money: '2',
              time: '2017-08-15 11:20:01',
              strtime: '2018-08-15 11:20:01',
              address: '杭州滨江区城云科技',
              hoby: '2015年青岛啤酒纪念银币',
              age: '1',
              year: '2009',
              addhaha: '1',
              sum: '0.1234',
              dd: '1'
            },
            {
              id: '2',
              name: 'a小花',
              password: '123',
              haha: '',
              card: '123',
              money: '1',
              time: '2016-08-15 11:20:01',
              strtime: '2018-08-15 11:20:01',
              address: '杭州城云科技',
              hoby: '麦芽酿造的啤酒',
              age: '2',
              year: '2016',
              addhaha: '2',
              sum: '0.1235',
              dd: '1'
            },
            {
              id: '3',
              name: 'e张三',
              password: '3',
              haha: '',
              card: '3',
              money: '3',
              time: '2013-08-15 11:20:01',
              strtime: '2018-08-15 11:20:01',
              address: '城云科技中国有限公司',
              hoby: '啤酒酿造机器',
              age: '3',
              year: '2017',
              addhaha: '3',
              sum: '2.3879',
              dd: '1'
            },
            {
              id: '4',
              name: 'd李四',
              password: '4',
              haha: '',
              card: '4',
              money: '4',
              time: '2018-08-15 11:20:01',
              strtime: '2018-08-15 11:20:01',
              address: '北京天安门',
              hoby: '啤酒酿酒机设备',
              age: '4',
              year: '2019',
              addhaha: '4',
              sum: '3.9877',
              dd: '1'
            },
            {
              id: '5',
              name: 'a小明2',
              password: '123456',
              haha: '',
              card: '123456',
              money: '2',
              time: '2017-08-15 11:20:01',
              strtime: '2018-08-15 11:20:01',
              address: '杭州滨江区城云科技',
              hoby: '杭州市拱墅区米市巷街道米市社区新河坝16幢',
              age: '5',
              year: '2012',
              addhaha: '5',
              sum: '4',
              dd: '1'
            },
            {
              id: '6',
              name: 'c小明3',
              password: '123',
              haha: '',
              card: '123',
              money: '2',
              time: '2017-08-15 11:20:01',
              strtime: '2018-08-15 11:20:01',
              address: '杭州滨江区城云科技',
              hoby: '小麦白啤酒',
              age: '1',
              year: '2011',
              addhaha: '6',
              sum: '5',
              dd: '1'
            },
            {
              id: '7',
              name: 'd小明3',
              password: '123',
              haha: '',
              card: '123456',
              money: '1',
              time: '2017-08-15 11:20:01',
              strtime: '2018-08-15 11:20:01',
              address: '杭州滨江区城云科技',
              hoby: '三只熊牌啤酒4.5L',
              age: 'a',
              year: '2008',
              addhaha: '7',
              sum: '6',
              dd: '1'
            }
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
