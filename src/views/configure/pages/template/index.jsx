import CipPageCurd from '@cip/components/cip-page-curd'
import { tableColumns, formFieldList, searchFieldList } from './config'
export default {
  setup (props, ctx) {
    return () => <CipPageCurd
      tableColumns={tableColumns}
      formFieldList={formFieldList}
      searchFieldList={searchFieldList}
    >

      {{
        'table-handle': () => <></>
      }}
    </CipPageCurd>
  }
}
