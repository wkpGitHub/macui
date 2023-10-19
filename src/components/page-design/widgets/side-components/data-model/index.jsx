import PageComponents from '@d-render/design/esm/cip-form-design/widgets/form-components'
import './index.less'

export default {
  props: {
    modelValue: Object,
    groupList: Array
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const updateScheme = (value) => {
      emit('update:modelValue', value)
    }

    return () => <div class="data-model-menu">
      <PageComponents
        groupList={props.groupList}
        modelValue={props.scheme}
        onUpdate:modelValue={updateScheme}/>
    </div>
  }
}
