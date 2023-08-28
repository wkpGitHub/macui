import { defineComponent } from 'vue'
import CipPageCurd from '@cip/components/cip-page-curd'
import { connectorService } from '@/api'
import {
  searchFieldList,
  tableColumns,
  formFieldList
} from './config'

export default defineComponent({
  name: 'connector-manager',
  setup () {
    return () => <CipPageCurd
      entity={connectorService}
      tableColumns={tableColumns}
      formGrid={24}
      formFieldList={formFieldList}
      formLabelWidth={'110px'}
      searchFieldList={searchFieldList}
      itemType={'连接器'}
      permission={{ info: 'noP' }}
      fetchInfo={true}
    >
    </CipPageCurd>
  }
})
