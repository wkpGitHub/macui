import { reactive, computed } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import { ElTag } from 'element-plus'
import CipTree from '@cip/components/cip-tree'
import cipStore from '@cip/components/store'

export function useFxDialog (proxyValue, config) {
  const { parentState } = config
  const state = reactive({ isShow: false, item: {} })
  const dateTypeMap = computed(() => {
    return cipStore.state.dataType.reduce((total, current) => {
      total[current.id] = current
      return total
    }, {})
  })

  function selectVar (item) {
    state.item = item
  }

  function onConfirm (resolve) {
    const { selectNode } = parentState
    if (selectNode.type === 'set') {
      setTimeout(() => {
        if (selectNode.config) {
          selectNode.config.dataType = state.item.dataType
        } else {
          selectNode.config = { dataType: state.item.dataType }
        }
      }, 300)
    }
    config.onConfirm && config.onConfirm(state.item)
    proxyValue.value = state.item.value
    resolve()
  }

  const canSelectTarget = computed(() => {
    const targets = []
    console.log(parentState.selectNode)
    const { parent, index } = parentState.selectNode
    function cDeep (_children) {
      _children.forEach((n, i) => {
        const children = (n.config?.selectFields || n.config?.initFields || n.config?.updateFields || n.config?.dataFields || []).map(sel => ({
          label: sel.title,
          value: n.config.targetName + '.' + sel.name,
          dataType: sel.dataType
        }))
        if (n.config?.targetName && i < index) {
          targets.push({
            label: n.config.targetName,
            value: n.config.targetName,
            dataType: n.config.dataType || 'ENTITY',
            children
          })
        }
        if (n.children) cDeep(n.children)
      })
    }
    cDeep(parent.children)
    function deepAdd (parent) {
      if (parent.config?.targetName) {
        const children = (parent.config?.selectFields || []).map(sel => ({
          label: sel.title,
          value: sel.targetName,
          dataType: sel.dataType
        }))
        targets.push({ label: parent.config.title, value: parent.config.targetName, dataType: parent.config.dataType || 'ENTITY', children })
      }
      if (parent.type === 'loop') {
        targets.push({ label: (parent.config?.title || parent.title) + '字段名', value: parent.config?.loopItemName || '_item' })
        targets.push({ label: (parent.config?.title || parent.title) + '下标名', value: parent.config?.loopIndexName || '_index' })
      }
      if (parent.parent) deepAdd(parent.parent)
    }
    deepAdd(parent)
    return targets
  })

  function renderTreeItem ({ node, data }) {
    return <div style='display: flex;align-items: center;justify-content: space-between;' onClick={() => data.value && selectVar(data)}>
      <span>{data.label}</span>
      <ElTag>{dateTypeMap.value[data.dataType].name}</ElTag>
    </div>
  }

  const varTreeOpts = computed(() => {
    const { globalValue, inputParams } = parentState.rootNode
    return [
      {
        label: '全局变量',
        children: globalValue.map(item => ({ label: item.title, value: `global.${item.name}`, dataType: item.dataType }))
      },
      {
        label: '服务入参',
        children: inputParams.map(item => ({ label: item.title, value: `inputParams.${item.name}`, dataType: item.dataType }))
      },
      // {
      //   label: '服务出参',
      //   children: outParams.map(item => ({ label: item.title, value: `outParams.${item.name}`, dataType: item.dataType }))
      // },
      {
        label: '上下文',
        children: canSelectTarget.value
      },
      {
        label: '系统变量',
        children: []
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
              defaultExpandAll: false,
              renderItem: renderTreeItem
            }}
          >
          </CipTree>
        </ElCard>
      </CipDialog>
    }
  }
}
