import { computed, defineComponent, ref } from 'vue'
import { CipTable } from 'd-render'
import CipDialog from '@cip/components/cip-dialog'
import CipTableButton from '@cip/components/cip-table-button'
import CipTree from '@cip/components/cip-tree'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput, useOptions } from '@d-render/shared'
import { tableColumns } from './config'

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
      proxyValue.value.splice($index, 1)
    }
    const treeRef = ref()
    function handleConfirm (reslove) {
      const temp = treeRef.value.tree.getCheckedNodes(true)
      console.log(temp, 'temp')
      proxyValue.value = temp
      reslove()
    }
    return () => <>
      <CipTable
        showHeader={false}
        data={proxyValue.value || []}
        columns={tableColumns}
        styles={{ width: width.value }}
        withTableHandle={true}
        maxHeight={'300px'}
        handlerWidth={'80px'}
      >
        {{
          $handler: ({ $index }) => <>
            <CipTableButton onClick={() => { handleDel($index) }}>删除</CipTableButton>
          </>
        }}
      </CipTable>
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
