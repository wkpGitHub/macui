// import * as service from '@/api'
import { ref, reactive, computed, provide, watch } from 'vue'
import { setFieldValue } from '@d-render/shared'
import { useRouter, useRoute } from 'vue-router'
import * as sharedUtils from '@d-render/shared/utils/util'
import CipMessage from '@cip/components/cip-message'
import CipMessageBox from '@cip/components/cip-message-box'
import DrPage from './component.jsx'
const utils = sharedUtils
utils.$message = CipMessage
utils.$messageBox = CipMessageBox
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
    const route = useRoute()
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
        acc[v.name] = (new Function('model', 'service', 'dataBus', 'utils', 'options', v.body)).bind(acc, props.model, props.service, dataBus, utils)
        return acc
      }, {}) ?? {}
    })
    const init = computed(() => securityScheme.value.init)
    watch(() => props.scheme, (v) => {
      if (init.value) {
        init.value.forEach(key => {
          const method = methods.value[key]
          if (method) {
            method()
          }
        })
      }
      setRouterQuery(v)
    }, { immediate: true })
    const router = useRouter()

    // 设置路由参数
    function setRouterQuery (scheme) {
      const { query } = route
      const queryList = (scheme.routerQuery || []).map(r => r.value)
      const _query = {}
      Object.keys(query).forEach(key => {
        queryList.includes(key) && (_query[key] = query[key])
      })
      setFieldValue(props.model, 'routerQuery', _query)
    }

    provide('drPageRender', reactive({
      methods,
      router,
      dataBus
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
    />
  }
}
