import { CipButton } from '@xdp/button'
import CipButtonText from '@cip/components/cip-button-text'
import { CipTable, generateFieldList } from 'd-render'
import { v4 as uuidv4 } from 'uuid'

export default {
  props: {
    schema: {}
  },
  emits: ['update:schema'],
  setup (props, { emit }) {
    function addVariables () {
      /* eslint-disable */
      if (props.schema.variables) {
        props.schema.variables.push({name: '', value: '', id: uuidv4()})
      } else {
        props.schema.variables = [{name: '', value: '', id: uuidv4()}]
      }
    }

    const columns = generateFieldList({
      name: { label: '变量名', writable: true},
      value: { label: '默认值', writable: true}
    })

    return () => <div style={'padding: 0 12px;'}>
      <CipTable columns={columns} data={props.schema.variables} withTableHandle handlerWidth="50px" rowKey="id">{{
        $handler: ({$index}) => <CipButtonText onClick={() => props.schema.variables.splice($index, 1)}>删除</CipButtonText>
      }}</CipTable>
      <CipButton style="width: 100%" onClick={() => addVariables('inner')}>新增外部变量</CipButton>
    </div>
  }
}
