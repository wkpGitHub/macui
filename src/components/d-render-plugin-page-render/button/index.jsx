import CipButton from '@cip/components/cip-button'
import { CipFormInputTransform } from 'd-render'
import { inject } from 'vue'
import { handleEvent } from '../use-event-configure'
export default {
  setup () {
    const buttonProps = [
      'text',
      'click',
      'buttonType',
      'icon'
    ]
    const cipFormRender = inject('cipFormRender', {})
    const TransformComp = (props, { attrs }) => {
      const { click, text, dataBus, ...otherConfig } = props
      return <CipButton {...otherConfig} onClick={() => {
        console.log('click')
        handleEvent(click, cipFormRender, dataBus)
        // const method = cipFormRender.methods[click]
        // if (method) method()
      }} >{text}</CipButton>
    }
    return () => <CipFormInputTransform
      inputPropsConfig={buttonProps}
      comp={TransformComp}
    />
  }
}
