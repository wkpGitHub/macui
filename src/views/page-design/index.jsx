import { ref, watch } from 'vue'
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
// import { DataModelPlugin } from './plugins/data-model'
import { CssConfigurePlugin } from './plugins/css'
import { VariablesPlugin } from './plugins/variables'
import { EventsPlugin } from './plugins/events'
import { FormPreviewPlugin } from './plugins/form-preview'

// import { ApiIcon } from './widgets/svg-icons'
export default {
  props: {
    appPath: {},
    id: {}
  },
  setup (props) {
    const schema = ref({})
    function appendKeyAndId (list) {
      list.forEach(item => {
        item.config.id = item.id
        item.config.key = item.key
        if (item.config?.options) {
          const _children = []
          item.config.options.forEach(o => o.children && _children.push(...o.children))
          appendKeyAndId(_children)
        }
      })
    }
    watch(() => schema.value.list, appendKeyAndId)

    const handleSave = (item) => {
      const { apiList, ...schemaOther } = schema.value;
      (apiList || []).forEach(item => Reflect.deleteProperty(item, 'index'))
      const data = { ...pageInfo.value, content: schemaOther, apiList }
      pageInfoService.save(data).then(res => {
        CipMessage.success(res.message)
      })
    }
    const pageInfo = ref({})
    const equipment = ref('pc')
    const setPageInfo = () => {
      pageInfoService.detail({ id: props.id }).then(res => {
        pageInfo.value = res.data
        Object.assign(schema.value, res.data.content || {}, { apiList: res.data.apiList || [] })
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
      entity: 'entityDesign',
      curd: 'curdDesign',
      pageHandle: 'pageHandleDesign'
    }
    setPageInfo()
    const plugins = [
      new VariablesPlugin(),
      new PalettePlugin({
        data: componentsGroupList
      }),
      new StructurePlugin(),
      new ApiPlugin(),
      new FieldConfigurePlugin(),
      new EventsPlugin(),
      new PageDrawPlugin(),
      new FxPlugin(),
      // new DataModelPlugin(),
      new CodeSourcePlugin(),
      new CssConfigurePlugin(),
      new FormPreviewPlugin()
    ]

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
