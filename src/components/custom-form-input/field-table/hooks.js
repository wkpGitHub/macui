import { reactive, computed, ref } from 'vue'
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
  const treeRef = ref()

  function onConfirm (resolve) {
    const ns = treeRef.value.tree.getCheckedNodes(true)
    const v = (ns || []).map(({ label, value, dataType }) => ({ title: label, name: value, dataType }))
    if (proxyValue.value?.length) {
      proxyValue.value.push(...v)
    } else {
      proxyValue.value = v
    }
    resolve()
  }

  const canSelectTarget = computed(() => {
    const targets = []
    console.log(parentState.selectNode)
    const { parent, index } = parentState.selectNode
    parent.children.forEach((n, i) => {
      const children = (n.config?.selectFields || n.config?.initFields || []).map(sel => ({
        label: sel.title,
        value: sel.name,
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
    })
    function deepAdd (parent) {
      if (parent.config?.targetName) {
        const children = (parent.config?.selectFields || []).map(sel => ({
          label: sel.title,
          value: sel.targetName,
          dataType: sel.dataType
        }))
        targets.push({ label: parent.config.title, value: parent.config.targetName, dataType: parent.config.dataType || 'ENTITY', children })
      }
      if (parent.parent) deepAdd(parent.parent)
    }
    deepAdd(parent)
    return targets
  })

  function renderTreeItem ({ node, data }) {
    return <div style='display: flex;align-items: center;justify-content: space-between;'>
      <span>{data.label}</span>
      <ElTag>{dateTypeMap.value[data.dataType].name}</ElTag>
    </div>
  }

  const varTreeOpts = computed(() => {
    const { globalValue, inputParams, outParams } = parentState.rootNode
    return [
      {
        label: '全局变量',
        children: globalValue.map(item => ({ label: item.title, value: `${item.name}`, dataType: item.dataType }))
      },
      {
        label: '服务入参',
        children: inputParams.map(item => ({ label: item.title, value: `${item.name}`, dataType: item.dataType }))
      },
      {
        label: '服务出参',
        children: outParams.map(item => ({ label: item.title, value: `${item.name}`, dataType: item.dataType }))
      },
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
      return state.isShow && <CipDialog title={'选择变量'} model-value={true} onUpdate:modelValue={() => { state.isShow = false }} onConfirm={onConfirm} width="400px">
        <ElCard shadow="never">
          <CipTree
            ref={treeRef}
            options={varTreeOpts.value}
            showButton={false}
            config={{
              showCheckbox: true,
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
