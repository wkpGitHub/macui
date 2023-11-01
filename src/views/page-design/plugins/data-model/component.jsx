import { ref } from 'vue'
import { ElTree } from 'element-plus'

export default {
  props: {
    schema: {}
  },
  emits: ['update:schema'],
  setup (props, { emit }) {
    const treeRef = ref()
    return () => <div style={'padding: 0 12px;'}>
      <ElTree ref={treeRef} data={props.schema.dataModel || []} />
    </div>
  }
}
