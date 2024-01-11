import { ref, computed } from 'vue'
import { getInputParams } from '../../use-event-configure'
import axiosInstance from '@lc/views/app/pages/api'

export default function useChartData (securityConfig, drPageRender) {
  const dataList = ref([])

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

  return {
    dataList,
    divWidth,
    divHeight,
    getDataList
  }
}
