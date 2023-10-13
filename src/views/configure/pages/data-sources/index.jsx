import { ref } from 'vue'
import { PlLeftRight as CipPageLayoutLeftRight } from '@cip/page-layout'
import PageTree from './page-tree'
import RightPage from './rightPage'
export default {
  setup (props, ctx) {
    const currentDataModel = ref({})
    return () => <CipPageLayoutLeftRight>
      {{
        left: () => <PageTree v-model={currentDataModel.value} type="entity" />,
        default: () => <div style={{ height: '100%' }}>
          {currentDataModel.value && <RightPage id={currentDataModel.value} />}
        </div>
      }}
    </CipPageLayoutLeftRight>
  }
}
