import { watch, provide, ref } from 'vue'
import { useSelect } from '@d-render/design/esm/cip-form-design/hooks/index'
import Layout from './widgets/layout'
import CipButton from '@cip/components/cip-button'
import PageModules from './widgets/modules'
import PageDrawing from './widgets/page-drawing'
import PageComponents from '@d-render/design/esm/cip-form-design/widgets/form-components'
import PageConfigure from '@d-render/design/esm/cip-form-design/widgets/form-property'
import PageParams from './widgets/side-components/page-params'
import CodeSource from './widgets/side-components/code-source'
import './index.less'
import { reactive } from '@vue/reactivity'
export default {
  props: {
    scheme: Object,
    onSave: Function,
    componentsGroupList: Array,
    drawTypeMap: Object
  },
  inheritAttrs: false,
  setup (props, { attrs, emit, slots }) {
    const currentModule = ref('renderer')
    const { selectItem, selectItemId, changeSelect, updateSelectItem } = useSelect()
    provide('pageDesign', reactive({
      drawTypeMap: props.drawTypeMap
    }))
    const updateScheme = (scheme) => {
      // 进入使用designType 出来使用type
      console.log('scheme', scheme)
      emit('update:scheme', scheme)
    }

    const updateList = (list) => {
      const scheme = props.scheme
      scheme.list = list
      updateScheme(scheme)
    }

    const initScheme = () => ({
      list: [], // 组件渲染配置
      init: [], // 初始化时需要调用的methods
      methods: [], // 提供给当前页面使用的methods
      grid: 1
    })

    watch(() => props.scheme, (val) => {
      if (!val) {
        // 如果scheme为空则直接进行初始化
        updateScheme(initScheme())
      }
    }, { immediate: true })
    // 设计为组件，与接口完全脱离
    return () => <Layout style={`height: 100%; ${currentModule.value === 'code' ? '--page-design-nav-width: 800px' : ''}`}>
      {{
        title: slots.title,
        modules: () => <PageModules v-model={currentModule.value}/>,
        handle: () => <>
          {slots.handle?.()}
          {props.onSave && <CipButton onClick={() => props.onSave()}>保存</CipButton>}
        </>,
        nav: () => <>
          {currentModule.value === 'pageParams' && <PageParams />}
          {currentModule.value === 'renderer' && <PageComponents groupList={props.componentsGroupList}/>}
          {currentModule.value === 'code' && <CodeSource modelValue={props.scheme} onUpdate:modelValue={updateScheme}/>}
        </>,
        content: () => <PageDrawing
          data={props.scheme}
          selectId={selectItemId.value}
          onSelect={(item) => changeSelect(item)}
          onUpdateList={(list) => { updateList(list) }}
        />,
        configure: () => <PageConfigure
          selectItem={selectItem.value}
          data={props.scheme}
          onUpdate:data={(val) => updateScheme(val)}
          onUpdate:selectItem={(val) => updateSelectItem(val)}
        />
      }}

    </Layout>
  }
}
