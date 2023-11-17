import { ElSelect, ElOption } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { centerService } from '@/api'
import { reactive, inject, computed } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { CipButton } from '@xdp/button'
import { fieldList } from './config'
import { CipForm } from 'd-render'
import CipDialog from '@cip/components/cip-dialog'
import { getListConfigByKey, getListConfigByType } from '@/components/d-render-plugin-page-render/use-event-configure'

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
    const apiMap = computed(() => {
      return (drDesign.schema?.apiList || []).reduce((total, current) => {
        total[current.apiId] = current
        return total
      }, {})
    })

    function updateDataModel (data, { inputKey, outKey }) {
      const { outParams = [], inputParams = [] } = data.flow || {}
      let inputModel, outModel
      if (inputParams.length) {
        inputModel = {
          title: inputKey,
          name: inputKey,
          children: inputParams
        }
        drDesign.schema.dataModel.push(inputModel)
      }
      if (outParams.length) {
        outModel = {
          title: outKey,
          name: outKey,
          children: outParams
        }
        drDesign.schema.dataModel.push(outModel)
      }
      return { inputModel, outModel }
    }

    function onChange (value) {
      if (!value) return
      centerService.getContent(value).then(({ data }) => {
        props.config?.onChange({
          row: data,
          api: apiMap.value[value],
          schema: drDesign.schema,
          dependOn: props.dependOnValues,
          updateDataModel: updateDataModel.bind(null, data),
          getListConfigByKey,
          getListConfigByType
        })
      }).catch(() => {
        props.config?.onChange({
          row: {},
          api: apiMap.value[value],
          schema: drDesign.schema,
          dependOn: props.dependOnValues,
          updateDataModel: updateDataModel.bind(null, value),
          getListConfigByKey,
          getListConfigByType
        })
      })
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

    return () => <div style="width: 100%" class="flex">
      <ElSelect style="flex:auto" v-model={proxyValue.value} onChange={onChange} clearable>
        {drDesign.schema?.apiList?.map(api => <ElOption label={api.name} value={api.apiId} key={api.apiId} />)}
      </ElSelect>
      <CipButton class="ml-1" square icon={Plus} onClick={addApi}></CipButton>
      <CipDialog title="新增接口" v-model={state.isShow} onConfirm={saveItem} >
        <CipForm v-model:model={state.current} fieldList={fieldList}></CipForm>
      </CipDialog>
    </div>
  }
}
