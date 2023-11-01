import { ref, reactive } from 'vue'
import { ElTree } from 'element-plus'

export default {
  props: {
    schema: {}
  },
  emits: ['update:schema'],
  setup (props, { emit }) {
    const treeRef = ref()
    const state = reactive({
      data: [
        {
          label: '查询接口',
          children: [
            {
              label: '入参',
              children: [
                { label: 'name' },
                { label: 'status' }
              ]
            },
            {
              label: '出参',
              children: [
                { label: 'name' },
                { label: 'status' }
              ]
            }
          ]
        },
        {
          label: '保存接口',
          children: [
            {
              label: '入参',
              children: [
                { label: 'name' },
                { label: 'status' }
              ]
            }
          ]
        }
      ]
    })
    return () => <div style={'padding: 0 12px;'}>
      <ElTree ref={treeRef} data={state.data} />
    </div>
  }
}
