import { CipButton } from '@xdp/button'
import CipButtonText from '@cip/components/cip-button-text'
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

    const columns = generateFieldList({
      name: { label: 'key', writable: true},
      title: { label: '描述', writable: true, width: 120},
      value: { label: '值', writable: true}
    })

    return () => <div style={'padding: 0 12px;'}>
      <CipTable columns={columns} data={props.schema.variables} withTableHandle handlerWidth="50px">{{
        $handler: ({$index}) => <CipButtonText onClick={() => props.schema.variables.splice($index, 1)}>删除</CipButtonText>
      }}</CipTable>
      <CipButton style="width: 100%" onClick={addVariables}>新增页面变量</CipButton>
    </div>
  }
}
