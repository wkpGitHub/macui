import { useRouter } from 'vue-router'
import CipPageCurd from '@cip/components/cip-page-curd'
import { apiConfigService } from '@/api/service/chr'
import CipButton from '@cip/components/cip-button'
import { tableColumns, formFieldList, searchFieldList } from './config'
export default {
  setup (props, ctx) {
    const router = useRouter()

    return () => <CipPageCurd
          entity={apiConfigService}
          withCreate={false}
          curdFn={{ pageFn: 'list' }}
          tableColumns={tableColumns}
          formFieldList={formFieldList}
          searchFieldList={searchFieldList}
        >{{
          'handle-buttons': () => <CipButton button-type="create" onClick={() => router.push({ name: 'configureServiceDesign' })}></CipButton>
        }}</CipPageCurd>
  }
}
