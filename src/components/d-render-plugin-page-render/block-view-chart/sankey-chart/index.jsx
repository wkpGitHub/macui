import { ref, computed, watch } from 'vue'
import { useFormInput, formInputProps } from '@d-render/shared'
import { useEventConfigure, bindEvent } from '../../use-event-configure'
import useChartSankey from '../hooks/use-chart-sankey'
import Charts from '@/components/charts'
import req from '@cip/request'

export default {
  name: 'SankeyChart',
  props: formInputProps,
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    const dataList = ref([])
    const handleEvent = useEventConfigure()

    const option = computed(() => {
      const dataset = { source: proxyValue.value ? proxyValue.value : dataList.value }
      return useChartSankey(securityConfig.value, dataset)
    })

    watch(() => securityConfig.value.searchApi, async (newVal) => {
      const { fullPath } = newVal
      const { data } = await req({
        method: 'get',
        apiName: 'apiChr',
        url: `/${fullPath}`,
        params: { offset: 0, limit: 10 }
      })
      dataList.value = data?.list || []
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
