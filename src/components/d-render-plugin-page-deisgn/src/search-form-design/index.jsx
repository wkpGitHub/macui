import { layoutProps } from '@d-render/shared'
import { computed } from 'vue'
import CipButton from '@cip/components/cip-button'
import { CipForm } from 'd-render'
import { useComponentSlots } from '@/components/d-render-plugin-page-render/use-component-slots'
import './index.less'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    const isHideSearch = computed(() => {
      return props.config.hideSearch
    })
    const labelPosition = computed(() => {
      return props.config.labelPosition
    })
    const searchButtonText = computed(() => {
      return props.config.searchButtonText || '查询'
    })
    // const drDesign = inject('drDesign', {})

    // fieldList 存放地址 options.value[0].children
    return () => {
      // let isFind = false
      // let _curd = {}
      // function getParent (parent) {
      //   const children = []
      // parent.config?.options?.forEach(o => o.children && children.push(...o.children))
      // if (children?.length) {
      //   children.forEach(item => {
      //     if (item.id === props.config.id) {
      //       isFind = true
      //     }
      //     getParent(item)
      //     if (isFind && parent.config.api) {
      //       _curd = parent.config
      //       isFind = false
      //     }
      //   })
      // }
      // }
      // getParent({ config: { options: [{ children: drDesign.schema?.list }] } })
      // const { api } = _curd
      // const { children } = props.config.options?.[0] || {}
      // children.forEach(({ key }) => {
      //   (api?.inputParams || []).forEach(item => {
      //     if (item.name === key) {
      //       item.elementId = `${props.config.key}.${key}`
      //     }
      //   })
      // })
      return <CipForm class="cip-search-form" fieldList={[]} grid={1} labelPosition={labelPosition.value}>
        <div class="search-form-design-wrapper">
          <div class="search-form-design-content" style={{ '--dr-page-render-cols': props.config.grid }}>
            {componentSlots.value.default?.()}
          </div>
          {
            !isHideSearch.value && <div class="search-form-design-operate">
              <CipButton type="primary">{
                searchButtonText.value
              }</CipButton>
              <CipButton>重置</CipButton>
            </div>
          }
        </div>
      </CipForm>
    }
  }
}
