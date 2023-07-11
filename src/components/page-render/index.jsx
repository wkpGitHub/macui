// import * as service from '@/api'
import { ref, reactive, computed, provide, watch } from 'vue'
import { setFieldValue } from '@d-render/shared'
import { useRouter } from 'vue-router'
import DrPage from './component.jsx'
export default {
  name: 'PageRender',
  props: {
    scheme: { type: Object, default: () => ({}) },
    model: Object,
    service: Object,
    equipment: { type: String, default: 'pc' }
  },
  emits: ['update:model'],
  setup (props, { emit, expose }) {
    console.log(props.service)
    const securityScheme = computed(() => {
      return props.scheme || {}
    })
    const fieldList = computed(() => securityScheme.value.list || [])
    const grid = computed(() => securityScheme.value.grid || 1)
    const methods = computed(() => {
      return Object.keys(securityScheme.value.methods || {}).reduce((acc, key) => {
        // eslint-disable-next-line no-new-func
        acc[key] = (new Function('model', 'service', securityScheme.value.methods[key])).bind(null, props.model, props.service)
        return acc
      }, {})
    })
    const init = computed(() => securityScheme.value.init)
    watch(() => props.scheme, () => {
      if (init.value) {
        console.log(methods.value)
        init.value.forEach(key => {
          const method = methods.value[key]
          if (method) {
            method()
          }
        })
      }
    }, { immediate: true })
    const router = useRouter()
    provide('drPageRender', reactive({
      methods,
      router
    }))
    provide('cipForm', reactive({ equipment: props.equipment }))
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
