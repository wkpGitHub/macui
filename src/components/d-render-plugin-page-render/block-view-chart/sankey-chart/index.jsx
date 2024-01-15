import { computed, watch, onMounted, inject } from 'vue'
import { useFormInput, formInputProps } from '@d-render/shared'
import { useEventConfigure, bindEvent, isInitSearch } from '../../use-event-configure'
import useChartSankey from '../hooks/use-chart-sankey'
import useChartData from '../hooks/use-chart-data'
import Charts from '@lc/components/charts'

export default {
  name: 'SankeyChart',
  props: formInputProps,
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    const handleEvent = useEventConfigure()
    const drPageRender = inject('drPageRender', {})
    const { dataList, divWidth, divHeight, getDataList } = useChartData(securityConfig, drPageRender)

    const option = computed(() => {
      const dataset = { source: proxyValue.value ? proxyValue.value : dataList.value }
      return useChartSankey(securityConfig.value, dataset)
    })

    watch(() => securityConfig.value.api, (newVal) => {
      getDataList(newVal)
    })

    onMounted(() => {
      isInitSearch(securityConfig.value.api, drPageRender) && getDataList(securityConfig.value.api)
    })

    return () => <Charts
      width={divWidth.value}
      height={divHeight.value}
      option={option.value}
      isListeningClick={true}
      onClick={(e) => bindEvent(handleEvent, 'click', props, e.data)}
    ></Charts>
  }
}
