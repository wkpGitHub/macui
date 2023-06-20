import CipPageCurd from '@cip/components/cip-page-curd'
import { apiConfigService } from '@/api/service/chr'
import { tableColumns, formFieldList, searchFieldList } from './config'
export default {
  setup (props, ctx) {
    return () => <CipPageCurd
          entity={apiConfigService}
          curdFn={{ pageFn: 'list' }}
          tableColumns={tableColumns}
          formFieldList={formFieldList}
          searchFieldList={searchFieldList}
        ></CipPageCurd>
  }
}
