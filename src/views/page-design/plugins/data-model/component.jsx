import { ref, inject } from 'vue'
import { ElTree } from 'element-plus'

export default {
  props: {
    schema: {}
  },
  emits: ['update:schema'],
  setup (props, { emit }) {
    const treeRef = ref()
    const { schema } = inject('drDesign', {})
    return () => <div style={'padding: 0 12px;'}>
      <ElTree ref={treeRef} data={schema.dataModel || []} />
    </div>
  }
}
