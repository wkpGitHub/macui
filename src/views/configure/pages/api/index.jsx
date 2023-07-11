import { useRouter } from 'vue-router'
import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from 'element-plus'
import CipPageLayoutLeftRight from '@cip/components/page-layout/left-right'
import CateTree from './cate-tree'
import CipPageCurd from '@cip/components/cip-page-curd'
import { apiConfigService } from '@/api/service/chr'
import CipButton from '@cip/components/cip-button'
import CipButtonText from '@cip/components/cip-button-text'
import { tableColumns, searchFieldList } from './config'
import { ref } from 'vue'
export default {
  setup (props, ctx) {
    const router = useRouter()

    function createApi () {

    }

    function createServe (id) {
      router.push({ name: 'configureServiceDesign', query: { id } })
    }

    function handleCommand (cmd) {
      ({
        api: createApi,
        serve: createServe
      })[cmd]()
    }
    const cateId = ref()
    const curd$ = ref()
    function refreshTable () {
      curd$.value?.getItemList()
    }
    return () => <CipPageLayoutLeftRight>
        {{
          left: () => <div style={'height: 100%; box-sizing: border-box; padding: 0 24px;'} >
            <CateTree v-model={cateId.value} onCateChange={refreshTable}></CateTree>
          </div>,
          default: () => <CipPageCurd
            autoSelected={true}
            ref={curd$}
            outParams={{ cateId: cateId.value }}
            searchFieldList={searchFieldList}
            entity={apiConfigService}
            curdFn={{ pageFn: 'list', deleteFn: 'configDel' }}
            tableColumns={tableColumns}
            withCreate={false}
            tableHandleWidth={'170px'}
          >
            {{
              'handle-buttons': () => <>
                <ElDropdown trigger={'click'} onCommand={handleCommand}>
                  {{
                    default: () => <CipButton buttonType={'create'}/>,
                    dropdown: () => <ElDropdownMenu>
                      <ElDropdownItem command='api'>API</ElDropdownItem>
                      <ElDropdownItem command='serve'>服务编排</ElDropdownItem>
                    </ElDropdownMenu>
                  }}
                </ElDropdown>
              </>,
              'table-handle': ({ row, deleteItem, editItem }) => <>
                <CipButtonText onClick={() => editItem(row)}>编辑</CipButtonText>
                {row.devMode === 'flow' && <CipButtonText onClick={() => createServe(row.id)}>服务编排</CipButtonText>}
                <CipButtonText onClick={() => deleteItem(row)}>删除</CipButtonText>
              </>
            }}
          </CipPageCurd>
        }}
      </CipPageLayoutLeftRight>
  }
}
