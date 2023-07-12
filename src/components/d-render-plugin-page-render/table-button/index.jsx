import CipButtonText from '@cip/components/cip-button-text'
import { CipFormInputTransform } from 'd-render'
import { useEventConfigure } from '../use-event-configure'
export default {
  setup () {
    const buttonProps = [
      'options'
    ]
    const handleEvent = useEventConfigure()
    const TransformComp = (props, { attrs }) => {
      const { options, dependOnValues, outDependOnValues } = props
      return options.map((option, i) => {
        const { text, click, ...otherConfig } = option
        return <CipButtonText {...otherConfig} key={i} onClick={() => {
          const { click } = option
          handleEvent(click, { dependOnValues, outDependOnValues })
          // const method = cipFormRender.methods[click]
          // if (method) method()
        }
        }>{text}</CipButtonText>
      })
    }
    return () => <CipFormInputTransform
      inputPropsConfig={buttonProps}
      comp={TransformComp}
    />
  }
}
