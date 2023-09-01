import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { CipButtonText } from '@xdp/button'
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
    const { push } = useRouter()
    function goToDetail (row) {
      push({
        name: 'configureConnectorManagerItem',
        params: {
          id: row.id
        },
        query: {
          type: row.type
        }
      })
    }

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
      {{
        'table-handle-append': ({ row }) => <>
          <CipButtonText onClick={() => { goToDetail(row) }}>方法</CipButtonText>
        </>
      }}
    </CipPageCurd>
  }
})
