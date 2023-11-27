/* eslint-disable */
import CipDialog from '@cip/components/cip-dialog'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '../use-component-slots'
import { useEventConfigure, bindEvent, getFxValue } from '../use-event-configure'
import { ElButton } from 'element-plus'
import {inject} from 'vue'
import axiosInstance from '@/views/app/pages/api'

export default {
  props: { ...layoutProps, modelValue: {} },
  setup (props, context) {
    const { componentSlots, proxyValue } = useComponentSlots(props, context)
    const drPageRender = inject('drPageRender', {})
    const handleEvent = useEventConfigure()
    function onConfirm (resolve, reject) {
      const {api, options} = props.config
      const defaultItem = options.find(item => item.key === 'default')
      const { key } = defaultItem.children[0] || {}
      const _params = (api.inputParams || []).reduce((total, current) => {
        total[current.name] = getFxValue(current.value || [], drPageRender.variables, drPageRender.model)
        return total
      }, {})
      axiosInstance({
        url: api.fullPath,
        method: api.httpMethod,
        body: {..._params, ...drPageRender.model[key]}
      }).then(({data}) => {
        bindEvent(handleEvent, 'confirm', props, data?.data)
        resolve()
      }).catch((err) => {
        reject()
        throw new Error(err)
      })
    }
    proxyValue.value = props.config.defaultValue
    return () => {
      const { options, type, width, confirm, ...attrs } = props.config
      return <CipDialog {...attrs} v-model={proxyValue.value} onConfirm={onConfirm}>{{
        default: () => componentSlots.value?.default(),
        footer: ({ confirm, loading, cancel }) => componentSlots.value.footer
          ? <div style="display: inline-flex">{componentSlots.value.footer?.()}</div>
          : <>
          <ElButton type="primary" loading={loading} onClick={() => confirm()}>确定</ElButton>
          <ElButton onClick={() => cancel()}>取消</ElButton>
        </>
      }}</CipDialog>
    }
  }
}
