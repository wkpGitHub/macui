// import * as service from '@/api'
import { ref, reactive, computed, provide, watch } from 'vue'
import { setFieldValue } from '@d-render/shared'
import { useRouter } from 'vue-router'
import * as sharedUtils from '@d-render/shared/utils/util'
import CipMessage from '@cip/components/cip-message'
import CipMessageBox from '@cip/components/cip-message-box'
import DrPage from './component.jsx'
import axiosInstance from '@/views/app/pages/api'
import { getVarValue } from '@/components/d-render-plugin-page-render/use-event-configure'
const utils = sharedUtils
utils.$message = CipMessage
utils.$messageBox = CipMessageBox
utils.getVarValue = getVarValue
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
    // const route = useRoute()
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
      const _methods = securityScheme.value.methods?.reduce((acc, v) => {
        acc[v.name] = {
          ...v,
          // eslint-disable-next-line no-new-func
          fn: (new Function('model', 'service', 'dataBus', 'utils', 'options', v.body)).bind(acc, props.model, props.service, dataBus, utils)
        }
        return acc
      }, {}) ?? {}
      setFieldValue(props.model, 'methods', _methods)
      return _methods
    })
    watch(() => props.scheme, (v) => {
      // 页面初始化自动执行的方法
      securityScheme.value.methods?.forEach(v => {
        if (v.initRun) {
          const options = (v.args || []).reduce((total, current) => {
            total[current.key] = current.value
            return total
          }, {})

          // eslint-disable-next-line
          new Function('model', 'service', 'dataBus', 'utils', 'options', v.body).call(null, props.model, props.service, dataBus, utils, options)
        }
      })
      // setRouterQuery(v)
    }, { immediate: true })
    const router = useRouter()

    // // 设置路由参数
    // function setRouterQuery (scheme) {
    //   const { query } = route
    //   const queryList = (scheme.routerQuery || []).map(r => r.value)
    //   const _query = {}
    //   Object.keys(query).forEach(key => {
    //     queryList.includes(key) && (_query[key] = query[key])
    //   })
    //   setFieldValue(props.model, 'routerQuery', _query)
    // }

    const variables = computed(() => {
      const _variables = securityScheme.value.variables.reduce((total, current) => {
        total[current.name] = current.value || ''
        return total
      }, {})

      return _variables
    })

    const apiList = computed(() => {
      const _apiList = securityScheme.value.apiList.reduce((total, current) => {
        total[current.name] = async function (options) {
          const params = current.inputParams.reduce((total, current) => {
            total[current.name] = getVarValue(current.value, variables.value)
            return total
          }, {})

          const headers = current.headers?.reduce((total, current) => {
            total[current.name] = getVarValue(current.value, variables.value)
            return total
          }, {})

          await axiosInstance({
            url: current.fullPath,
            method: current.httpMethod,
            headers,
            params
          }).then(({ data }) => {
            if (current.objId) {
              variables.value[current.objId] = data.data
            }
          })
        }
        return total
      }, {})

      return _apiList
    }, {})

    provide('drPageRender', reactive({
      methods,
      router,
      dataBus,
      variables,
      apiList
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
