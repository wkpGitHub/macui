import { computed, inject, ref } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { generateFieldList } from 'd-render'
import FormTable from '@cip/d-render-plugin-cci/esm/input/basic/table'

export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue } = useFormInput(props, ctx)

    const drDesign = inject('drDesign', {})
    const isShow = ref(true)
    /* eslint-disable */
    const tableConfig = computed(() => {
      const parentTable = drDesign.path.at(-3)
      const tableOpts = {
        name: { label: '参数名', writable: true }
      }
      if (parentTable?.config?.type === 'pageTable') {
        isShow.value = true
        const { children = [] } = parentTable.config.options[0] || {}
        tableOpts.field = { label: '关联表格字段', writable: true, type: 'select', options: children.map(({ config }) => ({ label: config.label, value: config.key })) }
      } else {
        // 这个不是pageTable，暂时不显示
        isShow.value = false
        tableOpts.value = { label: '值', writable: true, type: 'pageFx' }
      }

      return {
        label: '参数',
        type: 'table',
        hideIndex: true,
        options: generateFieldList(tableOpts)
      }
    })

    return () => isShow.value && <div style={{ width: '100%' }}>
      <FormTable v-model={proxyValue.value} config={tableConfig.value} />
    </div>
  }
}
