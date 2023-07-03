// import * as service from '@/api'
import { ref, reactive, computed, provide, watch } from 'vue'
import { setFieldValue } from '@d-render/shared'
import DrPage from './component.jsx'
export default {
  name: 'PageRender',
  props: {
    scheme: Object,
    model: Object,
    service: Object,
    equipment: { type: String, default: 'pc' }
  },
  emits: ['update:model'],
  setup (props, { emit, expose }) {
    const fieldList = computed(() => props.scheme.list || [])
    const grid = computed(() => props.scheme.grid || 1)
    const methods = computed(() => {
      return Object.keys(props.scheme.methods || {}).reduce((acc, key) => {
        // eslint-disable-next-line no-new-func
        acc[key] = (new Function('model', 'service', props.scheme.methods[key])).bind(null, props.model, props.service)
        return acc
      }, {})
    })
    const init = computed(() => props.scheme.init)
    watch(() => props.scheme, () => {
      if (init.value) {
        init.value.forEach(key => {
          const method = methods.value[key]
          if (method) {
            method()
          }
        })
      }
    }, { immediate: true })
    provide('drPageRender', reactive({
      methods
    }))
    const dataBus = (target, data) => {
      // 目标数据， data
      console.log('define', target, data)
      // const model = toRaw(props.model) // 导致无响应
      const model = props.model
      setFieldValue(model, target, data)
      emit('update:model', model)
    }
    const drPageRef = ref()
    expose({
      drPageRef
    })
    console.log('props.schema', props.schema)
    return () => <DrPage
      ref={drPageRef}
      model={props.model}
      onUpdate:model={(val) => emit('update:model', val)}
      fieldList={fieldList.value}
      equipment={props.equipment}
      grid={grid.value}
      dataBus={dataBus}
    />
  }
}
