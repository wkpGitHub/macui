import { computed, defineComponent, ref, watch } from 'vue'
import { ElTable, ElTableColumn, ElSelect, ElOption } from 'element-plus'
import CipTableButton from '@cip/components/cip-table-button'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput, useOptions } from '@d-render/shared'
// import { getTableColumn } from './config'

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

const opOptions = [
  { label: '等于', value: 'equal', usedFieldType: ['int', 'text', 'date'] },
  { label: '不等于', value: 'not_equal', usedFieldType: ['int', 'text', 'date'] },
  { label: '模糊匹配', value: 'like', usedFieldType: ['text'] },
  { label: '不匹配', value: 'not_like', usedFieldType: ['text'] },
  { label: '匹配开头', value: 'starts_with', usedFieldType: ['text'] },
  { label: '匹配结尾', value: 'ends_with', usedFieldType: ['text'] },
  { label: '小于', value: 'less', usedFieldType: ['int', 'date'] },
  { label: '小于或等于', value: 'less_or_equal', usedFieldType: ['int', 'date'] },
  { label: '大于', value: 'greater', usedFieldType: ['int', 'date'] },
  { label: '大于或等于', value: 'greater_or_equal', usedFieldType: ['int', 'date'] },
  { label: '为空', value: 'is_empty', usedFieldType: ['int', 'text'] },
  { label: '不为空', value: 'is_not_empty', usedFieldType: ['int', 'text'] },
  { label: '属于范围', value: 'between', usedFieldType: ['date'] },
  { label: '不属于范围', value: 'not_between', usedFieldType: ['date'] }
]

export default defineComponent({
  name: 'filter-condition',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const tableData = ref([])
    watch(() => props.modelValue, v => {
      tableData.value = v || []
    }, { deep: true, immediate: true })
    watch(tableData, () => {
      proxyValue.value = tableData.value
    }, { deep: true })
    const {
      proxyValue,
      width,
      securityConfig
    } = useFormInput(props, ctx)

    // 是否多选
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })

    const { options } = useOptions(props, multiple)

    // const tableColumns = computed(() => getTableColumn(options, optionProps))

    function handleClick () {
      if (proxyValue.value && proxyValue.value.children) {
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
      <ElTable
        showHeader={false}
        data={proxyValue.value?.children || []}
        styles={{ width: width.value }}
        maxHeight={'300px'}
        handlerWidth={'80px'}
      >
        <ElTableColumn>{{ default: ({ row }) => <ElSelect v-model={row.field}>{options.value.map(o => <ElOption label={o.ename} value={o.name} key={o.name} />)}</ElSelect> }}</ElTableColumn>
        <ElTableColumn>{{ default: ({ row }) => <ElSelect v-model={row.op}>{opOptions.map(o => <ElOption label={o.label} value={o.value} key={o.value} />)}</ElSelect> }}</ElTableColumn>
        <ElTableColumn>{{
          default: ({ row, $index }) => <SetFx v-model={row.right} config={securityConfig.value} />
        }}</ElTableColumn>
        <ElTableColumn width="60px">{{ default: ({ $index }) => <CipTableButton onClick={() => { handleDel($index) }}>删除</CipTableButton> }}</ElTableColumn>
      </ElTable>
      <CipButton onClick={handleClick}>添加</CipButton>
    </>
  }
})
