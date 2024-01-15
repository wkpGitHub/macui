// import * as service from '@lc/api'
import { ref, reactive, computed, provide, watch } from 'vue'
import { setFieldValue } from '@d-render/shared'
import { useRouter, useRoute } from 'vue-router'
import * as sharedUtils from '@d-render/shared/utils/util'
import CipMessage from '@cip/components/cip-message'
import CipMessageBox from '@cip/components/cip-message-box'
import DrPage from './component.jsx'
import axiosInstance from '@lc/views/app/pages/api'
import { getVarValue, handleEvent, downloadFile, getFxValue } from '@lc/components/d-render-plugin-page-render/use-event-configure'
const utils = sharedUtils
utils.$message = CipMessage
utils.$messageBox = CipMessageBox
utils.getVarValue = getVarValue
utils.getFxValue = getFxValue
export default {
  name: 'PageRender',
  props: {
    schema: { type: Object, default: () => ({}) },
    model: Object,
    service: Object,
    query: Object, // 被使用为组件，代替路由参数
    equipment: { type: String, default: 'pc' }
  },
  emits: ['update:model'],
  setup (props, { emit, expose }) {
    const route = useRoute()
    const securityScheme = computed(() => {
      return props.schema || {}
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
    watch(() => props.schema, (v) => {
      // 页面初始化自动执行的方法
      securityScheme.value.methods?.forEach(async v => {
        if (v.initRun) {
          const options = (v.args || []).reduce((total, current) => {
            if (current.name === '&') {
              const _obj = getVarValue(current.value, variables.value, props.model) || {}
              Object.assign(total, _obj)
            } else {
              total[current.name] = getVarValue(current.value, variables.value, props.model)
            }
            return total
          }, {})
          if (v.type === 'event') await handleEvent(v.events, drPageRender, options)
          else if (v.type === 'js') {
            // eslint-disable-next-line
            await new Function('model', 'service', 'dataBus', 'utils', 'options', v.body).call(null, props.model, props.service, dataBus, utils, options)
          }
        }
      })
      // setRouterQuery(v)
    }, { immediate: true })
    const router = useRouter()
    const variables = computed(() => {
      const _variables = { ...route.query, ...props.query }
      ;(securityScheme.value.variables || []).forEach((current) => {
        _variables[current.name] = _variables[current.name] || current.value
      })
      return _variables
    })

    const apiList = computed(() => {
      const _apiList = securityScheme.value.apiList.reduce((total, current) => {
        total[current.name] = function (options) {
          // const params = current.inputParams?.reduce((total, current) => {
          //   if (current.name === '&') {
          //     const _obj = getVarValue(current.value, variables.value, props.model) || {}
          //     Object.assign(total, _obj)
          //   } else {
          //     total[current.name] = getVarValue(current.value, variables.value, props.model)
          //   }
          //   return total
          // }, {})

          // const headers = current.headers?.reduce((total, current) => {
          //   if (current.name === '&') {
          //     const _obj = getVarValue(current.value, variables.value, props.model) || {}
          //     Object.assign(total, _obj)
          //   } else {
          //     total[current.name] = getVarValue(current.value, variables.value, props.model)
          //   }
          //   return total
          // }, {})

          const axiosArg = {
            url: current.fullPath,
            method: current.httpMethod,
            ...options
          }

          if (current.isFileDown) {
            axiosArg.responseType = 'blob'
            return axiosInstance(axiosArg).then(res => downloadFile(res))
          } else {
            return axiosInstance(axiosArg).then(({ data }) => {
              if (current.objId) {
                variables.value[current.objId] = data.data
              }
              return data.data || {}
            })
          }
        }
        return total
      }, {})

      return _apiList
    }, {})

    const drPageRender = reactive({
      methods,
      router,
      dataBus,
      variables,
      apiList,
      model: props.model,
      fieldList
    })

    provide('drPageRender', drPageRender)
    provide('cipForm', reactive({ equipment: props.equipment }))

    const drPageRef = ref()
    expose({
      drPageRef
    })

    return () => <DrPage
      ref={drPageRef}
      model={props.model}
      onUpdate:model={val => emit('update:model', val)}
      fieldList={fieldList.value}
      equipment={props.equipment}
      grid={grid.value}
    />
  }
}
