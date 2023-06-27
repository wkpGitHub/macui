import { ref, watch } from 'vue'
import PageRender from '@/components/page-render'
import { pageInfoService } from '@/api'
export default {
  props: {
    id: [Number, String] // 支持uuid 数字id
  },
  setup (props) {
    const pageSchema = ref({})
    const model = ref({
    })
    const getPageScheme = (val) => {
      pageInfoService.detail({ id: val }).then(res => {
        pageSchema.value = res.data.schema
      })
      // pageSchemaService.info({ id: val }).then(res => {
      //   pageSchema.value = res.data.schema
      // })
    }

    // 根据id获取页面scheme
    watch(() => props.id, (val) => {
      getPageScheme(val)
    }, { immediate: true })

    return () => <div>
      <PageRender
        v-model:model={model.value}
        onUpdate:model={(val) => {
          model.value = val
        }} schema={pageSchema.value}
      />
    </div>
  }
}
