import { ref } from 'vue'
import { CipForm } from 'd-render'
import { layoutProps } from '@d-render/shared'
import CipDialog from '@cip/components/cip-dialog'
// import { useComponentSlots } from '@lc/components/d-render-plugin-page-render/use-component-slots'
import { dataInfoService } from '@lc/api'
import { fieldList, fieldToConfig, generateFinalConfig } from './config'

import './index.less'

export default {
  props: layoutProps,
  emits: ['updateList'],
  setup (props, context) {
    // const { componentSlots } = useComponentSlots(props, context)

    const visible = ref(true)
    const formData = ref({
      entityId: props.config._entity.id,
      fields: []
    })

    const getFields = async () => {
      const res = await dataInfoService.detail({ id: formData.value.entityId })
      formData.value.fields = res.data.fields.map(item => {
        const label = item.title ? `${item.name} (${item.title})` : item.name
        return {
          ...item,
          value: item.name,
          label
        }
      })
    }
    getFields()

    const onConfirm = (resolve, reject) => {
      const searchFields = fieldToConfig(formData.value.searchFields)
      const tableFields = fieldToConfig(formData.value.tableFields)
      const dialogFields = fieldToConfig(formData.value.tableFields)
      const config = generateFinalConfig({ searchFields, tableFields, dialogFields })
      context.emit('updateList', config.list)
      resolve()
    }

    return () => {
      return <div>
        {/* {componentSlots.value.default?.()} */}
        <CipDialog
          title="选择字段"
          v-model={visible.value}
          onConfirm={onConfirm}
        >
          <CipForm
            v-model:model={formData.value}
            fieldList={fieldList}
          ></CipForm>
        </CipDialog>
      </div>
    }
  }
}
