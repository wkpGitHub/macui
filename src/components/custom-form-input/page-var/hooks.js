import { reactive, computed } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
// import { ElTag } from 'element-plus'
import CipTree from '@cip/components/cip-tree'
import { getModuleTree } from '@lc/components/d-render-plugin-page-render/use-event-configure'

export function useFxDialog (proxyValue, proxyOtherValue, config, drDesign) {
  const state = reactive({ isShow: false, item: {} })

  function selectVar (item) {
    if (item.disabled) return
    state.item = item
  }

  function onConfirm (resolve) {
    if (state.item.name) {
      proxyValue.value = '${' + state.item.name + '}'
      proxyOtherValue[0].value = state.item.source
    }
    resolve()
  }

  function renderTreeItem ({ node, data }) {
    return <div style='display: flex;align-items: center;justify-content: space-between;' onClick={() => selectVar(data)}>
      <span>{data.title}</span>
      {/* <ElTag>{dateTypeMap.value[data.dataType].name}</ElTag> */}
    </div>
  }

  function getEventVars () {
    const children = []
    const currentItem = drDesign.path.at(-1)
    if (currentItem.config?.events) {
      Object.values(currentItem.config.events).forEach(e => {
        children.push({
          name: `${currentItem.key}_${e.type}`,
          title: '当前事件回调参数',
          disabled: e.args?.length,
          children: e.args?.map((arg, i) => ({
            name: `${currentItem.key}_${e.type}.${i}`,
            title: arg
          }))
        })
      })
    }
    function getModules (list) {
      list.forEach((item) => {
        if (item.config?.events) {
          Object.values(item.config.events).forEach(e => {
            children.push({
              name: `${item.key}_${e.type}`,
              title: `${item.config.label}_${e.label}`,
              disabled: e.args?.length,
              children: e.args?.map((arg, i) => ({
                name: `${item.key}_${e.type}.${i}`,
                title: arg
              }))
            })
          })
        }
        if (item.config?.options) {
          const _children = []
          item.config.options?.forEach(o => o.children && _children.push(...o.children))
          getModules(_children)
        }
      })
    }
    getModules(drDesign.schema?.list)
    return children
  }

  function getApiResults () {
    return (drDesign.schema?.apiList || []).filter(api => !api.isFileDown).map(api => ({
      title: api.name,
      name: api.objId
    }))
  }

  const varTreeOpts = computed(() => {
    return [
      {
        title: '外部变量',
        disabled: true,
        children: (drDesign.schema.variables || []).map(({ name }) => ({ name, title: name }))
      },
      {
        title: '事件动作',
        disabled: true,
        children: getEventVars()
      },
      {
        title: '接口返回数据',
        disabled: true,
        children: getApiResults()
      },
      {
        title: '组件',
        disabled: true,
        children: getModuleTree(true, drDesign)
      }
    ]
  })

  return {
    state,
    render () {
      return state.isShow && <CipDialog title={'选择变量'} model-value={true} onUpdate:modelValue={() => { state.isShow = false }} onConfirm={onConfirm} width="500px">
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
