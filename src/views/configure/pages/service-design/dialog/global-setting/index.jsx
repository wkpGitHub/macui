import { defineComponent, ref } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'

export default defineComponent({
  name: 'global-setting',
  setup (props, { attrs }) {
    const model = ref({})
    return () => <CipDialog
      {...attrs}
      title={'全局设置'}
    >
      <CipForm v-model:model={model.value} fieldList={[]}></CipForm>
    </CipDialog>
  }
})
