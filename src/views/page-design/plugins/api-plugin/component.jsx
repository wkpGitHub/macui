import { CipForm, generateFieldList } from 'd-render'

const methodsConfigFieldList = generateFieldList({
  apiList: {
    type: 'simpleCurd',
    itemType: '接口',
    itemKey: 'apiName',
    infoRender: (h, { item }) => {
      return h('div', null, [item.apiName])
    },
    dialogProps: {
      size: 'small'
    },
    formProps: {
      fieldList: generateFieldList({
        apiName: { label: '接口名称' },
        method: {
          label: '请求方式',
          type: 'select',
          options: [
            'get', 'post', 'put', 'delete'
          ]
        },
        fullPath: { label: '接口地址' },
        query: {
          type: 'table',
          rowKey: 'id',
          options: generateFieldList({
            name: { label: '键', writable: true }
          })
        }
      })
    }
  }

})

export default {
  props: {
    schema: {}
  },
  emits: ['update:schema'],
  setup (props, { emit }) {
    return () => <div style={'padding: 0 12px;'}>
      <CipForm
        model={props.schema}
        onUpdate:model={(v) => {
          emit('update:schema', v)
        }}
        fieldList={methodsConfigFieldList}
      />
    </div>
  }
}
