import { defineComponent, ref, reactive, onMounted, nextTick, provide } from 'vue'
import { ElInputNumber, ElLink, ElMessageBox } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import { PlHandle as CipPageLayoutHandle } from '@cip/page-layout'
import CipButton from '@cip/components/cip-button'
import CipSvgIcon from '@cip/components/cip-svg-icon'
import {
  useDialog,
  useGlobalSet,
  PseudoCodeDialog,
  CompList,
  useNodeSetDialog,
  useSourceCode,
  transformCode
} from './dialog'

import styles from './index.module.less'
import './ausyda.css'
import { Ausyda, initFlow } from './ausyda.js'
import { centerService } from '@lc/api'

export default defineComponent({
  props: {
    id: String
  },
  setup (props, ctx) {
    let au
    let selectLink = null
    let isBranch = false
    const zoom = ref(100)
    const state = reactive({
      rootNode: {},
      selectNode: {},
      title: ''
    })
    provide('parentState', state)
    let currentData = {}
    const pseudoCodeDialogVisible = ref(false)
    const compListDialogVisible = ref(false)

    const { showRightPanel, dialogBaseProps } = useDialog()
    const { state: globalState, render: renderGlobalSet } = useGlobalSet(props, state)
    const { state: nodeSetState, render: renderNodeSetDialog } = useNodeSetDialog(props, state, ctx)
    const { state: sourceCodeState, render: renderSourceCode } = useSourceCode(props, state)

    function hiddenDialog () {
      globalState.isShow = false
      nodeSetState.isShow = false
      sourceCodeState.isShow = false
      compListDialogVisible.value = false
      pseudoCodeDialogVisible.value = false
    }

    function addNode (comp) {
      if (isBranch) {
        au.addBranch({ ...comp }, selectLink)
      } else {
        au.addNode({ ...comp }, selectLink)
      }
      // au.addBranch({ id: Math.random().toString(16).slice(2), type: index % 2 ? 'http' : 'exit', children: [], title: 'http请求' }, parent)
      compListDialogVisible.value = false
      showRightPanel.value = false
      selectLink = null
    }
    function updateConfig (config) {
      state.selectNode.config = config
      au.updateNode(state.selectNode)
    }
    function sleep () {
      return new Promise(resolve => {
        setTimeout(resolve, 400)
      })
    }
    onMounted(async () => {
      await sleep()
      centerService.getContent(props.id).then(({ data }) => {
        currentData = data
        state.title = `${data.name}(${data.fullPath})`
        if (data.flow) {
          state.rootNode = data.flow
        } else {
          state.rootNode = initFlow
        }
        au = new Ausyda({
          el: '#api-editor',
          data: state.rootNode
        })
        // 点击连接线上的+
        au.on('addNode', (link) => {
          // 添加节点
          selectLink = link
          isBranch = false
          hiddenDialog()
          // 打开组件面板
          compListDialogVisible.value = true
        })
        // 点击选中节点
        au.on('updateNode', (d) => {
          // 更新节点
          state.selectNode = {}
          d.isBranch = false
          state.selectNode = d
          hiddenDialog()
          nextTick(() => {
            nodeSetState.isShow = true
          })
        })
        // 点击分支+，增加分支
        au.on('addBranch', (parent) => {
          // 添加节点
          isBranch = true
          selectLink = parent
          hiddenDialog()
          // 打开组件面板
          compListDialogVisible.value = true
        })
        // 点击分支文字或者线段，修改分支
        au.on('updateBranch', (branch) => {
          // 更新分支
          // au.updateBranch({ ...branch, expression: '分支新名称' })
          state.selectNode = {}
          branch.isBranch = true
          state.selectNode = branch
          hiddenDialog()
          nodeSetState.isShow = true
        })
        // 点击节点删除按钮
        au.on('deleteNode', (d, cb) => {
          ElMessageBox.confirm(`确认删除${d.title}？`, '提示', { type: 'warning' }).then(() => cb())
        })
        au.on('scale', (ratio) => {
          zoom.value = Math.floor(ratio * 100)
        })
      })
    })

    function saveFlow () {
      centerService.saveContent({
        ...currentData,
        flow: transformCode(state.rootNode)
      })
    }

    return () => <CipPageLayoutHandle top={true} title={state.title}>
      {{
        handler: () => <>
          <CipButton onClick={() => { sourceCodeState.isShow = true }}>源码</CipButton>
          <CipButton onClick={() => { pseudoCodeDialogVisible.value = true }}>伪代码</CipButton>
          <CipButton>调试</CipButton>
          <CipButton type='primary' onClick={saveFlow}>保存</CipButton>
        </>,
        default: () => <div className={styles.page}>
          <div className={styles.editor}>
            <div className={styles['editor-view']}>
              <div className={styles['view-toolbar']}>
                <ElLink icon={Setting} underline={false} type='primary' onClick={() => {
                  hiddenDialog()
                  globalState.isShow = true
                }}>全局设置</ElLink>
                <div className={styles['flex-center']}>
                  <CipButton square size="small" icon={<CipSvgIcon name="focus-icon" />} style={{ marginRight: '5px' }} onClick={() => au.coverScreen()}>
                  </CipButton>
                  <ElInputNumber size='small' model-value={zoom.value} min={50} max={400} step={10} onUpdate:model-value={v => au.scale(v / 100)}></ElInputNumber>
                </div>
              </div>
              <div className={styles['view-container']} id="api-editor"></div>
            </div>
            <div className={[styles['right-panel'], showRightPanel.value ? styles['right-panel-opened'] : '']}>
              {/* 全局设置 */}
              {renderGlobalSet({ dialogBaseProps })}
              <PseudoCodeDialog {...dialogBaseProps} v-model={pseudoCodeDialogVisible.value}/>
              {renderSourceCode({ dialogBaseProps })}
              {/* 活动节点 */}
              <CompList {...dialogBaseProps} v-model={compListDialogVisible.value} onClickComp={addNode}/>
              {/* 编辑节点 */}
              {renderNodeSetDialog({ dialogBaseProps, node: state.selectNode, updateConfig })}
            </div>
          </div>
        </div>
      }}

    </CipPageLayoutHandle>
  }
})
