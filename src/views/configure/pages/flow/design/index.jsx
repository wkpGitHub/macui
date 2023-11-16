// import { xx } from '@/api'
import PageLayoutInfo from '@cip/page-layout/info'
import { ElIcon } from 'element-plus'
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'
import './index.less'
import '../../service-design/ausyda.css'
import { Ausyda, initFlow } from './ausyda.js'
import { onMounted, reactive, ref } from 'vue'
import { useNodeSetDialog, useNodeMenu } from './hooks'
import { v4 as uuid } from 'uuid'

export default {
  setup () {
    let tempNode = null
    const zoom = ref(100)
    const state = reactive({
      rootNode: {},
      selectNode: {}
    })
    const { state: nodeSetState, render: renderNodeConfig } = useNodeSetDialog()
    const { state: nodeMenuState, render: renderNodeMenu } = useNodeMenu()
    let au = {}
    let currentLink = {}
    let isBranch = false
    onMounted(() => {
      setTimeout(() => {
        au = new Ausyda({
          el: '#api-editor',
          data: initFlow
        })
        // 点击连接线上的+
        au.on('addNode', (link, position) => {
          // 添加节点
          currentLink = link
          isBranch = false
          nodeMenuState.isShow = true
          nodeMenuState.position = position
        })
        au.on('elClick', () => {
          nodeMenuState.isShow = false
        })
        // 点击选中节点
        au.on('updateNode', (d) => {
          // 更新节点
          state.selectNode = {}
          d.isBranch = 0
          state.selectNode = d
          state.showRightDraw = true
          nodeSetState.isShow = true
        })
        // 点击分支节点上的+，增加分支
        au.on('addBranch', (parent) => {
          isBranch = true
          currentLink = parent
          // 添加节点
          nodeMenuState.isShow = true
        })
        // au.on('addBranchNode', (node) => {
        //   au.addBranch(tempNode, node.parent)
        // })
        // 点击分支文字或者线段，修改分支
        au.on('updateBranch', (branch, source) => {
          // 更新分支
          // au.updateBranch({ ...branch, expression: '分支新名称' })
          state.selectNode = {}
          branch.isBranch = source.type === 'parallel-gateway' ? 1 : 2// 0代表没有分支 1代表并行分支 2代表其他分支
          state.selectNode = branch
          nodeSetState.isShow = true
          state.showRightDraw = true
        })
        // 点击节点删除按钮
        au.on('deleteNode', (d, cb) => {
          alert(d.title)
          // 执行回调函数删除节点
          cb()
        })
        au.on('scale', (ratio) => {
          zoom.value = Math.floor(ratio * 100)
        })
      }, 1000)
    })

    function switchShowDraw (key) {
      state[key] = !state[key]
    }

    function updateConfig (config) {
      state.selectNode.config = config
      au.updateNode(state.selectNode)
    }

    function nodeClick ({ title, type }, e) {
      tempNode = { title, type, id: uuid(), children: [] }
      if (isBranch) {
        au.addBranch(tempNode, currentLink)
      } else {
        au.insertNode(tempNode, currentLink)
      }
      currentLink = null
      nodeMenuState.isShow = false
    }

    return () => <PageLayoutInfo class="flow-design-page">
      <div class="flow-design">
        <main id="api-editor"></main>
        {renderNodeMenu({ nodeClick })}
        <div class="slider-bar" style={{ right: state.showRightDraw ? '-20px' : '-520px', width: '500px' }}>
          <div class="expand-icon expand-right" onClick={() => switchShowDraw('showRightDraw')}>
            <ElIcon>{state.showRightDraw ? <CaretRight /> : <CaretLeft />}</ElIcon>
          </div>
          <header>{state.selectNode.isBranch === 0 ? state.selectNode.title : state.selectNode.expression}</header>
          <main>{renderNodeConfig({ node: state.selectNode, updateConfig })}</main>
        </div>
      </div>
    </PageLayoutInfo>
  }
}
