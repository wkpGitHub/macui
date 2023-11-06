import { CipForm, generateFieldList } from 'd-render'

const methodsConfigFieldList = generateFieldList({
  apiList: {
    type: 'simpleCurd',
    itemType: '接口',
    itemKey: 'name',
    infoRender: (h, { item }) => {
      return h('div', null, [item.name])
    },
    dialogProps: {
      size: 'small'
    },
    formProps: {
      fieldList: generateFieldList({
        name: { label: '接口名称' },
        httpMethod: {
          label: '请求方式',
          type: 'select',
          options: [
            'GET', 'POST'
          ]
        },
        fullPath: { label: '接口地址' },
        apiId: {
          hideItem: true,
          dependOn: ['fullPath'],
          changeValue () {
            return { value: Math.random().toString(16).substring(2, 10) }
          }
        },
        objId: {
          hideItem: true,
          dependOn: ['apiId'],
          changeValue ({ apiId }) {
            return { value: apiId }
          }
        },
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
