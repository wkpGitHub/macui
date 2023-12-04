import { PlInfo as CipPageInfo } from '@cip/page-layout'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '@/components/d-render-plugin-page-render/use-component-slots'
import { isInitSearch, getInputParams } from '@/components/d-render-plugin-page-render/use-event-configure'
import { inject } from 'vue'
import axiosInstance from '@/views/app/pages/api'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { options, type, api, ...attr } = props.config
    const defaultItem = options.find(item => item.key === 'default')
    const { key } = defaultItem.children.find(item => item.config.type === 'form') || {}
    const drPageRender = inject('drPageRender', {})
    // 请求接口
    if (api) {
      function getData () {
        axiosInstance({
          url: api.fullPath,
          method: api.httpMethod,
          params: getInputParams(api, drPageRender)
        }).then(({ data }) => {
          drPageRender.dataBus(key, data.data)
        }).catch((err) => {
          throw new Error(err)
        })
      }
      // eslint-disable-next-line vue/no-mutating-props
      props.config.getData = getData
      isInitSearch(api, drPageRender) && getData()
    }

    return () => {
      return <CipPageInfo {...attr} v-slots={componentSlots.value} />
    }
  }
}
