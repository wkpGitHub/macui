import { ElCascader } from 'element-plus'
import { apiConfigService, centerService } from '@/api'
import { reactive, inject, ref } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'

export default {
  name: 'curd-config',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const optionProps = {
      label: 'name',
      value: 'id',
      emitPath: false
    }

    const casaderRef = ref()

    const state = reactive({
      apiOptions: [],
      formVal: {}
    })
    const { proxyValue } = useFormInput(props, ctx)

    const drDesign = inject('drDesign', {})
    apiConfigService.tree({ }).then(({ data }) => {
      state.data = data
    })

    function updateApis (row, key) {
      if (!drDesign.schema) return
      if (drDesign.schema.apiList) {
        const pageMethod = drDesign.schema.apiList.find(m => m.name === key)
        if (pageMethod) {
          Object.assign(pageMethod, {
            httpMethod: row.apiType === 'query' ? 'GET' : 'POST',
            objId: row.id,
            apiId: row.id,
            fullPath: row.fullPath,
            query: []
          })
        } else {
          drDesign.schema.apiList.push({
            name: key,
            httpMethod: row.apiType === 'query' ? 'GET' : 'POST',
            objId: row.id,
            apiId: row.id,
            fullPath: row.fullPath,
            // index: drDesign.schema.apiList.length - 1,
            query: []
          })
        }
      } else {
        drDesign.schema.apiList = [{
          name: key,
          httpMethod: row.apiType === 'query' ? 'GET' : 'POST',
          objId: row.id,
          apiId: row.id,
          fullPath: row.fullPath,
          // index: 0,
          query: []
        }]
      }
    }

    function updateMethod (key, body, initRun = false) {
      const { options } = props.dependOnValues
      if (!drDesign.schema || !options) return
      let fnBody = ''
      if (body) {
        fnBody = body
      } else {
        // 根据不同的key，生成不同的代码
        if (key === 'page') {
          const filterChildren = options.find(opt => opt.key === 'filter')?.children || []
          const defaultChildren = options.find(opt => opt.key === 'default')?.children || []
          const paginationChildren = options.find(opt => opt.key === 'pagination')?.children || []
          const filterKey = filterChildren[0].key
          const dataKey = defaultChildren[0].key
          const pageSize = paginationChildren[0].key
          const [pageNum, total] = paginationChildren[0]?.config?.otherKey || {}
          fnBody = `const page = {pageNum: model.${pageNum} || 1, pageSize: model.${pageSize} || 10}
options && (model.options = options)
service.page({params:{...model.${filterKey}, ...page, ...model.routerQuery, ...model.options}}).then((res)=>{
    const {list, page} = res.data.data
    dataBus('${dataKey}', list)
    dataBus('${pageSize}', page.pageSize)
    dataBus('${pageNum}', page.pageNum)
    dataBus('${total}', page.total)
})
      `
        }
      }

      if (drDesign.schema.methods) {
        const pageMethod = drDesign.schema.methods.find(m => m.name === key)
        if (pageMethod) {
          pageMethod.body = fnBody
        } else {
          drDesign.schema.methods.push({
            methodName: key,
            initRun,
            // 根据不同的key，生成不同的代码
            body: fnBody,
            index: drDesign.schema.methods.length - 1,
            name: key
          })
        }
      } else {
        drDesign.schema.methods = [{
          methodName: key,
          // 根据不同的key，生成不同的代码
          body: fnBody,
          initRun,
          index: 0,
          name: key
        }]
      }
    }

    function updateDataModel (value, label) {
      centerService.getContent(value).then(({ data }) => {
        const fieldMap = {}
        const { outParams = [], inputParams = [] } = data.flow || {}
        inputParams.reduce((total, { name, title }) => {
          total[name] = { label: `${title}【${name}】`, value: name }
          return total
        }, fieldMap)
        outParams.reduce((total, { name, title }) => {
          total[name] = { label: `${title}【${name}】`, value: name }
          return total
        }, fieldMap)
        const oldItem = drDesign.schema.dataModel.find(item => item.label === label)
        if (oldItem) {
          oldItem.children = Object.values(fieldMap)
        } else {
          drDesign.schema.dataModel.push({
            label,
            value: Math.random().toString(16).substring(2, 10),
            children: Object.values(fieldMap)
          })
        }
      })
    }

    function onChange (v) {
      const { data } = casaderRef.value.getCheckedNodes(true)[0] || {}
      props.config?.onChange({
        row: data,
        schema: drDesign.schema,
        dependOn: props.dependOnValues,
        updateApis: updateApis.bind(null, data),
        updateDataModel: updateDataModel.bind(null, v),
        updateMethod
      })
    }
    return () => <ElCascader style="width: 100%" ref={casaderRef} v-model={proxyValue.value} options={state.data} props={optionProps} onChange={onChange} />
  }
}
