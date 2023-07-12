// import * as service from '@/api'
import { ref, reactive, computed, provide, watch } from 'vue'
import { setFieldValue } from '@d-render/shared'
import { useRouter } from 'vue-router'
import * as utils from '@d-render/shared/utils/util'
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

    const dataBus = (target, data) => {
      // 目标数据， data
      console.log('define', target, data)
      // const model = toRaw(props.model) // 导致无响应
      const model = props.model
      setFieldValue(model, target, data)
      emit('update:model', model)
    }

    const methods = computed(() => {
      return securityScheme.value.methods?.reduce((acc, v) => {
        // eslint-disable-next-line no-new-func
        acc[v.name] = (new Function('model', 'service', 'dataBus', v.body)).bind(null, props.model, props.service, dataBus, utils)
        return acc
      }, {}) ?? {}
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
