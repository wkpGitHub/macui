// import { xx } from '@/api'
import PageLayoutInfo from '@cip/page-layout/info'
import CipButton from '@cip/components/cip-button'
import './index.less'
import '../../service-design/ausyda.css'
import { Ausyda } from './ausyda.js'
import { onMounted } from 'vue'

export default {
  setup () {
    onMounted(() => {
      setTimeout(() => {
        const au = new Ausyda({
          el: '#api-editor',
          nodes: [
            {
              type: 'coder',
              id: 'e3845e9ed090b-5800f8092',
              title: '删除记录',
              x: 528,
              y: 113,
              active: false
            },
            {
              type: 'coder',
              id: '477649edc02f5-d2f4dd937',
              title: '更新记录',
              x: 225,
              y: 395,
              active: false
            }
          ],
          links: [
            {
              source: '477649edc02f5-d2f4dd937',
              sourcePosition: 'top',
              target: 'e3845e9ed090b-5800f8092',
              targetPosition: 'left'
            }
          ]
        })
        // 点击节点删除按钮
        au.on('deleteNode', (d, cb) => {
          alert(d.title)
          // 执行回调函数删除节点
          cb()
        })
      }, 100)
    })
    const pointList = ['新增记录', '删除记录', '更新记录']

    function nodeDragStart (node, e) {
      e.dataTransfer.setData('node', JSON.stringify(node))
    }

    return () => <PageLayoutInfo>
      <div class="flow-design">
        <div class="slider-bar">
          {pointList.map(item => <CipButton draggable style="margin: 4px" onDragstart={(e) => nodeDragStart(item, e)}>{item}</CipButton>)}
        </div>
        <main id="api-editor">

        </main>
        <div class="slider-bar"></div>
      </div>
    </PageLayoutInfo>
  }
}
