import { computed, h } from 'vue'
import { formInputViewProps } from '@d-render/shared'
import { setOptionWritable, isDesignOptions } from './util'
import { CipTable } from 'd-render'
export default {
  props: formInputViewProps,
  emits: ['statusChange', 'update:modelValue'],
  setup (props, { emit }) {
    const options = computed(() => {
      let o = props.config.options || []
      if (isDesignOptions(o)) o = o[0].children
      return setOptionWritable(o, false)
    })

    return () => {
      // hideOnEmpty为true时判断 值是否存在
      if (props.config.hideOnEmpty && (!props.modelValue || props.modelValue?.length === 0)) {
        emit('statusChange', false)
        return null
      }
      emit('statusChange', true)
      return h('div', { class: ['basic-table', 'basic-table--view'] }, [
        h(CipTable, {
          data: props.modelValue,
          columns: options.value,
          rowKey: props.config.rowKey,
          treeProps: props.config.treeProps || props.config.optionProps || {},
          offset: 0,
          hideIndex: props.config.hideIndex,
          dependOnValues: props.dependOnValues,
          border: true,
          stripe: props.config.stripe,
          showSummary: props.config.showSummary,
          tableHeaderLabel: props.config.tableHeaderLabel,
          size: 'default'
        })
      ])
    }
  }
}
