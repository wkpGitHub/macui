import { ArrowLeft } from '@element-plus/icons-vue'
import store from '@cip/components/store'
import CipButtonText from '@cip/components/cip-button-text'
import CipButton from '@cip/components/cip-button'
import styles from './index.module.less'

export default {
  props: {
    pageInfo: {}
  },
  emits: ['back', 'save'],
  setup (props, { emit }) {
    return () => <div class={styles.wrapper}>
      <div class={styles.left}>
        <CipButtonText class={styles.back} icon={ArrowLeft} onClick={() => emit('back')}/>
        <div class={styles.title}>
          {store.state.app.name} - {props.pageInfo.name}
        </div>
      </div>
    </div>
  }
}
