import { computed } from 'vue'
import { useFormInput, formInputProps } from '@d-render/shared'
import { useEventConfigure, bindEvent } from '../../use-event-configure'
import useChartPie from '../hooks/use-chart-pie'
import Charts from '@/components/charts'

export default {
  name: 'PieChart',
  props: formInputProps,
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    const handleEvent = useEventConfigure()

    const option = computed(() => {
      console.log('~~~~~~securityConfig.value~~~~', securityConfig.value)
      const { yField = {} } = securityConfig.value
      const dataList = { source: proxyValue.value ? proxyValue.value : yField?.data || [] }
      return useChartPie(securityConfig.value, dataList)
    })

    return () => <div style="width: 100%; height: 250px" >
      <Charts
        option={option.value}
        isListeningClick={true}
        onClick={(e) => bindEvent(handleEvent, 'click', props, e.data)}
      ></Charts>
    </div>
  }
}
