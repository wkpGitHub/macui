import { watch } from 'vue'
import { useSelect } from '@d-render/design/esm/cip-form-design/hooks/index'
import Layout from './widgets/layout'
import CipButton from '@cip/components/cip-button'
import PageDrawing from './widgets/page-drawing'
import PageComponents from '@d-render/design/esm/cip-form-design/widgets/form-components'
import PageConfigure from '@d-render/design/esm/cip-form-design/widgets/form-property'
import './index.less'
export default {
  props: {
    scheme: Object,
    onSave: Function,
    componentsGroupList: Array
  },
  inheritAttrs: false,
  setup (props, { attrs, emit, slots }) {
    const { selectItem, selectItemId, changeSelect, updateSelectItem } = useSelect()

    const updateScheme = (scheme) => {
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
        console.log(initScheme())
        updateScheme(initScheme())
      }
    }, { immediate: true })
    // 设计为组件，与接口完全脱离
    return () => <Layout style={'height: 100%'}>
      {{
        title: slots.title, // 保存功能又外部提供
        handle: () => <>
          {slots.handle?.()}
          {props.onSave && <CipButton onClick={() => props.onSave()}>保存</CipButton>}
        </>,
        nav: () => <PageComponents groupList={props.componentsGroupList}/>,
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
