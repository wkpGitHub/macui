import { ref } from 'vue'
import Framework from './framework/index.vue'
import ToolBar from './widgets/tool-bar'
import PageDesign from '@/components/page-design'
import { componentsGroupList } from './config'
import { pageInfoService } from '@/api'
import CipMessage from '@cip/components/cip-message'
export default {
  props: {
    appPath: {},
    id: {}
  },
  setup (props) {
    const scheme = ref({})
    const handleSave = (item) => {
      const data = { ...pageInfo.value, schema: scheme.value }
      pageInfoService.save(data).then(res => {
        CipMessage.success(res.message)
      })
    }
    const pageInfo = ref({})
    const setPageInfo = () => {
      pageInfoService.detail({ id: props.id }).then(res => {
        pageInfo.value = res.data
        scheme.value = res.data.schema
        console.log(scheme.value)
      })
    }
    setPageInfo()
    return () => <Framework appPath={props.appPath}>
     <PageDesign
       v-model:scheme={scheme.value}
       onSave={handleSave}
       componentsGroupList={componentsGroupList}
     >
        {{ title: () => <ToolBar pageInfo={pageInfo.value}/> }}
      </PageDesign>
    </Framework>
  }

}
