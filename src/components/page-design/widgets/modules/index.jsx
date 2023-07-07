import { ElIcon } from 'element-plus'
import styles from './index.module.less'
export default {
  props: {
    modelValue: String,
    modules: Array
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    return () => <div class={styles.wrapper}>
      {props.modules.map(module => <div
        key={module.name}
        class={[
          styles.item,
          props.modelValue === module.name ? styles['is-active'] : undefined]
        }
        onClick={() => emit('update:modelValue', module.name)}
      >
        <ElIcon style={'font-size: 18px;'}>{module.icon}</ElIcon>
      </div>)}
    </div>
  }
}
