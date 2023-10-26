import { defineComponent, watch, reactive, computed, inject } from 'vue'
// import { ElInput, ElSelect, ElOption } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { CipForm, defineFormFieldConfig, generateFieldList } from 'd-render'
// import cipStore from '@cip/components/store'
import { apiConfigService, centerService } from '@/api/service/chr'
import { getItemConfig } from './config'

export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const state = reactive({
      apiOptions: [],
      formVal: {}
    })
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx, { maxOtherKey: 1 })

    const { scheme } = inject('pageDesignGloabal', {})
    function updateMethod (key, value) {
      if (!scheme) return
      if (scheme.methods) {
        const pageMethod = scheme.methods.find(m => m.name === key)
        if (pageMethod) {
          pageMethod.body = 'xxx'
        } else {
          scheme.methods.push({
            methodName: key,
            // 根据不同的key，生成不同的代码
            body: "service.page({params:{...model.searchFilter, ...model.page}}).then((res)=>{\n    dataBus('data', res.data.data.data)\n    console.log('data',res.data.data)\n    dataBus(key, res.data.data.page)\n    console.log(model.page)\n})",
            index: scheme.methods.length - 1,
            name: key
          })
        }
      } else {
        scheme.methods = [{
          methodName: key,
          // 根据不同的key，生成不同的代码
          body: "service.page({params:{...model.searchFilter, ...model.page}}).then((res)=>{\n    dataBus('data', res.data.data.data)\n    console.log('data',res.data.data)\n    dataBus('page', res.data.data.page)\n    console.log(model.page)\n})",
          index: 0,
          name: key
        }]
      }
    }

    function updateApis (key, value, { flow }) {
      if (!scheme) return
      const row = state.apiOptions.find(item => item.id === value) || {}
      if (scheme.apiList) {
        const pageMethod = scheme.apiList.find(m => m.apiName === key)
        if (pageMethod) {
          Object.assign(pageMethod, {
            method: row.apiType === 'query' ? 'get' : 'post',
            fullPath: row.fullPath,
            query: flow.inputParams.map(item => ({ name: item.name }))
          })
        } else {
          scheme.apiList.push({
            apiName: key,
            method: row.apiType === 'query' ? 'get' : 'post',
            fullPath: row.fullPath,
            index: scheme.apiList.length - 1,
            query: flow.inputParams.map(item => ({ name: item.name }))
          })
        }
      } else {
        scheme.apiList = [{
          apiName: key,
          method: row.apiType === 'query' ? 'get' : 'post',
          fullPath: row.fullPath,
          index: 0,
          query: flow.inputParams.map(item => ({ name: item.name }))
        }]
      }
    }

    function updateSearch (config) {
      if (config.search) {
        const pageEvent = config.search.find(s => s.methods === 'page')
        if (!pageEvent) {
          config.search.push({
            eventType: 'method',
            eventName: '函数',
            methods: 'page'
          })
        }
      } else {
        config.search = [{
          eventType: 'method',
          eventName: '函数',
          methods: 'page'
        }]
      }
    }

    watch(() => props.dependOnValues, v => {
      console.log(v, proxyValue.value)
    })
    apiConfigService.list({ pid: '', isApi: true }).then(({ data }) => {
      state.apiOptions = data
    })

    const fieldList = computed(() => generateFieldList(defineFormFieldConfig({
      save: {
        label: '保存接口',
        type: 'select',
        options: state.apiOptions.filter(opt => opt.apiType === 'save'),
        optionProps: {
          label: 'fullPath',
          value: 'id'
        },
        changeEffect (value, key) {
          if (!value) return
          // TODO: 给新增弹窗保存按钮加接口，尽量加，可能无法完全覆盖
          centerService.getContent(value).then(({ data }) => {
            const { inputParams = [] } = data.flow || {}
            const dialogChildren = proxyValue.value.find(opt => opt.key === 'dialog')?.children
            if (dialogChildren?.length && inputParams.length) {
              const dialogOpts = dialogChildren[0].config.options
              const formSlots = dialogOpts.find(opt => opt.key === 'default')?.children
              if (!formSlots?.length) return
              formSlots[0].config.options[0].children = inputParams.map(opt => getItemConfig(opt))
            }
          })
        }
      },
      del: {
        label: '删除接口',
        type: 'select',
        options: state.apiOptions.filter(opt => opt.apiType === 'delete'),
        optionProps: {
          label: 'fullPath',
          value: 'id'
        },
        changeEffect () {
          // TODO：给批量删除接口，加接口
        }
      },
      search: {
        label: '查询接口',
        type: 'select',
        options: state.apiOptions.filter(opt => opt.apiType === 'query'),
        optionProps: {
          label: 'fullPath',
          value: 'id'
        },
        changeEffect (value, key) {
          if (!value) return
          // TODO：给查询按钮加接口
          // 给 scheme.methods添加方法
          updateMethod('page', value)
          centerService.getContent(value).then(({ data }) => {
            updateApis('page', value, data)
            const { outParams = [], inputParams = [] } = data.flow || {}
            const filterChildren = proxyValue.value.find(opt => opt.key === 'filter')?.children
            if (filterChildren?.length && inputParams.length) {
              const filterOpts = filterChildren[0].config.options
              filterOpts[0].children = inputParams.map(opt => getItemConfig(opt))
              updateSearch(filterChildren[0].config)
            }
            const defaultChildren = proxyValue.value.find(opt => opt.key === 'default')?.children
            if (defaultChildren?.length && outParams.length) {
              const defaultOpts = defaultChildren[0].config.options
              defaultOpts[0].children = outParams.map(opt => getItemConfig(opt))
            }
          })
        }
      }
    })))

    return () => {
      const { usingSlots } = props.dependOnValues
      return <div class="curd-config__container" style="width: 100%">
        <CipForm v-model:model={proxyOtherValue[0].value} fieldList={fieldList.value} />
        {usingSlots.includes('filter')}
        {usingSlots.includes('default')}
      </div>
    }
  }
})
