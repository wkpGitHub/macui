import { computed, defineComponent } from 'vue'
import { CipTable } from 'd-render'
import CipTableButton from '@cip/components/cip-table-button'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput, useOptions } from '@d-render/shared'
import { getTableColumn } from './config'

// const data = {
//   id: unid(),
//   conjunction: 'and',
//   children: [
//     {
//       id: '',
//       left: {
//         type: 'field',
//         field: '开拓日期'
//       },
//       op: 'equal',
//       right: '12446578'
//     },
//     {
//       id: unid(),
//       conjunction: 'and',
//       children: [
//         {
//           id: '',
//           left: {
//             type: 'field',
//             field: '开拓日期'
//           },
//           op: 'equal',
//           right: '12446578'
//         }
//       ]
//     }
//   ]
// }

export default defineComponent({
  name: 'filter-condition',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      width,
      securityConfig
    } = useFormInput(props, ctx)

    // 是否多选
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })

    const { optionProps, options } = useOptions(props, multiple)

    const tableColumns = computed(() => getTableColumn(options, optionProps))

    function handleClick () {
      if (proxyValue.value) {
        proxyValue.value.children.push({})
      } else {
        proxyValue.value = {
          conjunction: 'and',
          children: [{}]
        }
      }
    }

    function handleDel ($index) {
      proxyValue.value.children.splice($index, 1)
    }
    return () => <>
      <CipTable
        showHeader={false}
        data={proxyValue?.value?.children || []}
        columns={tableColumns.value}
        styles={{ width: width.value }}
        withTableHandle={true}
        handlerWidth={'80px'}
      >
        {{
          $handler: ({ $index }) => <>
            <CipTableButton onClick={() => { handleDel($index) }}>删除</CipTableButton>
          </>
        }}
      </CipTable>
      <CipButton onClick={handleClick}>添加</CipButton>
    </>
  }
})
