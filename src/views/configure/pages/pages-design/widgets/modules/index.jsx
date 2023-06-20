import styles from './index.module.less'
export default {
  props: {
    items: {},
    modelValue: {}
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    return () => <div class={styles.wrapper}>
      {props.items.map((item) => <div
        key={item.value}
        class={[styles.item, { 'is-active': item.value === props.modelValue }]}
        onClick={() => emit('update:modelValue', item.value)}
      >{item.label}</div>)}
    </div>
  }
}
