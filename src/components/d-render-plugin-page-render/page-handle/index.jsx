import { PlHandle as CipPageHandle } from '@cip/page-layout'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '../use-component-slots'
import { useEventConfigure, bindEvent, isInitSearch, getInputParams } from '@/components/d-render-plugin-page-render/use-event-configure'
import { ElButton } from 'element-plus'
import { inject } from 'vue'
import axiosInstance from '@/views/app/pages/api'
import { getFieldValue } from '@cip/utils/util'
import './index.less'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { options, type, api, detailApi, ...attr } = props.config
    const defaultItem = options.find(item => item.key === 'default')
    const { key } = defaultItem.children[0] || {}
    const drPageRender = inject('drPageRender', {})
    const handleEvent = useEventConfigure()
    // 保存
    function onConfirm (resolve, reject) {
      axiosInstance({
        url: api.fullPath,
        method: api.httpMethod,
        body: { ...getInputParams(api, drPageRender), ...getFieldValue(drPageRender.model, key) }
      }).then(({ data }) => {
        bindEvent(handleEvent, 'confirm', props, data?.data)
        resolve()
      }).catch((err) => {
        reject()
        throw new Error(err)
      })
    }
    // 请求接口
    if (detailApi && isInitSearch(detailApi, drPageRender)) {
      axiosInstance({
        url: detailApi.fullPath,
        method: detailApi.httpMethod,
        params: getInputParams(detailApi, drPageRender)
      }).then(({ data }) => {
        drPageRender.dataBus(key, data.data)
      }).catch((err) => {
        throw new Error(err)
      })
    }

    return () => {
      return <CipPageHandle {...attr}>{{
        default: () => componentSlots.value.default?.(),
        handle: ({ confirm, loading, cancel }) => componentSlots.value.handle
          ? <div style="display: inline-flex">{componentSlots.value.handle?.()}</div>
          : <>
            <ElButton type="primary" loading={loading} onClick={() => confirm(onConfirm)}>确定</ElButton>
            <ElButton onClick={() => cancel()}>取消</ElButton>
          </>
      }}</CipPageHandle>
    }
  }
}
