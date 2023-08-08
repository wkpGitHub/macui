import { computed, defineComponent, ref, watch } from 'vue'
import { ElTable, ElTableColumn, ElInput, ElIcon } from 'element-plus'
import CipDialog from '@cip/components/cip-dialog'
import CipTableButton from '@cip/components/cip-table-button'
import CipTree from '@cip/components/cip-tree'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput, useOptions } from '@d-render/shared'
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
          ename: '主表',
          name: '_table',
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
    function handleConfirm (reslove) {
      const temp = treeRef.value.tree.getCheckedNodes(true)
      console.log(temp, 'temp')
      tableData.value ? tableData.value.push(...temp) : (tableData.value = temp)
      reslove()
    }
    return () => <>
      <ElTable
        showHeader={false}
        data={tableData.value || []}
        styles={{ width: width.value }}
        maxHeight={'300px'}
        handlerWidth={'80px'}
      >
        <ElTableColumn showOverflowTooltip width="60px">{{ default: ({ row }) => <span>{row.ename}</span> }}</ElTableColumn>
        <ElTableColumn>{{
          default: ({ row, $index }) => <ElInput v-model={row.formula}>{{
            suffix: () => <ElIcon style="cursor: pointer" onClick={() => securityConfig.value.showFx({ keys: `initFields.${$index}.formula` })}><MoreFilled /></ElIcon>
          }}</ElInput>
        }}</ElTableColumn>
        <ElTableColumn width="60px">{{ default: ({ $index }) => <CipTableButton onClick={() => { handleDel($index) }}>删除</CipTableButton> }}</ElTableColumn>
      </ElTable>
      <CipButton onClick={handleClick}>添加</CipButton>
      <CipDialog
        title={'选择字段'}
        v-model={visible.value}
        onConfirm={handleConfirm}
        size={'small'}
      >
        <CipTree
          ref={treeRef}
          options={proxyOptions.value}
          showButton={false}
          config={{
            showCheckbox: true,
            optionProps: {
              label: 'ename',
              value: 'name'
            }
          }}
        >
        </CipTree>
      </CipDialog>
    </>
  }
})
