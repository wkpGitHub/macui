import styles from './index.module.less'
import { ElScrollbar } from 'element-plus'

export default {
  props: { navTitle: String },
  setup (props, { slots }) {
    return () => <div class={styles.wrapper}>
      <div class={styles.header}>
        {slots.title?.()}
        <div class={styles.handle}>{slots.handle?.()}</div>
      </div>
      <div class={styles.main}>
        <div class={styles.modules}>
          {slots.modules?.()}
        </div>
        <div class={styles.nav}>
          <div class={styles.nav__title}>
            {props.navTitle}
          </div>
          <div class={styles.nav__content}>
            <ElScrollbar>
              {slots.nav?.()}
            </ElScrollbar>
          </div>
        </div>
        <div class={styles.content}>
          {slots.content?.()}
        </div>
        <div class={styles.configure}>
          {slots.configure?.()}
        </div>
      </div>
    </div>
  }
}
