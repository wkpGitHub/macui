import CipPageCurd from '@cip/components/cip-page-curd'
import CipPageLayoutLeftRight from '@cip/components/page-layout/left-right'
import { dataInfoService } from '@/api/service/chr'
import { tableColumns, formFieldList, searchFieldList } from './config'
import CipButton from '@cip/components/cip-button'
import { ref, computed, onMounted } from 'vue'
import CipButtonText from '@cip/components/cip-button-text'
import EnumList from './wigets/enum-list'
export default {
  setup (props, ctx) {
    const enumList = ref([])

    const currentEnum = ref({})
    const getEnumList = () => {
      dataInfoService.infoList({ type: 'dic' }).then(res => {
        enumList.value = res.data
        currentEnum.value = res.data[0]
        refreshData()
      })
    }

    const refreshData = () => {
      curd$.value.getTableList()
    }
    const outParams = computed(() => ({ }))
    const curd$ = ref()
    // const router = useRouter()
    const id = ref()

    onMounted(() => {
      getEnumList()
    })
    return () => <CipPageLayoutLeftRight
      leftStyle={{ width: '200px' }}
    >
      {{
        left: () => <EnumList
          list={enumList.value}
          v-model={currentEnum.value}
          onUpdate:modelValue={() => refreshData()}
        />,
        default: () => <CipPageCurd
          ref={curd$}
          outParams={outParams.value}
          entity={ dataInfoService }
          curdFn={{ pageFn: 'list', createFn: 'save', updateFn: 'save' }}
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
      }}

    </CipPageLayoutLeftRight>
  }
}
