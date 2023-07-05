import { useRouter } from 'vue-router'
import CipPageCurd from '@cip/components/cip-page-curd'
import { appService } from '@/api/service/chr'
import { tableColumns, formFieldList, searchFieldList } from './config'
import CipButtonText from '@cip/components/cip-button-text'
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props, ctx) {
    const router = useRouter()
    const configure = ({ path }) => {
      const resolved = router.resolve({ name: 'configureFramework', params: { appPath: path } })
      window.open(resolved.href)
    }
    const preview = ({ path }) => {
      const resolved = router.resolve({ name: 'previewFramework', params: { appPath: path } })
      console.log(resolved)
      window.open(resolved.href)
    }

    return () => <CipPageCurd
      entity={appService}
      curdFn={{ createFn: 'appSave', updateFn: 'appSave' }}
      tableColumns={tableColumns}
      formFieldList={formFieldList}
      formLabelWidth={'110px'}
      tableHandleWidth={'150px'}
      searchFieldList={searchFieldList}
      itemType={'应用'}
    >
      {{
        'table-handle': ({ row, editItem, showItem, deleteItem }) => <>
          <CipButtonText onClick={() => configure(row)}>设计</CipButtonText>
          <CipButtonText onClick={() => preview(row)}>预览</CipButtonText>
          <CipButtonText onClick={() => showItem(row)}>查看</CipButtonText>
          <CipButtonText onClick={() => editItem(row)}>编辑</CipButtonText>
          <CipButtonText onClick={() => deleteItem(row, row.name)}>删除</CipButtonText>
        </>
      }}
    </CipPageCurd>
  }
})
