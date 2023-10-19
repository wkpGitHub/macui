import { computed, defineComponent, ref } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import CipDialog from '@cip/components/cip-dialog'
import CipTableButton from '@cip/components/cip-table-button'
import CipTree from '@cip/components/cip-tree'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import SetFx from '@/components/custom-form-input/set-fx'

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
    proxyValue.value = proxyValue.value || []

    const proxyOptions = computed(() => {
      return [
        {
          title: '主表',
          name: '_table',
          disabled: !(props.dependOnValues.fields?.length > 0),
          children: [...props.dependOnValues.fields]
        }
      ]
    })

    const visible = ref(false)

    function handleClick () {
      visible.value = true
    }

    function handleDel ($index) {
      proxyValue.value.splice($index, 1)
    }
    const treeRef = ref()
    function handleConfirm (resolve) {
      const temp = treeRef.value.tree.getCheckedNodes(true)
      proxyValue.value ? proxyValue.value.push(...temp) : (proxyValue.value = temp)
      resolve()
    }
    return () => <>
      <ElTable
        showHeader={false}
        data={proxyValue.value}
        styles={{ width: width.value }}
        maxHeight={'300px'}
        handlerWidth={'80px'}
      >
        <ElTableColumn showOverflowTooltip width="160px">{{ default: ({ row }) => <span>{row.title}</span> }}</ElTableColumn>
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
              label: 'title',
              value: 'name'
            }
          }}
        >
        </CipTree>
      </CipDialog>
    </>
  }
})
