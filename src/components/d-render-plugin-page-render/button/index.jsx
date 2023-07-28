import CipButton from '@cip/components/cip-button'
import { CipFormInputTransform } from 'd-render'
import { useEventConfigure } from '../use-event-configure'
export default {
  setup (props) {
    const buttonProps = [
      'text',
      'click',
      'buttonType',
      ['inputType', 'type'],
      'icon'
    ]
    const handleEvent = useEventConfigure()
    const TransformComp = (props, { attrs }) => {
      const { click, text, dataBus, ...otherConfig } = props
      return <CipButton {...otherConfig} onClick={() => {
        handleEvent(click)
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
