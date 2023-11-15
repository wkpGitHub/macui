import { CipForm, generateFieldList } from 'd-render'
import { fieldList } from '@/components/custom-form-input/select-api/config'

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
      fieldList
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
