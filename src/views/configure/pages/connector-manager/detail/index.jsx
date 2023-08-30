import { computed, defineComponent, ref } from 'vue'
import { PlLeftRight as CipPageLayoutLeftRight, PlHandle as CipPageLayoutHandle } from '@cip/page-layout'
import { CipForm } from 'd-render'
import { CipButton } from '@xdp/button'
import { httpFormFieldList } from './config'

export default defineComponent({
  name: 'connector-manager',
  props: {
    connectorId: {},
    connectorType: {}
  },
  setup (props) {
    const model = ref({})

    function submit (resolve, reject) {
      console.log(model.value)
      resolve()
    }

    const formFieldList = computed(() => {
      return ({
        http: httpFormFieldList,
        email: []
      })[props.connectorType] || []
    })

    return () => <CipPageLayoutLeftRight>
      {{
        left: () => <>
          方法列表
        </>,
        default: () => <CipPageLayoutHandle>
          {{
            default: () => <CipForm
              v-model:model={model.value}
              fieldList={formFieldList.value}
              labelPosition='top'
            />,
            handle: ({ confirm, waiting }) => <>
              <CipButton type='primary' loading={waiting} onClick={() => { confirm(submit) }}>保存</CipButton>
            </>
          }}
        </CipPageLayoutHandle>
      }}
    </CipPageLayoutLeftRight>
  }
})
