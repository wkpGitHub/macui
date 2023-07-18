import { computed, defineComponent } from 'vue'
import { PlHandle as CipPageHandle } from '@cip/page-layout'
import { CipForm } from 'd-render'
import { getUsingConfig } from '@cip/utils/util'
import CipButton from '@cip/components/cip-button'
export default defineComponent({
  props: {
    top: Boolean,
    model: Object,
    formFieldList: {},
    onSave: Function,
    formProps: { default: () => ({}) },
    layoutProps: { default: () => ({}) }
  },
  emit: ['update:model', 'cancel'],
  setup (props, { emit }) {
    const formFieldListBridge = computed(() => getUsingConfig(props.formFieldList, props.formProps.formFieldList, []))
    return () => <CipPageHandle {...props.layoutProps}>
      {{
        default: () => <CipForm
          {...props.formProps}
          model={props.model}
          onUpdate:mode={(val) => emit('update:model', val)}
          fieldList={formFieldListBridge.value}
        />,
        handle: ({ confirm, waiting }) => <>
          <CipButton loading={waiting} onClick={() => emit('cancel')}>取消</CipButton>
          <CipButton loading={waiting} type={'primary'} onClick={() => confirm(props.onSave)}>确认</CipButton>
        </>
      }}
    </CipPageHandle>
  }
})
