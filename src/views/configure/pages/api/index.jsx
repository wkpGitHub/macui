import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { PlLeftRight as CipPageLayoutLeftRight } from '@cip/page-layout'
import CateTree from './cate-tree'
import CipPageCurd from '@cip/components/cip-page-curd'
import { apiConfigService } from '@lc/api/service/chr'
import CipButton from '@cip/components/cip-button'
import CipButtonText from '@cip/components/cip-button-text'
import { usePage } from './config'

const itemTypeMap = {
  entity: 'API',
  flow: '服务编排'
}

export default {
  setup (props, ctx) {
    const { tableColumns, searchFieldList, formFieldList } = usePage()
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

    function configServe ({ id }) {
      router.push({ name: 'serviceConfig', query: { id } })
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
            searchFieldList={searchFieldList.value}
            entity={apiConfigService}
            curdFn={{ pageFn: 'list', deleteFn: 'configDel', createFn: 'save', updateFn: 'save' }}
            tableColumns={tableColumns.value}
            formFieldList={formFieldList.value}
            withCreate={false}
            dialogSize={'small'}
            itemType={itemType.value}
            tableHandleWidth={'140px'}
            formLabelWidth={'100px'}
          >
            {{
              'handle-buttons': ({ createItem }) => <>
                <ElDropdown trigger={'click'} onCommand={(cmd) => handleCommand(cmd, createItem)}>
                  {{
                    default: () => <CipButton buttonType={'create'}/>,
                    dropdown: () => <ElDropdownMenu>
                      <ElDropdownItem command='entity'>API</ElDropdownItem>
                      <ElDropdownItem command='flow'>编排</ElDropdownItem>
                    </ElDropdownMenu>
                  }}
                </ElDropdown>
              </>,
              'table-handle': ({ row, deleteItem, editItem }) => <>
                <CipButtonText onClick={() => editItem(row)}>编辑</CipButtonText>
                {row.devMode === 'flow' && <CipButtonText onClick={() => createServe(row.id)}>编排</CipButtonText>}
                {['entity', 'sql'].includes(row.devMode) && <CipButtonText onClick={() => configServe(row)}>配置</CipButtonText>}
                <CipButtonText onClick={() => deleteItem(row)}>删除</CipButtonText>
              </>
            }}
          </CipPageCurd>
        }}
      </CipPageLayoutLeftRight>
  }
}
