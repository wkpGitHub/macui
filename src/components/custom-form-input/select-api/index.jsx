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
      debugger
      if (drDesign.schema.apiList) {
        const pageMethod = drDesign.schema.apiList.find(m => m.objId === row.id)
        if (pageMethod) {
          Object.assign(pageMethod, {
            method: row.apiType === 'query' ? 'get' : 'post',
            objId: row.id,
            fullPath: row.fullPath,
            query: []
          })
        } else {
          drDesign.schema.apiList.push({
            apiName: key,
            method: row.apiType === 'query' ? 'get' : 'post',
            objId: row.id,
            fullPath: row.fullPath,
            index: drDesign.schema.apiList.length - 1,
            query: []
          })
        }
      } else {
        drDesign.schema.apiList = [{
          apiName: key,
          method: row.apiType === 'query' ? 'get' : 'post',
          objId: row.id,
          fullPath: row.fullPath,
          index: 0,
          query: []
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
        updateApis: updateApis.bind(null, data),
        updateDataModel: updateDataModel.bind(null, v)
      })
    }
    return () => <ElCascader style="width: 100%" ref={casaderRef} v-model={proxyValue.value} options={state.data} props={optionProps} onChange={onChange} />
  }
}
