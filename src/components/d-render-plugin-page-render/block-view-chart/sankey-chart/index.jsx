import { computed } from 'vue'
import { useFormInput, formInputProps } from '@d-render/shared'
import { useEventConfigure, bindEvent } from '../../use-event-configure'
import useChartSankey from '../hooks/use-chart-sankey'
import Charts from '@/components/charts'

export default {
  name: 'SankeyChart',
  props: formInputProps,
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    const handleEvent = useEventConfigure()

    const option = computed(() => {
      console.log('~~~~~~securityConfig.value~~~~', securityConfig.value)
      const { yAxisColumns = {} } = securityConfig.value
      const dataList = { source: proxyValue.value ? proxyValue.value : yAxisColumns?.data || [] }
      return useChartSankey(securityConfig.value, dataList)
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
