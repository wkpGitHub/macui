import { defineComponent, ref } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'

export default defineComponent({
  name: 'pseudo-code',
  setup (props, { attrs }) {
    const model = ref({})
    return () => <CipDialog
      {...attrs}
      title={'伪代码'}
    >
      <CipForm v-model:model={model.value} fieldList={[]}></CipForm>
    </CipDialog>
  }
})
