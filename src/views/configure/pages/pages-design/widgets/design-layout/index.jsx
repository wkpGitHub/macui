import styles from './index.module.less'
import { ElScrollbar } from 'element-plus'

export default {
  setup (props, { slots }) {
    return () => <div class={styles.container}>
      <div class={styles.toolbar}>
        {slots.toolbar?.()}
      </div>
      <div class={styles.main}>
        {/* <div class={styles.module}> */}
        {/*   <ElScrollbar> */}
        {/*     {slots.modules?.()} */}
        {/*   </ElScrollbar> */}
        {/* </div> */}
        <div class={styles.tree}>
          <ElScrollbar>
            {slots.tree?.()}
          </ElScrollbar>
        </div>
        <div class={styles.content}>
            {slots.content?.()}
        </div>
        {/* <div class={styles.configure}> */}
        {/*   <ElScrollbar> */}
        {/*     {slots.configure?.()} */}
        {/*   </ElScrollbar> */}
        {/* </div> */}
      </div>
    </div>
  }
}
