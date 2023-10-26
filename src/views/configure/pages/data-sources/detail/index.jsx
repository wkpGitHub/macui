import { defineComponent } from 'vue'
import { PlInfo as CipInfoLayout } from '@cip/page-layout'
import RightPage from '../rightPage'
export default defineComponent({
  name: 'entity-detail',
  props: {
    id: {}
  },
  setup (props) {
    return () => <CipInfoLayout>
      <RightPage id={props.id}></RightPage>
    </CipInfoLayout>
  }
})
