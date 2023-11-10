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
      'icon',
      'events'
    ]
    const handleEvent = useEventConfigure()
    const TransformComp = (props, { attrs }) => {
      const { events, text, dataBus, ...otherConfig } = props
      return <CipButton {...otherConfig} onClick={(e) => {
        handleEvent(events?.click?.value || [], `${props.config.id}_click`, e)
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
