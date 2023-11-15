import { computed } from 'vue'
import { useFormInput, formInputProps } from '@d-render/shared'
import useChartBarLine from '../hooks/use-chart-bar-line'
import Charts from '@/components/charts'

export default {
  name: 'ScatterChart',
  props: formInputProps,
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)

    const option = computed(() => {
      console.log('~~~~~~securityConfig.value~~~~', securityConfig.value)
      const { yAxis = {} } = securityConfig.value
      const dataList = { source: proxyValue.value ? proxyValue.value : yAxis?.data || [] }
      return useChartBarLine(securityConfig.value, dataList, 'scatter')
    })

    return () => <div style="width: 100%; height: 250px" >
      <Charts option={option.value}></Charts>
    </div>
  }
}
