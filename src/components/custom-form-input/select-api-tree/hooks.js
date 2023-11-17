import { reactive } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import CipTree from '@cip/components/cip-tree'
import { apiConfigService } from '@/api'

export function useFxDialog (proxyValue, proxyOtherValue) {
  const state = reactive({ isShow: false, item: {}, data: [] })

  function selectVar (item) {
    item.httpMethod = item.apiType === 'query' ? 'GET' : 'POST'
    state.item = item
  }

  function onConfirm (resolve) {
    if (state.item.name) {
      proxyValue.value = state.item.name
      proxyOtherValue[0].value = state.item
    }
    resolve()
  }

  function renderTreeItem ({ node, data }) {
    return <div style='display: flex;align-items: center;justify-content: space-between;' onClick={() => selectVar(data)}>
      <span>{data.fullPath}</span>
    </div>
  }

  apiConfigService.tree({ }).then(({ data }) => {
    data.forEach(item => {
      item.fullPath = item.name
    })
    state.data = data
  })

  return {
    state,
    render () {
      return state.isShow && <CipDialog title={'选择内部接口'} model-value={true} onUpdate:modelValue={() => { state.isShow = false }} onConfirm={onConfirm} width="400px">
        <ElCard shadow="never">
          <CipTree
            options={state.data}
            showButton={false}
            config={{
              highlightCurrent: true,
              // defaultExpandAll: false,
              renderItem: renderTreeItem
            }}
          >
          </CipTree>
        </ElCard>
      </CipDialog>
    }
  }
}