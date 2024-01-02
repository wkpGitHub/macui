import { reactive } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import CipTree from '@cip/components/cip-tree'
import { apiConfigService, centerService } from '@lc/api'

export function useFxDialog (proxyValue, proxyOtherValue) {
  const state = reactive({ isShow: false, item: {}, data: [] })

  function selectVar (item) {
    item.httpMethod = item.apiType === 'query' ? 'GET' : 'POST'
    state.item = item
  }

  function onConfirm (resolve, reject) {
    debugger
    if (state.item.id) {
      centerService.getContent(state.item.id).then(({ data }) => {
        const { inputParams, outParams } = data.flow || { inputParams: [], outParams: [] }
        proxyValue.value = state.item.name
        proxyOtherValue[0].value = {
          ...state.item,
          inputParams,
          outParams
        }
        resolve()
      }).catch(() => reject())
    } else {
      reject()
    }
  }

  function renderTreeItem ({ node, data }) {
    return <div style='display: flex;align-items: center;justify-content: space-between;' title={data.label} onClick={() => selectVar(data)}>
      <span>{data.label}</span>
    </div>
  }

  apiConfigService.tree({ }).then(({ data }) => {
    data.forEach(item => {
      item.label = item.name
      item.children?.forEach(c => {
        c.label = `${c.name}(${c.fullPath})`
      })
    })
    state.data = data
  })

  return {
    state,
    render () {
      return state.isShow && <CipDialog title={'选择内部接口'} model-value={true} onUpdate:modelValue={() => { state.isShow = false }} onConfirm={onConfirm} width="400px">
        <ElCard shadow="never">
          <CipTree
            style='width: 360px;'
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
