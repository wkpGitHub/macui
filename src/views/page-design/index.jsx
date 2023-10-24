import { ref } from 'vue'
import Framework from './framework/index.vue'
import ToolBar from './widgets/tool-bar'
// import ApiConfig from './widgets/api-config'
// import DrPageDesign from '@/components/page-design'
import { DrPageDesign } from '@d-render/design'
import '@d-render/design/dist/index.css'
import { componentsGroupList } from './config'
import { pageInfoService } from '@/api'
import CipMessage from '@cip/components/cip-message'
import CipButton from '@cip/components/cip-button'
// import { ApiIcon } from './widgets/svg-icons'
export default {
  props: {
    appPath: {},
    id: {}
  },
  setup (props) {
    const scheme = ref({})
    const handleSave = (item) => {
      const data = { ...pageInfo.value, schema: scheme.value, apiList: apiList.value }
      pageInfoService.save(data).then(res => {
        CipMessage.success(res.message)
      })
    }
    const pageInfo = ref({})
    const apiList = ref([])
    const equipment = ref('pc')
    const setPageInfo = () => {
      pageInfoService.detail({ id: props.id }).then(res => {
        pageInfo.value = res.data
        scheme.value = res.data.schema
        apiList.value = res.data.apiList || []
        console.log(scheme.value)
      })
    }
    const handleBack = () => {
      window.close()
    }
    const drawTypeMap = {
      searchForm: 'searchFormDesign',
      pageTable: 'pageTableDesign',
      dialog: 'dialogDesign',
      form: 'formDesign',
      entity: 'entityDesign'
    }
    setPageInfo()
    return () => <Framework appPath={props.appPath} >
     <DrPageDesign
       v-model:schema={scheme.value}
       v-model:equipment={equipment.value}
       onSave={handleSave}
       componentsGroupList={componentsGroupList}
       drawTypeMap={drawTypeMap}
     >
        {{
          title: () => <ToolBar pageInfo={pageInfo.value} onBack={() => handleBack()}/>,
          handle: () => <>
            <CipButton type={'success'} onClick={() => { }}>发布</CipButton>
          </>
        }}
      </DrPageDesign>
    </Framework>
  }

}
