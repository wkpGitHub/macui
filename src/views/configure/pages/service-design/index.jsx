import { defineComponent, ref, reactive, onMounted } from 'vue'
import { ElInputNumber, ElLink } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import { PlHandle as CipPageLayoutHandle } from '@cip/page-layout'
import CipButton from '@cip/components/cip-button'
import {
  useDialog,
  useGlobalSet,
  PseudoCodeDialog,
  CompList,
  useNodeSetDialog,
  useSourceCode
} from './dialog'

import styles from './index.module.less'
import './ausyda.css'
import * as d3 from 'd3'
import { Ausyda } from './ausyda.js'
import { run } from './mock'

export default defineComponent({
  setup (props, ctx) {
    let au
    let selectLink = null
    let isBranch = false
    const zoom = ref(100)
    const state = reactive({
      rootNode: {},
      selectNode: {}
    })
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
    function updateNode (model) {
      au.updateNode(model)
    }
    function sleep () {
      return new Promise(resolve => {
        setTimeout(resolve, 400)
      })
    }
    onMounted(async () => {
      await sleep()
      d3.json('../../ausyda.json').then(data => {
        run(data.children)
        state.rootNode = data
        au = new Ausyda({
          el: '#api-editor',
          data
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
          nodeSetState.isShow = true
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
          alert(d.title)
          // 执行回调函数删除节点
          cb()
        })
      })
    })

    return () => <CipPageLayoutHandle top={true}>
      {{
        handler: () => <>
          <CipButton onClick={() => { sourceCodeState.isShow = true }}>源码</CipButton>
          <CipButton onClick={() => { pseudoCodeDialogVisible.value = true }}>伪代码</CipButton>
          <CipButton>调试</CipButton>
          <CipButton type='primary'>保存</CipButton>
        </>,
        default: () => <div className={styles.page}>
          <div className={styles.editor}>
            <div className={styles['editor-view']}>
              <div className={styles['view-toolbar']}>
                <ElLink icon={Setting} underline={false} type='primary' onClick={() => {
                  globalState.isShow = true
                }}>全局设置</ElLink>
                <ElInputNumber size='small' v-model={zoom.value} min={50} max={400} step={10}></ElInputNumber>
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
              {renderNodeSetDialog({ dialogBaseProps, node: state.selectNode, updateNode })}
            </div>
          </div>
        </div>
      }}

    </CipPageLayoutHandle>
  }
})
