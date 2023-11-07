import { CipForm, generateFieldList } from 'd-render'

const tableColumns = generateFieldList({
  key: { label: '参数' },
  value: { label: '默认值' }
})

const methodsConfigFieldList = generateFieldList({
  methods: {
    type: 'simpleCurd',
    itemType: '函数',
    itemKey: 'name',
    infoRender: (h, { item }) => {
      return h('div', null, [item.name])
    },
    dialogProps: {
      size: 'default'
    },
    formProps: {
      fieldList: generateFieldList({
        name: { label: '方法名称' },
        initRun: { label: '自执行', type: 'switch' },
        args: {
          label: '参数',
          type: 'table',
          options: tableColumns
        },
        body: { label: '函数体', type: 'codeMirror', mode: 'javascript' }
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
