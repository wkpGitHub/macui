import { ElSelect, ElOption, ElSwitch } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { reactive, inject } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { CipButton } from '@xdp/button'
import { fieldList } from './config'
import { CipForm, generateFieldList } from 'd-render'
import CipDialog from '@cip/components/cip-dialog'
import { getListConfigByKey, getListConfigByType } from '@/components/d-render-plugin-page-render/use-event-configure'
import axiosInstance from '@/views/app/pages/api'
import { cloneDeep } from '@cip/utils/util'
import FormTable from '@cip/d-render-plugin-cci/esm/input/basic/table'

export default {
  name: 'curd-config',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const state = reactive({
      isShow: false,
      current: {}
    })
    const { proxyValue } = useFormInput(props, ctx)

    const drDesign = inject('drDesign', {})

    // function updateDataModel (data, { inputKey, outKey }) {
    //   const { outParams = [], inputParams = [] } = data.flow || {}
    //   let inputModel, outModel
    //   if (inputParams.length) {
    //     inputModel = {
    //       title: inputKey,
    //       name: inputKey,
    //       children: inputParams
    //     }
    //     drDesign.schema.dataModel.push(inputModel)
    //   }
    //   if (outParams.length) {
    //     outModel = {
    //       title: outKey,
    //       name: outKey,
    //       children: outParams
    //     }
    //     drDesign.schema.dataModel.push(outModel)
    //   }
    //   return { inputModel, outModel }
    // }

    function fetchData (api, axiosArg = {}) {
      return axiosInstance({
        url: api.fullPath,
        method: api.httpMethod,
        ...axiosArg
      }).then(({ data }) => {
        return data.data
      })
    }

    function onChange (api) {
      proxyValue.value = cloneDeep(api)
      if (props.config?.onChange) {
        props.config?.onChange({
          api,
          schema: drDesign.schema,
          dependOn: props.dependOnValues,
          fetchData: fetchData.bind(null, api),
          getListConfigByKey,
          getListConfigByType
        })
      }
    }

    function saveItem (resolve) {
      const { current } = state
      if (drDesign.schema?.apiList) {
        drDesign.schema.apiList.push(current)
      } else {
        drDesign.schema.apiList = [current]
      }
      state.isShow = false
      resolve()
    }

    function addApi () {
      state.current = {}
      state.isShow = true
    }

    const tableConfig = {
      label: '参数',
      type: 'table',
      hideIndex: true,
      hideAdd: true,
      hideDelete: true,
      options: generateFieldList({
        name: { label: '变量名', writable: true },
        value: { label: '默认值', writable: true, type: 'pageFx' }
      })
    }

    function updateModelValue (key, v) {
      proxyValue.value[key] = v
    }

    return () => <>
      <div style="width: 100%" class="flex">
        <ElSelect style="flex:auto" modelValue={proxyValue.value} onChange={onChange} clearable value-key="apiId">
          {drDesign.schema?.apiList?.map(api => <ElOption label={api.name} value={api} key={api.apiId} />)}
        </ElSelect>
        <CipButton class="ml-1" square icon={Plus} onClick={addApi}></CipButton>
      </div>
      {!props.config.hideInputParams && <>
        <div class="mt-1">入参</div>
        <FormTable modelValue={proxyValue.value?.inputParams || []} onUpdate:modelValue={v => updateModelValue('inputParams', v)} config={tableConfig} />
      </>}
      {!props.config.hideInitSearch && <>
        <div class="mt-1" style="width: 100%">是否初始拉取</div>
        <ElSwitch modelValue={proxyValue.value?.initSearch} onUpdate:modelValue={v => updateModelValue('initSearch', v)} />
      </>}
      <CipDialog title="新增接口" v-model={state.isShow} onConfirm={saveItem} >
        <CipForm v-model:model={state.current} fieldList={fieldList}></CipForm>
      </CipDialog>
    </>
  }
}
