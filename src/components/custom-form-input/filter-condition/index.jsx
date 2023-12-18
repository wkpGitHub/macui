import { defineComponent } from 'vue'
import { CipTable, CipForm } from 'd-render'
import CipTableButton from '@cip/components/cip-table-button'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { getTableColumn, fieldList } from './config'

export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      width
    } = useFormInput(props, ctx)

    if (!proxyValue.value) {
      proxyValue.value = {
        logic: 'and',
        children: []
      }
    }

    const tableColumns = getTableColumn(props)

    function handleClick () {
      if (proxyValue.value && proxyValue.value.children) {
        proxyValue.value.children.push({})
      } else {
        proxyValue.value = {
          logic: 'and',
          children: [{}]
        }
      }
    }

    function handleDel ($index) {
      proxyValue.value.children.splice($index, 1)
    }

    return () => <>
      <CipForm v-model:model={proxyValue.value} fieldList={fieldList} style="width: 100%;" />
      <CipTable
        dependOnValues={props.dependOnValues}
        inForm
        showHeader={false}
        data={proxyValue.value?.children || []}
        columns={tableColumns.value}
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
      <div class="flex mt-1" style={{ width: '100%' }}>
        <CipButton onClick={handleClick} class="mr-2 flex-auto" buttonType='create'>添加</CipButton>
        <CipButton onClick={() => { proxyValue.value.children = [] }} class="flex-auto" buttonType='batchDelete'>清空</CipButton>
      </div>
    </>
  }
})
