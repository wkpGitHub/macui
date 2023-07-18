import { ref } from 'vue'
import { PlHandle as CipPageLayoutHandle } from '@cip/page-layout'
import { CipForm } from 'd-render'
export default {
  setup () {
    const config = ref({})
    return () => <CipPageLayoutHandle >
      <CipForm v-model:model={config} fieldList={[{
        key: 'layout',
        config: {}
      }]}></CipForm>
    </CipPageLayoutHandle>
  }
}
