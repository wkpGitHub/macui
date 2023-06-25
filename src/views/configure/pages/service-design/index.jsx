import { defineComponent, ref } from 'vue'
import { ElInputNumber, ElLink } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import CipPageLayoutInfo from '@cip/components/page-layout/info'
import CipButton from '@cip/components/cip-button'
import {
  useDialog,
  GlobalSettingDialog,
  PseudoCodeDialog,
  SourceCodeDialog
} from './dialog'

import styles from './index.module.less'
import './ausyda.css'

export default defineComponent({
  setup (props, ctx) {
    const zoom = ref(100)

    const globalSettingVisible = ref(false)
    const pseudoCodeDialogVisible = ref(false)
    const sourceCodeDialogVisible = ref(false)
    const { showRightPanel, dialogBaseProps } = useDialog()

    return () => <CipPageLayoutInfo>
      <div class={styles.page}>
        <div class={styles.header}>
          <div class={styles.title}>title</div>
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
            <div class={styles['view-container']}>container</div>
          </div>
          <div class={[styles['right-panel'], showRightPanel.value ? styles['right-panel-opened'] : '']}>
            <GlobalSettingDialog {...dialogBaseProps} v-model={globalSettingVisible.value}/>
            <PseudoCodeDialog {...dialogBaseProps} v-model={pseudoCodeDialogVisible.value}/>
            <SourceCodeDialog {...dialogBaseProps} v-model={sourceCodeDialogVisible.value}/>
          </div>
        </div>
      </div>
    </CipPageLayoutInfo>
  }
})
