// import { xx } from '@/api'
import PageLayoutInfo from '@cip/page-layout/info'
import { ElIcon } from 'element-plus'
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'
import './index.less'
import '../../service-design/ausyda.css'
import { Ausyda } from './ausyda.js'
import { onMounted, reactive } from 'vue'
import { useNodes, useNodeSetDialog } from './hooks'

export default {
  setup () {
    const state = reactive({
      showLeftDraw: true,
      showRightDraw: false,
      selectNode: {}
    })
    const { render: renderNodes } = useNodes()
    const { state: nodeSetState, render: renderNodeConfig } = useNodeSetDialog()
    let au = {}
    onMounted(() => {
      setTimeout(() => {
        au = new Ausyda({
          el: '#api-editor',
          nodes: [
            // {
            //   type: 'coder',
            //   id: 'e3845e9ed090b-5800f8092',
            //   title: '删除记录',
            //   x: 728,
            //   y: 113,
            //   active: false
            // },
            // {
            //   type: 'coder',
            //   id: '477649edc02f5-d2f4dd937',
            //   title: '更新记录',
            //   x: 525,
            //   y: 395,
            //   active: false
            // }
          ],
          links: [
            // {
            //   source: '477649edc02f5-d2f4dd937',
            //   sourcePosition: 'top',
            //   target: 'e3845e9ed090b-5800f8092',
            //   targetPosition: 'left'
            // }
          ]
        })
        // 点击节点删除按钮
        au.on('deleteNode', (d, cb) => {
          alert(d.title)
          // 执行回调函数删除节点
          cb()
        })
        // 点击选中节点
        au.on('updateNode', (d) => {
          state.selectNode = {}
          // 更新节点
          d.isBranch = false
          state.selectNode = d
          state.showRightDraw = true
          nodeSetState.isShow = true
        })
      }, 300)
    })

    function switchShowDraw (key) {
      state[key] = !state[key]
    }

    function updateConfig (config) {
      state.selectNode.config = config
      au.updateNode(state.selectNode)
    }

    return () => <PageLayoutInfo class="flow-design-page">
      <div class="flow-design">
        <div class="slider-bar" style={{ left: state.showLeftDraw ? '-20px' : '-290px' }}>
          <div class="expand-icon" onClick={() => switchShowDraw('showLeftDraw')}>
            <ElIcon>{state.showLeftDraw ? <CaretLeft /> : <CaretRight />}</ElIcon>
          </div>
          <header>节点</header>
          <main>{renderNodes()}</main>
        </div>
        <main id="api-editor"></main>
        <div class="slider-bar" style={{ right: state.showRightDraw ? '-20px' : '-540px', width: '500px' }}>
          <div class="expand-icon expand-right" onClick={() => switchShowDraw('showRightDraw')}>
            <ElIcon>{state.showRightDraw ? <CaretRight /> : <CaretLeft />}</ElIcon>
          </div>
          <header>{state.selectNode.title}</header>
          <main>{renderNodeConfig({ node: state.selectNode, updateConfig })}</main>
        </div>
      </div>
    </PageLayoutInfo>
  }
}
