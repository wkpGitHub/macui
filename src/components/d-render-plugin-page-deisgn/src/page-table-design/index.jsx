import { CipForm } from 'd-render'
import { computed } from 'vue'
import { useComponentSlots } from '@d-render/design/esm/hooks/use-component-slots'
import './index.less'

export default {
  props: {
    schema: {},
    config: {}
  },
  setup(props, context) {
    const tableConfig = computed(() => {
      return props.schema || props.config
    })
    const { componentSlots } = useComponentSlots(props, context)
    return () => (
      <CipForm labelPosition={'top'} class="dr-draw-table--form ">
        <div
          class={`dr-draw-table--container ${
            tableConfig.value.indexFixed ? 'is-index-fixed' : ''
          }`}>
          {!tableConfig.value.hideIndex && (
            <div class="dr-draw-table--seq">
              <div class="dr-draw-table--seq__title">序号</div>
              <div class="dr-draw-table--seq__number">1</div>
            </div>
          )}
          <div
            class={`dr-draw-table--content ${
              tableConfig.value.hideBorder ? 'is-hide-border' : ''
            }`}>
            {componentSlots.value.default?.()}
          </div>
        </div>
        {tableConfig.value.showSummary && (
          <div class="dr-draw-table--summary">总计</div>
        )}
      </CipForm>
    )
  }
}
