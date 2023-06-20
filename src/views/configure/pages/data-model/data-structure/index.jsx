import CipPageLayoutLeftRight from '@cip/components/page-layout/left-right'
import DataModelTree from '@/views/configure/pages/data-model/widgets/data-model-tree'
export default {
  setup (props, ctx) {
    return () => <CipPageLayoutLeftRight>
      {{
        left: () => <DataModelTree />
      }}
    </CipPageLayoutLeftRight>
  }
}
