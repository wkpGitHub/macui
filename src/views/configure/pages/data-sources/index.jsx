import { ref, watch } from 'vue'
import { PlLeftRight as CipPageLayoutLeftRight } from '@cip/page-layout'
import CipPageCurd from '@cip/components/cip-page-curd'
import { CipButtonText } from '@xdp/button'
import PageTree from './page-tree'
import { dataInfoService } from '@/api'
import {
  tableColumns,
  formFieldList,
  searchFieldList
} from './config'
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
  setup (props, ctx) {
    const currentDataModel = ref({})

    const curdRef = ref()
    watch(() => currentDataModel.value, (n) => {
      if (n) {
        curdRef.value.getItemList()
      }
    })
    const outParams = computed(() => {
      return {
        dbId: currentDataModel.value,
        type: 'entity'
      }
    })

    const router = useRouter()
    function goToDetail (row) {
      router.push({
        name: 'configureDataSourcesDetail',
        params: {
          id: row.id
        }
      })
    }

    return () => <CipPageLayoutLeftRight>
      {{
        left: () => <PageTree v-model={currentDataModel.value} type="entity" />,
        default: () => <>
          {currentDataModel.value && <CipPageCurd
            ref={curdRef}
            entity={dataInfoService}
            curdFn={{
              createFn: 'infoSave',
              updateFn: 'infoSave',
              pageFn: 'infoList'
            }}
            outParams={outParams.value}
            tableColumns={tableColumns}
            formFieldList={formFieldList}
            formLabelWidth={'110px'}
            itemType={'实体'}
            simpleSearchModel
            searchFieldList={searchFieldList}
            permission={{ info: 'no' }}
            dialogSize='mini'
          >
            {{
              'table-handle-prepend': ({ row }) => <>
                <CipButtonText onClick={() => { goToDetail(row) }}>详情</CipButtonText>
              </>
            }}
          </CipPageCurd>}
        </>
      }}
    </CipPageLayoutLeftRight>
  }
}
