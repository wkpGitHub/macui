import CipButton from '@cip/components/cip-button'
import { CipFormInputTransform } from 'd-render'
import { useEventConfigure, bindEvent } from '../use-event-configure'
export default {
  setup (props) {
    const buttonProps = [
      'text',
      'click',
      'buttonType',
      ['inputType', 'type'],
      'icon',
      'hideItem'
    ]
    const handleEvent = useEventConfigure()
    const TransformComp = (props, { attrs }) => {
      const { text, dataBus, hideItem, config, ...otherConfig } = props
      return !hideItem && <CipButton {...otherConfig} onClick={(e) => bindEvent(handleEvent, 'click', props, e)} >{text}</CipButton>
    }
    return () => <CipFormInputTransform
      inputPropsConfig={buttonProps}
      comp={TransformComp}
    />
  }
}
