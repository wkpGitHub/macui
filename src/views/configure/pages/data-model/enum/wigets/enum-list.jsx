import styles from './enum-list.module.less'
export default {
  props: {
    list: Array,
    modelValue: Object,
    disabled: Boolean
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    return () => <div class={styles.wrapper}>
      {
        props.list?.map(db => {
          const isActive = db.id === props.modelValue?.id
          return <div
          key={db.id}
          class={styles.item}
          class={{ 'is-active': isActive, 'is-disabled': props.disabled }}
          onClick={() => {
            if (!isActive && !props.disabled) emit('update:modelValue', db)
          }}
        >{db.name}</div>
        })
      }
    </div>
  }
}
