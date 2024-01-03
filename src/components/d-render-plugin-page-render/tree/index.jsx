import { defineComponent, reactive, ref, watch, inject } from 'vue'
import { ElTree, ElInput } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput, useOptions } from '@d-render/shared'
import { useEventConfigure, useWatch, getFxValue } from '../use-event-configure'
import axiosInstance from '@lc/views/app/pages/api'

export default defineComponent({
  name: 'tree',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const drPageRender = inject('drPageRender', {})
    const {
      proxyValue,
      securityConfig,
      updateStream
    } = useFormInput(props, ctx)
    // const drDesign = inject('drDesign')

    useWatch(proxyValue, securityConfig)

    const treeRef = ref()

    const state = reactive({
      data: []
    })
    const { optionProps } = useOptions(props, false, updateStream)

    function transformOptions (list) {
      return list.map(item => {
        const _item = { [optionProps.value.label]: item.label, [optionProps.value.value]: getFxValue(item.value, drPageRender) }
        if (item.children) {
          _item.children = transformOptions(item.children)
        }
        return _item
      })
    }
    watch(() => securityConfig.value.optApiConfig, optApiConfig => {
      switch (optApiConfig?.optType) {
        case 'custom': state.data = transformOptions(securityConfig.value.options)
          break
        case 'http': axiosInstance({ url: optApiConfig.optHttp }).then(({ data }) => { state.data = data.data.list })
          break
        case 'ctx': state.data = getFxValue(optApiConfig.optCtxVar, drPageRender)
      }
    }, { immediate: true })
    const handleEvent = useEventConfigure()
    function onNodeClick (data) {
      proxyValue.value = data[securityConfig.value.nodeKey || 'id']
      handleEvent(securityConfig.value.events?.click?.value || [], `${securityConfig.value.key}_click`, data[securityConfig.value.nodeKey])
    }

    const filterNode = (value, data) => {
      if (!value) return true
      return data.label.includes(value)
    }

    watch(() => state.filterText, (val) => {
      treeRef.value?.filter(val)
    })

    // if (drDesign) {
    //   if (drDesign.schema.methods) {
    //     const nodeClickMethod = drDesign.schema.methods?.find(m => m.name === 'nodeClick')
    //     if (!nodeClickMethod) {
    //       drDesign.schema.methods?.push({
    //         name: 'nodeClick',
    //         body: 'model.methods.page(options[0])'
    //       })
    //     }
    //   } else {
    //     drDesign.schema.methods = [{
    //       name: 'nodeClick',
    //       body: 'model.methods.page(options[0])'
    //     }]
    //   }
    // }

    return () => <div style="padding: 12px 16px">
      <ElInput v-model={state.filterText} placeholder="请输入关键字过滤" class="mb-3" />
      <ElTree
        ref={treeRef}
        data={state.data}
        highlightCurrent
        props={securityConfig.value.optionProps}
        draggable={securityConfig.value.draggable}
        node-key={securityConfig.value.nodeKey || 'id'}
        default-expand-all={securityConfig.value.defaultExpandAll}
        filter-node-method={filterNode}
        onNodeClick={onNodeClick}
      />
    </div>
  }
})
