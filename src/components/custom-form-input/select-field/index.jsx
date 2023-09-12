import { computed, defineComponent, ref, watch } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import CipDialog from '@cip/components/cip-dialog'
import CipTableButton from '@cip/components/cip-table-button'
import CipTree from '@cip/components/cip-tree'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput, useOptions } from '@d-render/shared'
import SetFx from '@/components/custom-form-input/set-fx'

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

    // 是否多选
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })

    const {
      // optionProps,
      options
    } = useOptions(props, multiple)

    const proxyOptions = computed(() => {
      return [
        {
          remark: '主表',
          name: '_table',
          disabled: !(options.value?.length > 0),
          children: [...options.value]
        }
      ]
    })

    const visible = ref(false)

    function handleClick () {
      visible.value = true
    }

    function handleDel ($index) {
      tableData.value.splice($index, 1)
    }
    const treeRef = ref()
    function handleConfirm (resolve) {
      const temp = treeRef.value.tree.getCheckedNodes(true)
      tableData.value ? tableData.value.push(...temp) : (tableData.value = temp)
      resolve()
    }
    return () => <>
      <ElTable
        showHeader={false}
        data={tableData.value || []}
        styles={{ width: width.value }}
        maxHeight={'300px'}
        handlerWidth={'80px'}
      >
        <ElTableColumn showOverflowTooltip width="80px">{{ default: ({ row }) => <span>{row.remark}</span> }}</ElTableColumn>
        <ElTableColumn>{{
          default: ({ row }) => <SetFx v-model={row.formula} config={securityConfig.value} />
        }}</ElTableColumn>
        <ElTableColumn width="50px">{{ default: ({ $index }) => <CipTableButton onClick={() => { handleDel($index) }}>删除</CipTableButton> }}</ElTableColumn>
      </ElTable>
      <CipButton onClick={handleClick}>添加</CipButton>
      <CipDialog
        title={'选择字段'}
        v-model={visible.value}
        onConfirm={handleConfirm}
        size={'mini'}
      >
        <CipTree
          ref={treeRef}
          options={proxyOptions.value}
          showButton={false}
          config={{
            showCheckbox: true,
            optionProps: {
              label: 'remark',
              value: 'name'
            }
          }}
        >
        </CipTree>
      </CipDialog>
    </>
  }
})
