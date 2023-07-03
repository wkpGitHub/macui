import { CipFormInputTransform } from 'd-render'
import { computed } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import { isArray } from '@cip/utils/util'

export default {
  emits: ['update:modelValue'],
  setup () {
    const searchFromProps = [
      'title',
      'dialogType',
      'subTitle',
      'onConfirm',
      'beforeConfirm',
      'size',
      'width',
      'top',
      'closeOnClickModal',
      'showOnly',
      'buttonSize',
      'confirmText',
      'cancelText',
      'showCancel',
      'destroyOnClose',
      'maxDepth',
      'fullscreen'
    ]
    // const cipFormRender = inject('cipFormRender', {})
    const TransformModelDialog = (props, { emit, slots }) => {
      const componentSlots = computed(() => {
        return props.options.value.reduce((acc, slotConfig, idx) => {
          if (isArray(slotConfig.children)) {
            acc[slotConfig.key] = () => slots.item({ children: slotConfig.children, optionIndex: idx, isShow: props.config._isShow, ...handler })
          }
          return acc
        }, {})
      })
      return <CipDialog
        {...props}
      >
        {componentSlots.value.default?.()}
      </CipDialog>
    }

    return () => <CipFormInputTransform
      inputPropsConfig={searchFromProps}
      comp={TransformModelDialog}
    />
  }
}
