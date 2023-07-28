import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PlLeftRight as CipPageLayoutLeftRight } from '@cip/page-layout'
import CateTree from './cate-tree'
import CipPageCurd from '@cip/components/cip-page-curd'
import { apiConfigService } from '@/api/service/chr'
import CipButtonText from '@cip/components/cip-button-text'
import { tableColumns, searchFieldList, formFieldList } from './config'

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
    function designFlow (id) {
      router.push({ name: 'configureFlowDesign', query: { id } })
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
            dialogSize={'small'}
            itemType="流程"
            formLabelWidth="80px"
            tableHandleWidth={'170px'}
          >
            {{
              'table-handle': ({ row, deleteItem, editItem }) => <>
                <CipButtonText onClick={() => editItem(row)}>编辑</CipButtonText>
                <CipButtonText onClick={() => designFlow(row.id)}>流程设计</CipButtonText>
                <CipButtonText onClick={() => deleteItem(row)}>删除</CipButtonText>
              </>
            }}
          </CipPageCurd>
        }}
      </CipPageLayoutLeftRight>
  }
}
