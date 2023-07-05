import { ref } from 'vue'
import Framework from './framework/index.vue'
import ToolBar from './widgets/tool-bar'
import ApiConfig from './widgets/api-config'
import PageDesign from '@/components/page-design'
import { componentsGroupList } from './config'
import { pageInfoService } from '@/api'
import CipMessage from '@cip/components/cip-message'
import { Plus } from '@element-plus/icons-vue'
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
         { name: 'api', title: 'API Config', icon: <Plus /> }

       ]}
     >
        {{
          title: () => <ToolBar pageInfo={pageInfo.value} onBack={() => handleBack()}/>,
          nav: ({ name }) => <>
            {name === 'api' && <ApiConfig />}

          </>
        }}
      </PageDesign>
    </Framework>
  }

}
