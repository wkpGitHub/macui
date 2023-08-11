import { reactive, computed, withModifiers } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import CipTabs from '@cip/components/cip-tabs-plus'
import CipTabPane from '@cip/components/cip-tabs-plus/tab'
import { ElTag } from 'element-plus'

export const dataTypeOpts = [
  {
    label: '文本',
    value: 'string'
  },
  {
    label: '数字',
    value: 'number'
  },
  {
    label: '布尔',
    value: 'boolean'
  },
  {
    label: '对象',
    value: 'object'
  },
  {
    label: '数组',
    value: 'array'
  }
]

const dateTypeMap = dataTypeOpts.reduce((total, current) => {
  total[current.value] = current
  return total
}, {})

export function useFxDialog (proxyValue, parentState) {
  const state = reactive({ isShow: false, item: {}, varType: '' })

  function selectVar (item, varType) {
    state.item = item
    state.varType = varType
  }

  function onConfirm (resolve) {
    const { selectNode } = parentState
    if (selectNode.type === 'set') {
      // Object.keys(fieldMap).forEach(key => {
      //   const value = fieldMap[key]
      //   if (key === 'label') selectNode[value] = state.varType + state.item[key]
      //   else selectNode[value] = state.item[key]
      // })
      proxyValue.value = state.varType + state.item.label
    } else {
      proxyValue.value = '${' + state.varType + state.item.label + '}'
    }
    resolve()
  }

  const canSelectTarget = computed(() => {
    const targets = []
    console.log(parentState.selectNode)
    const { parent, index } = parentState.selectNode
    parent.children.forEach((n, i) => {
      if (n.targetName && i < index) targets.push(n)
    })
    function deepAdd (parent) {
      if (parent.targetName) targets.push(parent)
      if (parent.parent) deepAdd(parent.parent)
    }
    deepAdd(parent)
    return targets
  })
  return {
    state,
    render () {
      return state.isShow && <CipDialog title={'选择变量'} model-value={true} onUpdate:modelValue={() => { state.isShow = false }} onConfirm={onConfirm}>
        <CipTabs model-value={0}>
          <CipTabPane label='全局变量' name={0}>
            <ul>
              {parentState.globalValue.map(item => <li style="cursor: pointer; margin: 4px" onClick={() => selectVar(item, 'global.')}>{item.label} <ElTag>{dateTypeMap[item.dataType].label}</ElTag></li>)}
            </ul>
          </CipTabPane>
          <CipTabPane label='节点变量' name={1}>
            <ul>
              {(canSelectTarget.value || []).map(item => <li style="cursor: pointer; margin: 4px" onClick={() => selectVar({ ...item, label: item.targetName, value: item.source }, '')}>
                {item.targetName}
                {item.selectFields ? <ul>{item.selectFields.map(sel => <li style="cursor: pointer; margin: 4px" onClick={withModifiers(() => selectVar({ ...item, label: `${item.targetName}.${sel.name}` }, ''), ['stop'])}>{sel.ename}<ElTag>{dateTypeMap[item.type].label}</ElTag></li>)}</ul> : <ElTag>{dateTypeMap[item.dataType].label}</ElTag>}
              </li>)}
            </ul>
          </CipTabPane>
          <CipTabPane label='服务入参' name={2}>
            <ul>
              {(parentState.rootNode.inputParams || []).map(item => <li style="cursor: pointer; margin: 4px" onClick={() => selectVar(item, 'inputParams.')}>{item.label} <ElTag>{dateTypeMap[item.dataType].label}</ElTag></li>)}
            </ul>
          </CipTabPane>
        </CipTabs>
      </CipDialog>
    }
  }
}
