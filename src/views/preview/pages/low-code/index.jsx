import { ref, watch, computed } from 'vue'
import PageRender from '@/components/page-render'
import { pageInfoService } from '@/api'
export default {
  props: {
    id: [Number, String], // 支持uuid 数字id,
    path: [Number, String] // 支持uuid 数字id
  },
  setup (props) {
    const pageSchema = ref({})
    const model = ref({
      filter: {}
    })
    const apiList = ref([])
    const service = computed(() => {
      return apiList.value?.reduce((acc, api) => {
        acc[api.apiName] = api
        return acc
      }, {})
    })
    const getPageScheme = (id, path) => {
      pageInfoService.detail({ id, fullPath: path }).then(res => {
        pageSchema.value = res.data.schema
        apiList.value = res.data.apiList ?? []
      })
    }

    // 根据id获取页面scheme
    watch([() => props.id, () => props.path], (values) => {
      getPageScheme(...values)
    }, { immediate: true })
    return () => <PageRender
        v-model:model={model.value}
        onUpdate:model={(val) => {
          model.value = val
        }}
        scheme={pageSchema.value}
        service={service.value}
      />
  }
}
