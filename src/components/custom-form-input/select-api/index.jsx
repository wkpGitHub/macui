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

    function onChange (value) {
      centerService.getContent(value).then(({ data }) => {
        props.config?.onChange({
          row: data,
          api: apiMap.value[value],
          schema: drDesign.schema,
          dependOn: props.dependOnValues,
          updateDataModel: updateDataModel.bind(null, value),
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
      if (current.objId) {
        const varObj = { name: current.objId, title: `接口${current.name}返回的数据` }
        if (drDesign.schema.variables) {
          drDesign.schema.variables.push(varObj)
        } else {
          drDesign.schema.variables = [varObj]
        }
      }
      state.isShow = false
      resolve()
    }

    function addApi () {
      state.current = {}
      state.isShow = true
    }

    return () => <div style="width: 100%" class="flex">
      <ElSelect style="flex:auto" v-model={proxyValue.value} onChange={onChange}>
        {drDesign.schema?.apiList?.map(api => <ElOption label={api.name} value={api.apiId} key={api.apiId} />)}
      </ElSelect>
      <CipButton class="ml-1" square icon={Plus} onClick={addApi}></CipButton>
      <CipDialog title="新增接口" v-model={state.isShow} onConfirm={saveItem} >
        <CipForm v-model:model={state.current} fieldList={fieldList}></CipForm>
      </CipDialog>
    </div>
  }
}
