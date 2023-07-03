import { layoutProps, useFormLayoutOptions } from '@d-render/shared'
import { computed } from 'vue'
import { isArray } from '@cip/utils/util'
import CipButton from '@cip/components/cip-button'
import { CipForm } from 'd-render'
import './index.less'
export default {
  props: layoutProps,
  setup (props, context) {
    const { options, updateConfig, ...handler } = useFormLayoutOptions({ props, emit: context.emit })
    const componentSlots = computed(() => {
      return options.value.reduce((acc, slotConfig, idx) => {
        if (isArray(slotConfig.children)) {
          acc[slotConfig.key] = () => context.slots.item({ children: slotConfig.children, optionIndex: idx, isShow: props.config._isShow, ...handler })
        }
        return acc
      }, {})
    })
    const isHideSearch = computed(() => {
      return props.config.hideSearch
    })
    const labelPosition = computed(() => {
      return props.config.labelPosition
    })
    const searchButtonText = computed(() => {
      return props.config.searchButtonText || '查询'
    })
    // fieldList 存放地址 options.value[0].children
    return () => {
      return <CipForm class="cip-search-form" fieldList={[]} grid={1} labelPosition={labelPosition.value}>
        <div class="search-form-design-wrapper">
          <div class="search-form-design-content">
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
