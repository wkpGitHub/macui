import styles from './index.module.less'
export default {
  setup (props, { slots }) {
    return () => <div class={styles.wrapper}>
      <div class={styles.header}>
        {slots.title?.()}
        <div class={styles.handle}>{slots.handle?.()}</div>
      </div>
      <div class={styles.main}>
        <div className={styles.modules}>
          {slots.modules?.()}
        </div>
        <div class={styles.nav}>
          {slots.nav?.()}
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
