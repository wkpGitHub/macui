import { ref, computed, watch, onMounted, inject } from 'vue'
import { useFormInput, formInputProps } from '@d-render/shared'
import { useEventConfigure, bindEvent, getInputParams, isInitSearch } from '../../use-event-configure'
import useChartSankey from '../hooks/use-chart-sankey'
import Charts from '@lc/components/charts'
import axiosInstance from '@lc/views/app/pages/api'

export default {
  name: 'SankeyChart',
  props: formInputProps,
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    const dataList = ref([])
    const handleEvent = useEventConfigure()
    const drPageRender = inject('drPageRender', {})

    const option = computed(() => {
      const dataset = { source: proxyValue.value ? proxyValue.value : dataList.value }
      return useChartSankey(securityConfig.value, dataset)
    })

    const divWidth = computed(() => {
      if (['px', '%'].includes(securityConfig.value.width) || !securityConfig.value.width) {
        return '100%'
      } else {
        return securityConfig.value.width
      }
    })

    const divHeight = computed(() => {
      if (['px', '%'].includes(securityConfig.value.height) || !securityConfig.value.height) {
        return '250px'
      } else {
        return securityConfig.value.height
      }
    })

    const getDataList = (api) => {
      axiosInstance({
        url: api.fullPath,
        method: api.httpMethod,
        params: getInputParams(api, drPageRender)
      }).then(({ data }) => {
        dataList.value = data.data?.list || []
      })
    }

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
