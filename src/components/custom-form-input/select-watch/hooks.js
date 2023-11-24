import { reactive, computed } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
// import { ElTag } from 'element-plus'
import CipTree from '@cip/components/cip-tree'

export function useFxDialog (proxyValue, proxyOtherValue, config, drDesign) {
  const state = reactive({ isShow: false, item: {} })

  function selectVar (item) {
    if (item.disabled) return
    state.item = item
  }

  function onConfirm (resolve) {
    if (state.item.name) {
      proxyValue.value = state.item.elementId
    }
    resolve()
  }

  function renderTreeItem ({ node, data }) {
    return <div style='display: flex;align-items: center;justify-content: space-between;' onClick={() => selectVar(data)}>
      <span>{data.name}</span>
      {/* <ElTag>{dateTypeMap.value[data.dataType].name}</ElTag> */}
    </div>
  }

  const varTreeOpts = computed(() => {
    const _list = []
    function getApis (list = []) {
      list.forEach(item => {
        if (item.config?.api) {
          _list.push({
            name: item.config.label,
            children: item.config.api.inputParams
          })
        }
        if (item.config?.options) {
          const _children = []
          item.config.options?.forEach(o => o.children && _children.push(...o.children))
          getApis(_children)
        }
      })
    }
    getApis(drDesign.schema?.list)
    return _list
  })

  return {
    state,
    render () {
      return state.isShow && <CipDialog title={'选择展示块作用字段'} model-value={true} onUpdate:modelValue={() => { state.isShow = false }} onConfirm={onConfirm} width="500px">
        <ElCard shadow="never">
          <CipTree
            options={varTreeOpts.value}
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
