import { computed, defineComponent } from 'vue'
import { CipTable, generateFieldList, defineTableFieldConfig } from 'd-render'
import CipTableButton from '@cip/components/cip-table-button'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'

export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      width
    } = useFormInput(props, ctx)

    const tableColumns = computed(() => generateFieldList(defineTableFieldConfig({
      name: {
        outDependOn: ['fields'],
        writable: true,
        dynamic: true,
        type: 'select',
        asyncOptions: (_, { fields }) => {
          return (fields || [])
        },
        optionProps: {
          label: 'title',
          value: 'name'
        }
      },
      formula: {
        writable: true,
        dynamic: true,
        type: 'radio',
        options: [
          { label: '升序', value: 'ASC' },
          { label: '降序', value: 'DESC' }
        ]
      }
    })))

    function handleClick () {
      try {
        proxyValue.value.push({ name: '', formula: 'ASC' })
      } catch (err) {
        proxyValue.value = [{ name: '', formula: 'ASC' }]
      }
    }

    function handleDel ($index) {
      proxyValue.value.splice($index, 1)
    }

    return () => <>
      <CipTable
        dependOnValues={props.dependOnValues}
        showHeader={false}
        data={proxyValue.value || []}
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
      <CipButton onClick={handleClick}>添加</CipButton>
    </>
  }
})
