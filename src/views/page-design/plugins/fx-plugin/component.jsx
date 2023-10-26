import { CipForm, generateFieldList } from 'd-render'

const methodsConfigFieldList = generateFieldList({
  methods: {
    type: 'simpleCurd',
    itemType: '方法',
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
        body: { label: '接口地址', type: 'codeMirror', mode: 'javascript' }
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
