import { computed } from 'vue'
import { useFormInput, formInputProps } from '@d-render/shared'
import useChartBarLine from './hooks/use-chart-bar-line'
import useChartPie from './hooks/use-chart-pie'
import useChartSankey from './hooks/use-chart-sankey'
import Charts from '@/components/charts'

export default {
  name: 'BlockViewChart',
  props: formInputProps,
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    const dataset = {
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

    const option = computed(() => {
      console.log('~~~~~~securityConfig.value~~~~', securityConfig.value)
      const { chartType } = securityConfig.value
      if (chartType === 'barline') {
        return useChartBarLine(securityConfig.value, dataset)
      } else if (chartType === 'scatter') {
        // 散点图、柱状图、折线图 option配置相似，使用同一个方法处理
        return useChartBarLine(securityConfig.value, dataset)
      } else if (chartType === 'pie') {
        return useChartPie(securityConfig.value, dataset)
      } else {
        return useChartSankey(securityConfig.value, dataset)
      }
    })

    return () => <div style="width: 100%;" >
      <Charts option={option.value} height="250px"></Charts>
    </div>
  }
}
