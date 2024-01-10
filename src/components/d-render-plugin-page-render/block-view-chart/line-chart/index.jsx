import { ref, computed, watch, onMounted, inject } from 'vue'
import { useFormInput, formInputProps } from '@d-render/shared'
import { useEventConfigure, bindEvent, getInputParams, isInitSearch } from '../../use-event-configure'
import useChartBarLine from '../hooks/use-chart-bar-line'
import Charts from '@lc/components/charts'
import axiosInstance from '@lc/views/app/pages/api'

export default {
  name: 'LineChart',
  props: formInputProps,
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    const dataList = ref([])
    const handleEvent = useEventConfigure()
    const drPageRender = inject('drPageRender', {})

    const option = computed(() => {
      const dataset = { source: proxyValue.value ? proxyValue.value : dataList.value }
      return useChartBarLine(securityConfig.value, dataset, 'line')
    })

    const divWidth = computed(() => {
      return securityConfig.value.width || securityConfig.value.width === 0 ? securityConfig.value.width + 'px' : '100%'
    })

    const divHeight = computed(() => {
      return securityConfig.value.height || securityConfig.value.height === 0 ? securityConfig.value.height + 'px' : '250px'
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
