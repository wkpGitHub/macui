import { ref, reactive, onBeforeMount } from 'vue'
import styles from '../index.module.less'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'
import { allComps } from '../comps'
import { cloneDeep } from '@cip/utils/util'
import { ElCollapse, ElCollapseItem } from 'element-plus'

import { getFieldList } from './config'

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
  const state = reactive({
    isShow: false,
    activeNames: ['global', 'input', 'output']
  })

  return {
    state,
    render ({ dialogBaseProps }) {
      return state.isShow && <CipDialog {...dialogBaseProps} title={'全局设置'} model-value={true} onUpdate:modelValue={() => { state.isShow = false }}>
        <ElCollapse v-model={state.activeNames}>
          <ElCollapseItem title="全局变量" name="global">
            <CipForm v-model:model={parentState.rootNode} fieldList={getFieldList('globalValue', parentState.rootNode)}></CipForm>
          </ElCollapseItem>
          <ElCollapseItem title="服务入参" name="input">
            <CipForm v-model:model={parentState.rootNode} fieldList={getFieldList('inputParams', parentState.rootNode)}></CipForm>
          </ElCollapseItem>
          <ElCollapseItem title="服务出参" name="output">
            <CipForm v-model:model={parentState.rootNode} fieldList={getFieldList('outParams', parentState.rootNode)}></CipForm>
          </ElCollapseItem>
        </ElCollapse>
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
  function setNode (node, updateConfig) {
    console.log('setnode===========')
    model.value = cloneDeep(node.config || {})
    activeComp.value = allComps.find(comp => comp.type === node.type || (comp.type === 'branch-line' && node.isBranch))
    if (activeComp.value.formField instanceof Function) {
      activeComp.value.formField = activeComp.value.formField({ parentState })
    }
    // eslint-disable-next-line array-callback-return
    activeComp.value.formField.map(v => {
      v.config.parentState = parentState
      v.config.changeEffect = async (value, key, data) => {
        debugger
        // 更新
        // if (timer) {
        //   clearTimeout(timer)
        //   timer = null
        // }
        // timer = setTimeout(() => {
        const _data = data ? { ...data } : {}
        _data[key] = value
        updateConfig(_data)
        // }, 1000)
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
    render ({ dialogBaseProps, node, updateConfig }) {
      state.isShow && setNode(node, updateConfig)
      return state.isShow && <CipDialog {...dialogBaseProps} title={activeComp.value.title} model-value={true} onUpdate:modelValue={() => { state.isShow = false }}>
      <CipForm labelWidth={activeComp.value.labelWidth || '90px'} v-model:model={model.value} fieldList={activeComp.value.formField}></CipForm>
    </CipDialog>
    }
  }
}

export function useSourceCode (props, parentState) {
  const state = reactive({ isShow: false })

  return {
    state,
    render ({ dialogBaseProps }) {
      const codeData = transformCode(parentState.rootNode)
      const codeStr = JSON.stringify(codeData, null, 2)
      return state.isShow && <CipDialog {...dialogBaseProps} title="源码" model-value={true} onUpdate:modelValue={() => { state.isShow = false }}>
      <pre>
        <code>
          {codeStr}
        </code>
      </pre>
    </CipDialog>
    }
  }
}

export function transformCode (data) {
  const codeData = cloneDeep(data)

  function deepTransform (codeData) {
    delete codeData.active
    delete codeData.branchWidth
    delete codeData.depth
    delete codeData.height
    delete codeData.index
    delete codeData.isBranch
    delete codeData.left
    delete codeData.top
    delete codeData.validateFailed
    delete codeData.width
    delete codeData.parent
        codeData.children?.forEach(child => deepTransform(child))
  }
  deepTransform(codeData)
  return codeData
}
