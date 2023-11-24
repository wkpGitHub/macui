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
    formProps: {
      fieldList: generateFieldList({
        name: { label: '方法名称' },
        initRun: { label: '自执行', type: 'switch' },
        type: {
          label: '执行类型',
          type: 'radio',
          options: [{ label: '事件', value: 'event' }, { label: 'js代码', value: 'js' }],
          defaultValue: 'event'
        },
        events: {
          type: 'eventConfig',
          label: '函数事件',
          dependOn: ['type'],
          readable: false,
          changeConfig (config, { type }) {
            if (type === 'event') {
              config.writable = true
              config.readable = true
            }
            return config
          }
        },
        args: {
          label: '参数',
          type: 'table',
          options: tableColumns,
          readable: false,
          changeConfig (config, { type }) {
            if (type === 'js') {
              config.writable = true
              config.readable = true
            }
            return config
          }
        },
        body: {
          label: '函数体',
          description: 'js代码中使用model.options获取参数，参数是个数组',
          type: 'codeMirror',
          mode: 'javascript',
          dependOn: ['type'],
          readable: false,
          changeConfig (config, { type }) {
            if (type === 'js') {
              config.writable = true
              config.readable = true
            }
            return config
          }
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
