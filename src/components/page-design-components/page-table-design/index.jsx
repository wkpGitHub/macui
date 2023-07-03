import { layoutProps, useFormLayoutOptions } from '@d-render/shared'
import { computed } from 'vue'
import { isArray } from '@cip/utils/util'
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

    // fieldList 存放地址 options.value[0].children
    return () => {
      return <div class="cip-search-form">
        <div class="search-form-design-wrapper">
          <div class="search-form-design-content">
            {componentSlots.value.default?.()}
          </div>
        </div>
      </div>
    }
  }
}
