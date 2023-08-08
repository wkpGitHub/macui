import { ref, reactive, onBeforeMount, computed, withModifiers } from 'vue'
import styles from '../index.module.less'
import CipDialog from '@cip/components/cip-dialog'
import { CipTable, CipForm } from 'd-render'
import CipButton from '@cip/components/cip-button'
import CipTabs from '@cip/components/cip-tabs-plus'
import CipTabPane from '@cip/components/cip-tabs-plus/tab'
import { allComps } from '../comps'
import { cloneDeep } from '@cip/utils/util'
import { ElTag } from 'element-plus'
import { dataTypeOpts, dataTypeTableColumns } from './config'

const dateTypeMap = dataTypeOpts.reduce((total, current) => {
  total[current.value] = current
  return total
}, {})

export function useDialog () {
  const showRightPanel = ref(false)
  const dialogBaseProps = {
    customClass: [styles.drawer, 'cip-drawer'],
    modalClass: styles['drawer-modal'],
    dialogType: 'drawer',
    modal: false,
    showOnly: true,
    onOpened: () => { showRightPanel.value = true },
    onClose: () => { showRightPanel.value = false }
  }
  return {
    showRightPanel,
    dialogBaseProps
  }
}

export function useGlobalSet (props, parentState) {
  function addRow () {
    parentState.globalValue.push({ label: '', value: '', dataType: 'string' })
  }

  const state = reactive({ isShow: false })

  return {
    state,
    render ({ dialogBaseProps }) {
      return state.isShow && <CipDialog {...dialogBaseProps} title={'全局设置'} model-value={true} onUpdate:modelValue={() => { state.isShow = false }}>
        <CipTable data={parentState.globalValue} columns={dataTypeTableColumns}></CipTable>
        <CipButton button-type="create" style="width: 100%; margin-top: 4px" type="default" onClick={addRow}></CipButton>
      </CipDialog>
    }
  }
}

export function useFxDialog (props, parentState) {
  const state = reactive({ isShow: false, item: {}, varType: '' })

  function selectVar (item, varType) {
    state.item = item
    state.varType = varType
  }

  function onConfirm (resolve) {
    const { fieldMap, selectNode } = parentState
    if (selectNode.type === 'set') {
      Object.keys(fieldMap).forEach(key => {
        const value = fieldMap[key]
        if (key === 'label') selectNode[value] = state.varType + state.item[key]
        else selectNode[value] = state.item[key]
      })
    } else {
      let currentMemoO = selectNode
      const keys = fieldMap.keys.split('.')
      keys.forEach((k, i) => {
        if (i < keys.length - 1) {
          currentMemoO = currentMemoO[k]
        } else {
          // eslint-disable-next-line no-undef
          currentMemoO[k] = '${' + state.varType + state.item.label + '}'
        }
      })
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
                { item.selectFields ? <ul>{item.selectFields.map(sel => <li style="cursor: pointer; margin: 4px" onClick={withModifiers(() => selectVar({ ...item, label: `${item.targetName}.${sel.name}` }, ''), ['stop'])}>{sel.ename}<ElTag>{dateTypeMap[item.type].label}</ElTag></li>)}</ul> : <ElTag>{dateTypeMap[item.dataType].label}</ElTag>}
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

export function useNodeSetDialog (props, parentState) {
  const state = reactive({ isShow: false })
  const activeComp = ref({
    title: '',
    formField: []
  })

  let timer = null
  const model = ref({})
  function setNode (node, updateNode, showFx) {
    model.value = cloneDeep(node)
    activeComp.value = allComps.find(comp => comp.type === node.type || (comp.type === 'branch-line' && node.isBranch))
    if (activeComp.value.formField instanceof Function) {
      activeComp.value.formField = activeComp.value.formField({ showFx })
    }
    // eslint-disable-next-line array-callback-return
    activeComp.value.formField.map(v => {
      v.config.changeEffect = async (value, key, model) => {
        // 更新
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        timer = setTimeout(() => {
          updateNode(cloneDeep(model))
        }, 500)
      }
    })
  }

  onBeforeMount(() => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  })
  return {
    state,
    render ({ dialogBaseProps, node, updateNode, showFx }) {
      state.isShow && setNode(node, updateNode, showFx)
      return state.isShow && <CipDialog {...dialogBaseProps} title={activeComp.value.title} model-value={true} onUpdate:modelValue={() => { state.isShow = false }}>
      <CipForm labelWidth={activeComp.value.labelWidth || '90px'} v-model:model={model.value} onUpdate:model={v => console.log(v)} fieldList={activeComp.value.formField}></CipForm>
    </CipDialog>
    }
  }
}
