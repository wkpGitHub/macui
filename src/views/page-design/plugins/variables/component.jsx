import { CipButton } from '@xdp/button'
import { CipTable, generateFieldList } from 'd-render'

export default {
  props: {
    schema: {}
  },
  emits: ['update:schema'],
  setup (props, { emit }) {
    function addVariables () {
      /* eslint-disable */
      if (props.schema.variables) {
        props.schema.variables.push({name: '', title: '', value: ''})
      } else {
        props.schema.variables = [{name: '', title: '', value: ''}]
      }
    }

    function removevariables(i) {
      props.schema.variables.splice(i, 1)
    }

    const columns = generateFieldList({
      name: { label: 'key', writable: true},
      title: { label: '描述', writable: true},
      value: { label: '值', writable: true}
    })

    return () => <div style={'padding: 0 12px;'}>
      <CipTable columns={columns} data={props.schema.variables} />
      <CipButton style="width: 100%" onClick={addVariables}>新增页面变量</CipButton>
    </div>
  }
}
