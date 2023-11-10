import { reactive, computed } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
// import { ElTag } from 'element-plus'
import CipTree from '@cip/components/cip-tree'

export function useFxDialog (proxyValue, config, drDesign) {
  const state = reactive({ isShow: false, item: {} })

  function selectVar (item) {
    state.item = item
  }

  function onConfirm (resolve) {
    proxyValue.value = '${' + state.item.name + '}'
    resolve()
  }

  function renderTreeItem ({ node, data }) {
    return <div style='display: flex;align-items: center;justify-content: space-between;' onClick={() => selectVar(data)}>
      <span>{data.title}</span>
      {/* <ElTag>{dateTypeMap.value[data.dataType].name}</ElTag> */}
    </div>
  }

  function getEventVars (list) {
    const children = []
    function getModules (list) {
      // eslint-disable-next-line array-callback-return
      list.forEach((item) => {
        if (item.config?.events) {
          Object.values(item.config.events).forEach(e => {
            children.push({
              name: `${item.key}_${e.type}`,
              title: `${item.key}_${e.label}`
            })
          })
        }
        if (item.config?.options) {
          const _children = []
          item.config.options?.forEach(o => _children.push(...o.children))
          getModules(_children)
        }
      })
    }
    getModules(drDesign.schema?.list)
    return children
  }

  function getApiResults () {
    return (drDesign.schema?.apiList || []).map(api => ({
      title: api.name,
      name: api.objId
    }))
  }

  const varTreeOpts = computed(() => {
    return [
      {
        title: '自定义变量',
        children: drDesign.schema.variables
      },
      {
        title: '事件动作',
        children: getEventVars()
      },
      {
        title: '接口返回数据',
        children: getApiResults()
      }
    ]
  })

  return {
    state,
    render () {
      return state.isShow && <CipDialog title={'选择变量'} model-value={true} onUpdate:modelValue={() => { state.isShow = false }} onConfirm={onConfirm} width="400px">
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
