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

    const option = computed(() => {
      console.log('~~~~~~securityConfig.value~~~~', securityConfig.value)
      const { chartType, yAxis = {} } = securityConfig.value
      const dataList = { source: proxyValue.value ? proxyValue.value : yAxis?.data || [] }
      const chartTypeToFunction = {
        barline: useChartBarLine,
        scatter: useChartBarLine,
        pie: useChartPie,
        default: useChartSankey
      }
      const chartFunction = chartTypeToFunction[chartType] || chartTypeToFunction.default
      return chartFunction(securityConfig.value, dataList)
    })

    return () => <div style="width: 100%; height: 250px" >
      <Charts option={option.value}></Charts>
    </div>
  }
}
