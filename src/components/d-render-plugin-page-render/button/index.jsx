import CipButton from '@cip/components/cip-button'
import { CipFormInputTransform } from 'd-render'
import { inject } from 'vue'
import { handleEvent } from '../use-event-configure'
export default {
  setup (props) {
    console.log(props, 'button')
    const buttonProps = [
      'text',
      'click',
      'buttonType',
      'icon'
    ]
    const cipFormRender = inject('drPageRender', {})
    const TransformComp = (props, { attrs }) => {
      const { click, text, dataBus, ...otherConfig } = props
      return <CipButton {...otherConfig} onClick={() => {
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
