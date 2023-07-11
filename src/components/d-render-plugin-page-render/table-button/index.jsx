import CipButtonText from '@cip/components/cip-button-text'
import { CipFormInputTransform } from 'd-render'
import { inject } from 'vue'
import { handleEvent } from '../use-event-configure'
export default {
  setup () {
    const buttonProps = [
      'options'
    ]
    const cipFormRender = inject('cipFormRender', {})
    const TransformComp = (props, { attrs }) => {
      const { options, dataBus, dependOnValues, outDependOnValues } = props
      return options.map((option, i) => {
        const { text, click, ...otherConfig } = option
        return <CipButtonText {...otherConfig} key={i} onClick={() => {
          const { click } = option
          handleEvent(click, cipFormRender, dataBus, { dependOnValues, outDependOnValues })
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
