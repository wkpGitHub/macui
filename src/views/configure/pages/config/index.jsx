import { ref } from 'vue'
import CipPageLayoutHandle from '@cip/components/page-layout/handle'
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
