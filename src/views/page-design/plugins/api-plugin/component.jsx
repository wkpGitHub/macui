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
        fullPath: { label: '接口地址' },
        httpMethod: {
          label: '请求方式',
          type: 'select',
          defaultValue: 'GET',
          options: [
            'GET', 'POST'
          ]
        },
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
        headers: {
          label: '请求头【key为&，将解构整个对象】',
          type: 'table',
          options: generateFieldList({
            name: { label: 'key', writable: true },
            value: { label: 'value', writable: true, type: 'pageVar' }
          })
        },
        inputParams: {
          label: '发送数据【key为&，将解构整个对象】',
          type: 'table',
          options: generateFieldList({
            name: { label: 'key', writable: true },
            value: { label: 'value', writable: true, type: 'pageVar' }
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
