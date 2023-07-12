import { watch, provide, ref, computed } from 'vue'
import { useSelect } from '@d-render/design/esm/cip-form-design/hooks/index'
import Layout from './widgets/layout'
import CipButton from '@cip/components/cip-button'
import PageModules from './widgets/modules'
import PageDrawing from './widgets/page-drawing'
import PageStructure from './widgets/side-components/structure'
import PageComponents from '@d-render/design/esm/cip-form-design/widgets/form-components'
import PageMethods from './widgets/side-components/methods'

import PageConfigure from './widgets/property'
import PageParams from './widgets/side-components/page-params'
import CodeSource from './widgets/side-components/code-source'
import './index.less'
import { reactive } from '@vue/reactivity'
import { modulesConfig } from '@/components/page-design/config'
export default {
  props: {
    scheme: Object,
    config: Object,
    appendModules: Array,
    onSave: Function,
    componentsGroupList: Array,
    drawTypeMap: Object,
    tabList: Array
  },
  inheritAttrs: false,
  setup (props, { attrs, emit, slots }) {
    const currentModuleName = ref('renderer')
    const modulesBridge = computed(() => {
      return modulesConfig.concat(props.appendModules)
    })
    const currentModuleTitle = computed(() => {
      return modulesBridge.value.find(module => module.name === currentModuleName.value).title
    })
    const { selectItem, selectItemId, changeSelect, updateSelectItem } = useSelect()
    const pageDesign = reactive({
      drawTypeMap: props.drawTypeMap,
      scheme: props.scheme
    })
    provide('pageDesign', pageDesign)
    watch(() => props.scheme, (val) => {
      pageDesign.scheme = val
    }, {
      deep: true
    })
    const updateScheme = (scheme) => {
      // 进入使用designType 出来使用type
      emit('update:scheme', scheme)
    }
    const updateConfig = (config) => {
      const scheme = props.scheme
      scheme.config = config
      emit('update:config', config)
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
    return () => <Layout
      style={`height: 100%; ${currentModuleName.value === 'code' ? '--page-design-nav-width: 800px' : ''}`}
      navTitle={currentModuleTitle.value}
    >
      {{
        title: slots.title,
        modules: () => <PageModules modules={modulesBridge.value} v-model={currentModuleName.value}/>,
        handle: () => <>
          {slots.handle?.()}
          {props.onSave && <CipButton onClick={() => props.onSave()}>保存</CipButton>}
        </>,
        nav: () => <>
          {currentModuleName.value === 'pageParams' && <PageParams modelValue={props.scheme.config} onUpdate:modelValue={updateConfig}/>}
          {currentModuleName.value === 'structure' && <PageStructure
            modelValue={selectItemId.value}
            list={props.scheme.list}
            onUpdate:selectItem={(val) => { selectItem.value = val }}
          />}
          {currentModuleName.value === 'renderer' && <PageComponents groupList={props.componentsGroupList}/>}
          {currentModuleName.value === 'code' && <CodeSource modelValue={props.scheme} onUpdate:modelValue={updateScheme}/>}
          {currentModuleName.value === 'methods' && <PageMethods modelValue={props.scheme} onUpdate:modelValue={updateScheme}/>}
          {slots.nav?.({ name: currentModuleName.value })}
          {/* {currentModuleName.value === 'api' && <ApiConfig modelValue={props.scheme} onUpdate:modelValue={updateScheme}/>} */}
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
        tabList={props.tabList}
        />
      }}
    </Layout>
  }
}
