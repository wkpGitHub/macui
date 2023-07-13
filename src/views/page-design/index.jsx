import { ref } from 'vue'
import Framework from './framework/index.vue'
import ToolBar from './widgets/tool-bar'
import ApiConfig from './widgets/api-config'
import PageDesign from '@/components/page-design'
import { componentsGroupList } from './config'
import { pageInfoService } from '@/api'
import CipMessage from '@cip/components/cip-message'
import { ApiIcon } from './widgets/svg-icons'
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
      form: 'formDesign'
    }
    setPageInfo()
    return () => <Framework appPath={props.appPath} >
     <PageDesign
       v-model:scheme={scheme.value}
       onSave={handleSave}
       componentsGroupList={componentsGroupList}
       drawTypeMap={drawTypeMap}
       appendModules={[
         { name: 'api', title: 'API Config', icon: <ApiIcon /> }
       ]}
       tabList={[
         { name: 'style', label: '外观' }
       ]}
     >
        {{
          title: () => <ToolBar pageInfo={pageInfo.value} onBack={() => handleBack()}/>,
          nav: ({ name }) => <>
            {name === 'api' && <ApiConfig v-model={pageInfo.value} />}
          </>,
          configure: ({ name }) => <>
            {name === 'style' && <div>style</div>}
          </>
        }}
      </PageDesign>
    </Framework>
  }

}
