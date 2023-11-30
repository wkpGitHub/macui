import { CipTable, CipFormInputTransform } from 'd-render'
import { computed, inject } from 'vue'
import axiosInstance from '@/views/app/pages/api'
import { getFxValue, useEventConfigure, bindEvent } from '../use-event-configure'
import { setFieldValue } from '@d-render/shared'
import { CipButtonText } from '@xdp/button'

export default {
  emits: ['update:modelValue'],
  setup () {
    const searchFromProps = [
      'options',
      'hideIndex',
      'selectType'
    ]
    const TransformModelSearchForm = (props, { emit }) => {
      const drPageRender = inject('drPageRender', {})
      const { modelValue = [], dataBus, search, options, ...componentProps } = props
      const tableConfig = computed(() => {
        return props.schema || props.config
      })
      const columns = []
      let tableButton;
      (options[0]?.children || []).forEach(item => {
        if (item.config.type === 'tableButton') {
          tableButton = item
        } else {
          columns.push(item)
        }
      })
      const { api, withDefaultHandle } = props.config
      if (api && !props.config.getData) {
        const params = (api.inputParams || []).reduce((total, current) => {
          total[current.name] = getFxValue(current.value || [], drPageRender.variables, drPageRender.model)
          return total
        }, {})
        props.config.getData = function () {
          return axiosInstance({
            url: api.fullPath,
            method: api.httpMethod,
            params
          }).then(({ data }) => {
            componentProps['onUpdate:modelValue'](data.data?.list || [])
            return data.data
          })
        }
        api.initSearch && props.config.getData()
      }

      const handleEvent = useEventConfigure()

      function editItem (row, $index) {
        props.config.editItem?.(row, $index)
      }
      function deleteItem (row, $index) {
        props.config.deleteItem?.(row, $index)
      }

      function renderHandle (withDefaultHandle, tableButton, { row, $index }) {
        if (withDefaultHandle) {
          return <>
            <CipButtonText onClick={() => editItem(row, $index)}>编辑</CipButtonText>
            <CipButtonText onClick={() => deleteItem(row, $index)}>删除</CipButtonText>
          </>
        } else if (tableButton) {
          return tableButton.config.options.map(item => <CipButtonText onClick={() => {
            const events = {
              click: { value: item.click }
            }
            bindEvent(handleEvent, 'click', { config: { id: tableButton.id, events } }, [row, $index])
          }}>{item.text}</CipButtonText>)
        }
      }

      return <CipTable
        {...tableConfig.value}
        data={modelValue}
        offset={tableConfig.value.hideIndex ? undefined : 0}
        onUpdate:data={componentProps['onUpdate:modelValue']}
        onUpdate:selectColumns={v => {
          setFieldValue(drPageRender.model, props.config.otherKey[0], v)
          bindEvent(handleEvent, 'check', props, v)
        }}
        columns={columns}
        withTableHandle={withDefaultHandle || tableButton}
      >{{
        $handler: ({ row, $index }) => renderHandle(withDefaultHandle, tableButton, { row, $index })
      }}</CipTable>
    }

    return () => <CipFormInputTransform
      inputPropsConfig={searchFromProps}
      comp={TransformModelSearchForm}
    />
  }
}
