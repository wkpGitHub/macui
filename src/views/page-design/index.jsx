import { ref, watchEffect, watch } from 'vue'
import Framework from './framework/index.vue'
import ToolBar from './widgets/tool-bar'
// import ApiConfig from './widgets/api-config'
// import DrPageDesign from '@/components/page-design'
import { DrBasicDesign } from '@d-render/design'
import '@d-render/design/dist/index.css'
import { componentsGroupList } from './config'
import { pageInfoService } from '@/api'
import CipMessage from '@cip/components/cip-message'
import CipButton from '@cip/components/cip-button'
import { FxPlugin } from './plugins/fx-plugin'
import { ApiPlugin } from './plugins/api-plugin'
import { CodeSourcePlugin } from './plugins/code-source/index'
import { StructurePlugin } from './plugins/structure'
import { PalettePlugin } from './plugins/palette'
import { FieldConfigurePlugin } from './plugins/field-configure'
import { PageDrawPlugin } from './plugins/page-draw'
import { DataModelPlugin } from './plugins/data-model'
import { CssConfigurePlugin } from './plugins/css'

// import { ApiIcon } from './widgets/svg-icons'
export default {
  props: {
    appPath: {},
    id: {}
  },
  setup (props) {
    const initDataModel = [{
      label: '静态数据',
      value: 'private',
      children: []
    }]
    const schema = ref({
      dataModel: initDataModel
    })
    const handleSave = (item) => {
      const data = { ...pageInfo.value, schema: schema.value, apiList: apiList.value }
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
        schema.value = Object.assign({}, {
          dataModel: initDataModel
        }, res.data.schema)
        console.log({...schema.value}, 'hhhh');
        apiList.value = res.data.apiList || []
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
    const plugins = [
      new PalettePlugin({
        data: componentsGroupList
      }),
      new StructurePlugin(),
      new CodeSourcePlugin(),
      new FieldConfigurePlugin(),
      new PageDrawPlugin(),
      new FxPlugin(),
      new ApiPlugin(),
      new DataModelPlugin(),
      new CssConfigurePlugin()
    ]

    watch(()=> schema.value, (n)=> {
      console.log(n, 'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
    },{
      deep:true,
      immediate: true
    })
    return () => <Framework appPath={props.appPath} >
     <DrBasicDesign
       v-model:schema={schema.value}
       v-model:equipment={equipment.value}
       componentsGroupList={componentsGroupList}
       drawTypeMap={drawTypeMap}
       plugins={plugins}
     >
        {{
          title: () => <ToolBar pageInfo={pageInfo.value} onBack={() => handleBack()}/>,
          handle: () => <>
            <CipButton type={'success'} onClick={handleSave}>发布</CipButton>
          </>
        }}
      </DrBasicDesign>
    </Framework>
  }

}
