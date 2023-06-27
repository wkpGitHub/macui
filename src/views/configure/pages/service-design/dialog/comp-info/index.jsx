import {
  defineComponent,
  ref,
  watch,
  onBeforeMount
} from 'vue'
import { CipForm } from 'd-render'
import CipDialog from '@cip/components/cip-dialog'
import { allCopms } from '../../comps'
import { cloneDeep } from '@cip/utils/util'

export default defineComponent({
  name: 'comp-info',
  props: {
    selectNode: {}
  },
  emits: ['update-node'],
  setup (props, { attrs, emit }) {
    const activeComp = ref({
      title: '',
      formField: []
    })

    let timer = null
    const model = ref({})
    watch(() => props.selectNode, () => {
      model.value = cloneDeep(props.selectNode)
      activeComp.value = allCopms.find(comp => comp.type === props.selectNode.type)
      // eslint-disable-next-line array-callback-return
      activeComp.value.formField.map(v => {
        v.config.changeEffect = async (value, key, model) => {
          // 节流更新
          if (timer) {
            clearTimeout(timer)
            timer = null
          }
          timer = setTimeout(() => {
            emit('update-node', model)
          }, 500)
        }
      })
    }, {
      deep: true
    })

    onBeforeMount(() => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    })
    return () => <CipDialog
      {...attrs}
      title={activeComp.value.title}
    >
      <CipForm v-model:model={model.value} fieldList={activeComp.value.formField}></CipForm>
    </CipDialog>
  }
})
