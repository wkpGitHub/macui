/* eslint-disable */
import { PlList as CipPageLayoutList } from '@cip/page-layout'
import { layoutProps, setFieldValue, getFieldValue } from '@d-render/shared'
import { useComponentSlots } from '@/components/d-render-plugin-page-render/use-component-slots'
import { getListConfigByType, getFxValue } from '../use-event-configure'
import './index.less'
import axiosInstance from '@/views/app/pages/api'
import { inject } from 'vue'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    return () => {
      const drPageRender = inject('drPageRender', {})
      const { options, type, hideItem, ...attr } = props.config
      const { dialog, ...layoutSlots } = componentSlots.value
      const { api, options: curdOptions } = props.config
      
      const children = []
      curdOptions?.forEach(o => o.children && children.push(...o.children))
      const searchForm = getListConfigByType(children, 'searchForm')
      const pageTable = getListConfigByType(children, 'pageTable')
      const pagination = getListConfigByType(children, 'pagination')
      
      if (!props.config.getData) {
        function getData (axisOptions) {
          axiosInstance({
            url: api.fullPath,
            method: api.httpMethod,
            ...axisOptions
          }).then(({ data }) => {
            const { page, list } = data.data
            setFieldValue(drPageRender.model, pageTable.key, list)
            const [pageNum, total] = pagination.config.otherKey
            setFieldValue(drPageRender.model, pageNum, page.pageNum)
            setFieldValue(drPageRender.model, total, page.total)
          })
        }
        props.config.getData = getData
        searchForm.config.getData = getData

        // 初次自执行
        const params = (api.inputParams || []).reduce((total, current) => {
          total[current.name] = getFxValue(current.value || [], drPageRender.variables, drPageRender.model)
          return total
        }, {})
        getData({ params })
      }

      return !hideItem && <div>
        <CipPageLayoutList {...attr} v-slots={layoutSlots} />
        {dialog?.()}
      </div>
    }
  }
}
