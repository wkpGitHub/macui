import { ref, watch, computed } from 'vue'
import PageRender from '@/components/page-render'
import { pageInfoService } from '@/api'
import { apiConfigToApi } from '../api'
export default {
  props: {
    id: [Number, String],
    appPath: String,
    path: [Number, String] // 支持uuid 数字id
  },
  setup (props) {
    const pageSchema = ref({})
    const model = ref({})
    const apiList = ref([])
    const service = computed(() => {
      return apiList.value?.reduce((acc, api) => {
        acc[api.name] = apiConfigToApi(api)
        return acc
      }, {})
    })
    const getPageScheme = (path, id) => {
      pageInfoService.detail({ fullPath: path, app: props.appPath, id }).then(res => {
        pageSchema.value = res.data.schema
        apiList.value = res.data.apiList || []
        pageSchema.value.apiList = res.data.apiList || []
      })
    }

    // 根据id获取页面scheme
    watch([() => props.path, () => props.id], (values) => {
      getPageScheme(...values)
    }, { immediate: true })
    return () => <PageRender
        v-model:model={model.value}
        onUpdate:model={(val) => {
          model.value = val
        }}
        schema={pageSchema.value}
        service={service.value}
      />
  }
}
