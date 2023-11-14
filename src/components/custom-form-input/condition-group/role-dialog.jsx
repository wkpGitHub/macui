import { defineComponent, ref, computed } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import CipTree from '@cip/components/cip-tree'
import { fromInputEmits } from '@d-render/shared'
export default defineComponent({
  name: 'select-field',
  props: ['modelValue'],
  emits: fromInputEmits,
  setup (props, ctx) {
    const orgOptions = [{
      label: 'pdm',
      value: 'pdm@citycloud.com.cn',
      children: [{
        label: 'pdm',
        value: 'pdm@citycloud.com.cn'
      }
      ]
    }]
    const treeRef = ref()
    const innerDialogShow = computed({
      get () {
        return props.modelValue
      },
      set (val) {
        ctx.emit('update:modelValue', !props.modelValue)
      }
    })
    return () => <>
      <CipDialog
        title={'选择字段'}
        v-model={innerDialogShow.value}
        size={'small'}
      >
        <CipTree
          ref={treeRef}
          options={orgOptions}
          showButton={false}
          config={{
            showCheckbox: true
          }}
        >
        </CipTree>
      </CipDialog>
    </>
  }
})
