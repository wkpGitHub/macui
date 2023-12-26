import { ref, computed, watch, onMounted, inject } from 'vue'
import { useFormInput, formInputProps } from '@d-render/shared'
import { useEventConfigure, bindEvent, getInputParams, isInitSearch } from '../../use-event-configure'
import useChartPie from '../hooks/use-chart-pie'
import Charts from '@/components/charts'
import axiosInstance from '@/views/app/pages/api'

export default {
  name: 'AnnulusChart',
  props: formInputProps,
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    const dataList = ref([])
    const handleEvent = useEventConfigure()
    const drPageRender = inject('drPageRender', {})

    const option = computed(() => {
      const dataset = { source: proxyValue.value ? proxyValue.value : dataList.value }
      return useChartPie(securityConfig.value, dataset, 'annulusChart')
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

    return () => <div style="width: 100%; height: 250px" >
      <Charts
        option={option.value}
        isListeningClick={true}
        onClick={(e) => bindEvent(handleEvent, 'click', props, e.data)}
      ></Charts>
    </div>
  }
}
