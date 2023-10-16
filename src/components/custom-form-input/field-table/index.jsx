import { defineComponent, ref, watch } from 'vue'
import { ElTable, ElTableColumn, ElInput } from 'element-plus'
import CipTableButton from '@cip/components/cip-table-button'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { useFxDialog } from './hooks'

export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const tableData = ref([])
    tableData.value = props.modelValue || []
    watch(tableData, () => {
      proxyValue.value = tableData.value
    }, { deep: true })

    const {
      proxyValue,
      width,
      securityConfig
    } = useFormInput(props, ctx)

    function handleDel ($index) {
      tableData.value.splice($index, 1)
    }

    const { state, render } = useFxDialog(tableData, securityConfig.value)

    return () => <>
      <ElTable
        data={tableData.value || []}
        styles={{ width: width.value }}
        maxHeight={'300px'}
        handlerWidth={'80px'}
      >
        <ElTableColumn showOverflowTooltip label="字段">{{ default: ({ row }) => <ElInput v-model={row.value} /> }}</ElTableColumn>
        <ElTableColumn label="表头">{{
          default: ({ row }) => <ElInput v-model={row.label} />
        }}</ElTableColumn>
        <ElTableColumn width="50px">{{ default: ({ $index }) => <CipTableButton onClick={() => { handleDel($index) }}>删除</CipTableButton> }}</ElTableColumn>
      </ElTable>
      <div class="flex">
        <CipButton onClick={() => { state.isShow = true }}>选择添加</CipButton>
        <CipButton onClick={() => { tableData.value.push({ label: '', value: '' }) }}>手动添加</CipButton>
      </div>
      {render()}
    </>
  }
})
