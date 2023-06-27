import { defineComponent, ref, onMounted } from 'vue'
import { ElInputNumber, ElLink } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import CipPageLayoutInfo from '@cip/components/page-layout/info'
import CipButton from '@cip/components/cip-button'
import {
  useDialog,
  GlobalSettingDialog,
  PseudoCodeDialog,
  SourceCodeDialog,
  CompList,
  CompInfo
} from './dialog'

import styles from './index.module.less'
import './ausyda.css'
import * as d3 from 'd3'
import { Ausyda } from './ausyda.js'

export default defineComponent({
  setup (props, ctx) {
    let au
    let selectLink = null
    const selectNode = ref({})
    const zoom = ref(100)

    const globalSettingVisible = ref(false)
    const pseudoCodeDialogVisible = ref(false)
    const sourceCodeDialogVisible = ref(false)
    const compListDialogVisible = ref(false)
    const compInfoDialogVisible = ref(false)

    const { showRightPanel, dialogBaseProps } = useDialog()

    function addNode (comp) {
      au.addNode({ ...comp }, selectLink)
      compListDialogVisible.value = false
      showRightPanel.value = false
      selectLink = null
    }
    function updateNode (model) {
      au.updateNode(model)
    }
    onMounted(() => {
      d3.json('../../ausyda.json').then(data => {
        au = new Ausyda({
          el: '#api-editor',
          data
        })
        // 点击连接线上的+
        au.on('addNode', (link) => {
          // 添加节点
          au.addNode({ id: Math.random().toString(16).slice(2), type: 'http', children: [], title: 'http请求' }, link)
          selectLink = link
          // 打开组件面板
          compListDialogVisible.value = true
        })
        // 点击分支+，增加分支
        au.on('addBranch', (parent) => {
          // 添加节点
          au.addBranch({ id: Math.random().toString(16).slice(2), type: 'http', children: [], title: 'http请求' }, parent)
        })
        // 点击选中节点
        au.on('updateNode', (d) => {
          // 更新节点
          selectNode.value = d
          compInfoDialogVisible.value = true
        })
        // 点击节点删除按钮
        au.on('deleteNode', (d, cb) => {
          alert(d.title)
          // 执行回调函数删除节点
          cb()
        })
      })
    })

    return () => <CipPageLayoutInfo>
      <div class={styles.page}>
        <div class={styles.header}>
          <div class={styles['header-actions']}>
            <CipButton onClick={() => { sourceCodeDialogVisible.value = true }}>源码</CipButton>
            <CipButton onClick={() => { pseudoCodeDialogVisible.value = true }}>伪代码</CipButton>
            <CipButton>调试</CipButton>
            <CipButton type='primary'>保存</CipButton>
          </div>
        </div>
        <div class={styles.editor}>
          <div class={styles['editor-view']}>
            <div class={styles['view-toolbar']}>
              <ElLink icon={Setting} underline={false} type='primary' onClick={() => { globalSettingVisible.value = true }}>全局设置</ElLink>
              <ElInputNumber size='small' v-model={zoom.value} min={50} max={400} step={10}></ElInputNumber>
            </div>
            <div class={styles['view-container']} id="api-editor"></div>
          </div>
          <div class={[styles['right-panel'], showRightPanel.value ? styles['right-panel-opened'] : '']}>
            <GlobalSettingDialog {...dialogBaseProps} v-model={globalSettingVisible.value}/>
            <PseudoCodeDialog {...dialogBaseProps} v-model={pseudoCodeDialogVisible.value}/>
            <SourceCodeDialog {...dialogBaseProps} v-model={sourceCodeDialogVisible.value}/>
            <CompList {...dialogBaseProps} v-model={compListDialogVisible.value} onClickComp={addNode}/>
            <CompInfo {...dialogBaseProps} v-model={compInfoDialogVisible.value} selectNode={selectNode.value} onUpdateNode={updateNode}/>
          </div>
        </div>
      </div>
    </CipPageLayoutInfo>
  }
})
