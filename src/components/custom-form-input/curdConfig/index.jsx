import { defineComponent, watch, reactive, computed, inject } from 'vue'
// import { ElInput, ElSelect, ElOption } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { CipForm, defineFormFieldConfig, generateFieldList } from 'd-render'
// import cipStore from '@cip/components/store'
import { apiConfigService, centerService } from '@/api/service/chr'
import { getItemConfig } from './config'

export default defineComponent({
  name: 'curd-config',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const state = reactive({
      apiOptions: [],
      formVal: {}
    })
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx, { maxOtherKey: 2 })

    const { schema } = inject('drDesign', {})
    function updateMethod (key, value, { filterChildren, defaultChildren, paginationChildren }) {
      if (!schema) return
      const filterKey = filterChildren[0].key
      const dataKey = defaultChildren[0].key
      const pageSize = paginationChildren[0].key
      const [pageNum, total] = paginationChildren[0]?.config?.otherKey || {}
      const fnBody = `const page = {pageNum: model.${pageNum} || 1, pageSize: model.${pageSize} || 10}
service.page({params:{...model.${filterKey}, ...page}}).then((res)=>{
    const {list, page} = res.data
    dataBus('${dataKey}', list)
    dataBus('${pageSize}', page.pageSize)
    dataBus('${pageNum}', page.pageNum)
    dataBus('${total}', page.total)
})
      `
      if (schema.methods) {
        const pageMethod = schema.methods.find(m => m.name === key)
        if (pageMethod) {
          pageMethod.body = fnBody
        } else {
          schema.methods.push({
            methodName: key,
            // 根据不同的key，生成不同的代码
            body: fnBody,
            index: schema.methods.length - 1,
            name: key
          })
        }
      } else {
        schema.methods = [{
          methodName: key,
          // 根据不同的key，生成不同的代码
          body: fnBody,
          index: 0,
          name: key
        }]
      }
    }

    function updateApis (key, value, { flow }) {
      if (!schema) return
      const row = state.apiOptions.find(item => item.id === value) || {}
      if (schema.apiList) {
        const pageMethod = schema.apiList.find(m => m.apiName === key)
        if (pageMethod) {
          Object.assign(pageMethod, {
            method: row.apiType === 'query' ? 'get' : 'post',
            fullPath: row.fullPath,
            query: flow.inputParams.map(item => ({ name: item.name }))
          })
        } else {
          schema.apiList.push({
            apiName: key,
            method: row.apiType === 'query' ? 'get' : 'post',
            fullPath: row.fullPath,
            index: schema.apiList.length - 1,
            query: flow.inputParams.map(item => ({ name: item.name }))
          })
        }
      } else {
        schema.apiList = [{
          apiName: key,
          method: row.apiType === 'query' ? 'get' : 'post',
          fullPath: row.fullPath,
          index: 0,
          query: flow.inputParams.map(item => ({ name: item.name }))
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
              const _children = inputParams.map(({ title, name }) => ({ label: `${title}【${name}】`, value: name }))
              const searchModel = schema.dataModel.find(item => item.value === 'save')
              if (searchModel) {
                searchModel.children = _children
              } else {
                schema.dataModel.push({
                  label: '保存接口',
                  value: 'save',
                  children: _children
                })
              }
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
          // 给 schema.methods添加方法
          const filterChildren = proxyValue.value.find(opt => opt.key === 'filter')?.children || []
          const defaultChildren = proxyValue.value.find(opt => opt.key === 'default')?.children || []
          const paginationChildren = proxyValue.value.find(opt => opt.key === 'pagination')?.children || []
          updateMethod('page', value, { filterChildren, defaultChildren, paginationChildren })
          centerService.getContent(value).then(({ data }) => {
            const fieldMap = {}
            updateApis('page', value, data)
            const { outParams = [], inputParams = [] } = data.flow || {}
            if (filterChildren?.length && inputParams.length) {
              const filterOpts = filterChildren[0].config.options
              filterOpts[0].children = inputParams.map(opt => getItemConfig(opt))
              inputParams.reduce((total, { name, title }) => {
                total[name] = { label: `${title}【${name}】`, value: name }
                return total
              }, fieldMap)
            }
            if (defaultChildren?.length && outParams.length) {
              const defaultOpts = defaultChildren[0].config.options
              defaultOpts[0].children = outParams.map(opt => getItemConfig(opt))
              outParams.reduce((total, { name, title }) => {
                total[name] = { label: `${title}【${name}】`, value: name }
                return total
              }, fieldMap)
            }
            const searchModel = schema.dataModel.find(item => item.value === 'search')
            if (searchModel) {
              searchModel.children = Object.values(fieldMap)
            } else {
              schema.dataModel.push({
                label: '查询接口',
                value: 'search',
                children: Object.values(fieldMap)
              })
            }
          })
        }
      }
    })))

    return () => <div class="curd-config__container" style="width: 100%">
    <CipForm v-model:model={proxyOtherValue[0].value} fieldList={fieldList.value} />
  </div>
  }
})
