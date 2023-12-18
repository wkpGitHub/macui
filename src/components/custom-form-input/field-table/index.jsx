import { defineComponent, watch } from 'vue'
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
    const {
      proxyValue,
      width,
      securityConfig
    } = useFormInput(props, ctx)

    watch(proxyValue.value, (v) => {
      // eslint-disable-next-line vue/no-mutating-props
      props.config.parentState.rootNode.outParams = v
    }, { deep: true })
    function handleDel ($index) {
      proxyValue.value.splice($index, 1)
    }

    const { state, render } = useFxDialog(proxyValue, securityConfig.value)

    return () => <>
      <ElTable
        data={proxyValue.value || []}
        styles={{ width: width.value }}
        maxHeight={'300px'}
        handlerWidth={'80px'}
      >
        <ElTableColumn showOverflowTooltip label="字段">{{ default: ({ row }) => <ElInput v-model={row.name} /> }}</ElTableColumn>
        <ElTableColumn label="表头">{{
          default: ({ row }) => <ElInput v-model={row.title} />
        }}</ElTableColumn>
        <ElTableColumn width="50px">{{ default: ({ $index }) => <CipTableButton onClick={() => { handleDel($index) }}>删除</CipTableButton> }}</ElTableColumn>
      </ElTable>
      <div class="flex">
        <CipButton onClick={() => { state.isShow = true }}>选择添加</CipButton>
        <CipButton onClick={() => { proxyValue.value.push({ label: '', value: '' }) }}>手动添加</CipButton>
      </div>
      {render()}
    </>
  }
})
