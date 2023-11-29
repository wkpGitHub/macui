import { CipForm } from 'd-render'
import { computed, inject, watch } from 'vue'
import { useComponentSlots } from '@d-render/design/esm/hooks/use-component-slots'
import './index.less'
import { v4 as uuidv4 } from 'uuid'
import { getListConfigById } from '@/components/d-render-plugin-page-render/use-event-configure'

export default {
  props: {
    schema: {},
    config: {}
  },
  setup (props, context) {
    const drDesign = inject('drDesign')
    const tableConfig = computed(() => {
      return props.schema || props.config
    })

    const tableItem = getListConfigById(drDesign.schema.list, props.config.id)
    // 第一次加载，没有加上，有不变
    if (!tableItem.config.otherKey?.length) {
      tableItem.config.otherKey = props.config.selectType === 'none' ? [] : [uuidv4()]
    }
    // 后面有变化再修改，不要合并上面的，这个代码就是这么写
    watch(() => props.config.selectType, v => {
      tableItem.config.otherKey = v === 'none' ? [] : [uuidv4()]
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
