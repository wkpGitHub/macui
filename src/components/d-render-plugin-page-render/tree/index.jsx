import { defineComponent, reactive, ref, watch, inject } from 'vue'
import { ElTree, ElInput } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { useEventConfigure } from '../use-event-configure'

export default defineComponent({
  name: 'select-field',
  props: {
    ...formInputProps,
    nodeClick: {}
  },
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      securityConfig
    } = useFormInput(props, ctx)

    const treeRef = ref()

    const state = reactive({
      data: [
        {
          label: 'Level one 1',
          children: [
            {
              label: 'Level two 1-1',
              children: [
                {
                  label: 'Level three 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: 'Level one 2',
          children: [
            {
              label: 'Level two 2-1',
              children: [
                {
                  label: 'Level three 2-1-1'
                }
              ]
            },
            {
              label: 'Level two 2-2',
              children: [
                {
                  label: 'Level three 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: 'Level one 3',
          children: [
            {
              label: 'Level two 3-1',
              children: [
                {
                  label: 'Level three 3-1-1'
                }
              ]
            },
            {
              label: 'Level two 3-2',
              children: [
                {
                  label: 'Level three 3-2-1'
                }
              ]
            }
          ]
        }
      ]
    })

    const handleEvent = useEventConfigure()
    function onNodeClick (...args) {
      handleEvent(securityConfig.value.nodeClick, args)
    }

    const filterNode = (value, data) => {
      if (!value) return true
      return data.label.includes(value)
    }

    watch(() => state.filterText, (val) => {
      treeRef.value?.filter(val)
    })

    const drDesign = inject('drDesign')
    if (drDesign) {
      if (drDesign.schema.methods) {
        const nodeClickMethod = drDesign.schema.methods?.find(m => m.name === 'nodeClick')
        if (!nodeClickMethod) {
          drDesign.schema.methods?.push({
            name: 'nodeClick',
            body: 'model.methods.page(options[0])'
          })
        }
      } else {
        drDesign.schema.methods = [{
          name: 'nodeClick',
          body: 'model.methods.page(options[0])'
        }]
      }
    }

    return () => <div style="padding: 12px 16px">
      <ElInput v-model={state.filterText} placeholder="请输入关键字过滤" class="mb-3" />
      <ElTree
        ref={treeRef}
        data={state.data}
        draggable={securityConfig.value.draggable}
        node-key={securityConfig.value.nodeKey || 'id'}
        default-expand-all={securityConfig.value.defaultExpandAll}
        filter-node-method={filterNode}
        onNodeClick={onNodeClick}
      />
    </div>
  }
})
