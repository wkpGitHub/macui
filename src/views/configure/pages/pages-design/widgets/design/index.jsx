import { ref } from 'vue'
import PageDesign from '@/components/page-design'
export default {
  props: {
    scheme: { type: Object, default: () => ({}) }
  },
  emit: ['update:scheme'],
  setup (props, { emit }) {
    // const pageScheme = ref({})
    const model = ref({
    })

    return () => <div style={{ padding: '12px', height: '100%' }}>
      <PageDesign v-model:model={model.value} scheme={props.scheme} onUpdate:scheme={(val) => emit('update:scheme', val)}/>
    </div>
  }
}
