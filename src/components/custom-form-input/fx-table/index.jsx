import { defineComponent, ref, watch } from 'vue'
import { ElTable, ElTableColumn, ElInput, ElIcon } from 'element-plus'
import CipTableButton from '@cip/components/cip-table-button'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { MoreFilled } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'select-field',
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

    function handleDel ($index) {
      tableData.value.splice($index, 1)
    }

    return () => <>
      <ElTable
        data={tableData.value || []}
        styles={{ width: width.value }}
        maxHeight={'300px'}
        handlerWidth={'80px'}
      >
        <ElTableColumn showOverflowTooltip width="120px" label="键">{{ default: ({ row }) => <ElInput v-model={row.key}></ElInput> }}</ElTableColumn>
        <ElTableColumn label="值">{{
          default: ({ row, $index }) => <ElInput v-model={row.value}>{{
            suffix: () => <ElIcon style="cursor: pointer" onClick={() => securityConfig.value.showFx({ label: `outputParams.${$index}.value` })}><MoreFilled /></ElIcon>
          }}</ElInput>
        }}</ElTableColumn>
        <ElTableColumn width="60px">{{ default: ({ $index }) => <CipTableButton onClick={() => { handleDel($index) }}>删除</CipTableButton> }}</ElTableColumn>
      </ElTable>
      <CipButton onClick={() => tableData.value.push({})}>添加</CipButton>
    </>
  }
})
