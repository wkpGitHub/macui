import { ElSelect, ElOption } from 'element-plus'

export default {
  name: 'LSelect',
  props: {
    modelValue: {},
    config: Object
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    return () => (
      <ElSelect
        style="width: 100%"
        modelValue={props.modelValue}
        clearable={props.config.clearable ?? true}
        onUpdate:modelValue={(val) => emit('update:modelValue', val)}>
        {props.config.options.map((option) => (
          <ElOption
            key={option.value}
            disabled={option.disabled}
            value={option.value}
            label={option.label}
          />
        ))}
      </ElSelect>
    )
  }
}
