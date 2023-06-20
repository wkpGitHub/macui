import CipPageCurd from '@cip/components/cip-page-curd'
import CipPageLayoutLeftRight from '@cip/components/page-layout/left-right'
import { dataInfoService, dbInfoService } from '@/api/service/chr'
import { tableColumns, formFieldList, searchFieldList } from './config'
import CipButton from '@cip/components/cip-button'
import { ref, computed, onMounted } from 'vue'
import Save from './save'
import CipButtonText from '@cip/components/cip-button-text'
import DbList from './wigets/db-list'
export default {
  setup (props, ctx) {
    const dbList = ref([])
    const refreshData = () => {
      curd$.value.getTableList()
    }
    const getDbList = () => {
      dbInfoService.list({}).then(res => {
        dbList.value = res.data
        currentDb.value = res.data[0]
        refreshData()
      })
    }
    const currentDb = ref({})
    const outParams = computed(() => ({ dbId: currentDb.value.id, type: 'entity' }))
    const curd$ = ref()
    // const router = useRouter()
    const isSaveMode = ref(false)
    const id = ref()
    const toList = () => {
      isSaveMode.value = false
    }
    const toCreate = () => {
      id.value = undefined
      isSaveMode.value = true
    }
    const toUpdate = (row) => {
      id.value = row.id
      isSaveMode.value = true
    }
    const handleSuccess = () => {
      toList()
      refreshData()
    }
    onMounted(() => {
      getDbList()
    })
    return () => <CipPageLayoutLeftRight
      leftStyle={{ width: '200px' }}
      rightStyle={{ background: isSaveMode.value ? 'var(--cip-main-bg)' : undefined }}>
      {{
        left: () => <DbList
          disabled={isSaveMode.value}
          list={dbList.value}
          v-model={currentDb.value}
          onUpdate:modelValue={() => refreshData()}
        />,
        default: () => <>
        <CipPageCurd
          v-show={!isSaveMode.value}
          ref={curd$}
          outParams={outParams.value}
          entity={ dataInfoService }
          curdFn={{ pageFn: 'infoList', createFn: 'save', updateFn: 'save' }}
          tableColumns={tableColumns}
          formFieldList={formFieldList}
          formGrid={2}
          formLabelWidth={'110px'}
          searchFieldList={searchFieldList}
          withPagination={false}
          withCreate={false}
          autoSelected={true}
          itemType={'实体'}
          >
            {{
              'handle-buttons': () => <CipButton buttonType={'create'} onClick={toCreate} />,
              'table-handle': ({ row, deleteItem }) => <>
                <CipButtonText buttonType={'create'} onClick={() => toUpdate(row)} >编辑</CipButtonText>
                <CipButtonText buttonType={'create'} onClick={() => deleteItem(row, row.name)} >删除</CipButtonText>
              </>
            }}
          </CipPageCurd>
        {isSaveMode.value && <Save
          dbId={currentDb.value.id}
          id={id.value}
          onCancel={() => { toList() }}
          onSuccess={() => handleSuccess()}
        />}
        </>

      }}

    </CipPageLayoutLeftRight>
  }
}
