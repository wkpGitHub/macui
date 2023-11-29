/* eslint-disable */
import { PlList as CipPageLayoutList } from '@cip/page-layout'
import { layoutProps, setFieldValue, getFieldValue } from '@d-render/shared'
import { useComponentSlots } from '@/components/d-render-plugin-page-render/use-component-slots'
import { getListConfigByType, getFxValue } from '../use-event-configure'
import './index.less'
import axiosInstance from '@/views/app/pages/api'
import { inject } from 'vue'
import {CipButton} from '@xdp/button'
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    return () => {
      const drPageRender = inject('drPageRender', {})
      const { options, type, hideItem, ...attr } = props.config
      const { dialog } = componentSlots.value
      const { api, deleteApi, options: curdOptions } = props.config
      
      const children = []
      curdOptions?.forEach(o => o.children && children.push(...o.children))
      const searchForm = getListConfigByType(children, 'searchForm')
      const pageTable = getListConfigByType(children, 'pageTable')
      const pagination = getListConfigByType(children, 'pagination')
      const dialogItem = getListConfigByType(children, 'dialog')
      
      if (!props.config.getData) {
        function getData (axisOptions={}) {
          const _params = (api.inputParams || []).reduce((total, current) => {
            total[current.name] = getFxValue(current.value || [], drPageRender.variables, drPageRender.model)
            return total
          }, {})

          const {params, ...otherOptions} = axisOptions
          axiosInstance({
            url: api.fullPath,
            method: api.httpMethod,
            ...otherOptions,
            params: {..._params, ...params},
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
        // 初始拉取
        api.initSearch && getData()
      }

      function createItem(title='新增', row={}) {
        setFieldValue(drPageRender.model, dialogItem.key, true)
        dialogItem.config.title = title
        const children = []
        dialogItem.config.options?.forEach(o => o.children && children.push(...o.children))
        const formItem = getListConfigByType(children, 'form')
        setFieldValue(drPageRender.model, formItem.key, row)
      }

      pageTable.config.editItem = function (row) {
        createItem('编辑', row)
      }

      pageTable.config.deleteItem = function (row) {
        ElMessageBox.confirm('确认删除？', '提示', { type: 'warning' }).then(() => {
          return axiosInstance({
            url: deleteApi.fullPath,
            method: deleteApi.httpMethod,
            params: {
              ids: row.id
            }
          }).then(({data}) => {
            ElMessage.success({ type: 'success', message: data.message })
            props.config.getData({params: getFieldValue(drPageRender.model, searchForm.key)})
          })
        })
      }

      async function batchDelete() {
        const itemList = getFieldValue(drPageRender.model, pageTable.config.otherKey?.[0])
        if (!itemList || itemList.length === 0) {
          ElMessage.error(`需要选择至少一条数据后再进行批量删除`)
          return
        }
        try {
          await ElMessageBox.confirm('确认批量删除已选项', '提示', { type: 'warning' })
          try {
            const { data: {message} } = await axiosInstance({
              url: deleteApi.fullPath,
              method: deleteApi.httpMethod,
              params: {
                ids: itemList.map(item => item.id).join(',')
              },
            })
            ElMessage.success({ type: 'success', message })
            props.config.getData({params: getFieldValue(drPageRender.model, searchForm.key)})
          } catch (e) {
            console.error(e)
          }
        } catch (e) {
          console.info('取消批量删除')
        }
      }

      return !hideItem && <div>
        <CipPageLayoutList {...attr}>{{
          title: () => componentSlots.value.title?.(),
          filter: () => componentSlots.value.filter(),
          default: () => componentSlots.value.default(),
          pagination: () => componentSlots.value.pagination(),
          handle: () => componentSlots.value.handle
           ? componentSlots.value.handle()
           : <>
            <CipButton buttonType="create" onClick={() => createItem()}>新增</CipButton>
            {pageTable.config.selectType === 'checkbox' && <CipButton buttonType="batchDelete" onClick={() => batchDelete()}>删除</CipButton>}
           </>
        }}</CipPageLayoutList>
        {dialog?.()}
      </div>
    }
  }
}
