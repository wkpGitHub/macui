import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { PlLeftRight as CipPageLayoutLeftRight } from '@cip/page-layout'
import CateTree from './cate-tree'
import CipPageCurd from '@cip/components/cip-page-curd'
import { apiConfigService } from '@/api/service/chr'
import CipButton from '@cip/components/cip-button'
import CipButtonText from '@cip/components/cip-button-text'
import { tableColumns, searchFieldList, formFieldList } from './config'

const itemTypeMap = {
  entity: 'API',
  flow: '服务编排'
}

export default {
  setup (props, ctx) {
    const router = useRouter()
    // 选中左侧树 右侧列表展示对应信息
    const currentNode = ref({})
    const curd$ = ref()
    function refreshTable () {
      curd$.value?.getItemList()
    }
    // 服务编排
    function createServe (id) {
      router.push({ name: 'configureServiceDesign', query: { id } })
    }

    const itemType = ref('API')
    function handleCommand (cmd, createItem) {
      itemType.value = itemTypeMap[cmd]
      createItem({
        pid: currentNode.value.id,
        devMode: cmd
      })
    }

    return () => <CipPageLayoutLeftRight>
        {{
          left: () => <div style={'height: 100%; box-sizing: border-box; padding: 0 24px;'} >
            <CateTree onCurrentNodeChange={(val) => { currentNode.value = val; refreshTable() }}></CateTree>
          </div>,
          default: () => <CipPageCurd
            autoSelected={true}
            ref={curd$}
            outParams={{ pid: currentNode.value.id, isApi: currentNode.value.isApi }}
            searchFieldList={searchFieldList}
            entity={apiConfigService}
            curdFn={{ pageFn: 'list', deleteFn: 'configDel', createFn: 'save', updateFn: 'save' }}
            tableColumns={tableColumns}
            formFieldList={formFieldList}
            withCreate={false}
            dialogSize={'small'}
            itemType={itemType.value}
            tableHandleWidth={'170px'}
          >
            {{
              'handle-buttons': ({ createItem }) => <>
                <ElDropdown trigger={'click'} onCommand={(cmd) => handleCommand(cmd, createItem)}>
                  {{
                    default: () => <CipButton buttonType={'create'}/>,
                    dropdown: () => <ElDropdownMenu>
                      <ElDropdownItem command='entity'>API</ElDropdownItem>
                      <ElDropdownItem command='flow'>服务编排</ElDropdownItem>
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
