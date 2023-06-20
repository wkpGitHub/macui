import CipPageCurd from '@cip/components/cip-page-curd'
import { dbInfoService } from '@/api/service/chr'
import { tableColumns, formFieldList, searchFieldList } from './config'
export default {
  setup (props, ctx) {
    return () => <CipPageCurd
      entity={dbInfoService}
      curdFn={{ pageFn: 'list', createFn: 'save', updateFn: 'save' }}
      tableColumns={tableColumns}
      formFieldList={formFieldList}
      formGrid={2}
      formLabelWidth={'110px'}
      searchFieldList={searchFieldList}
      withPagination={false}
      itemType={'数据源'}
    >
    </CipPageCurd>
  }
}
