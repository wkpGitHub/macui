import { defineComponent } from 'vue'
import CipButton from '@cip/components/cip-button'
import CipMessage from '@cip/components/cip-message'
import { formInputEmits, formInputProps, useFormInput } from '@d-render/shared'
import { sqlHelperService } from '@/api/service/base/sql'

export default defineComponent({
  props: formInputProps,
  emits: formInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      width
    } = useFormInput(props, ctx)

    async function handleClick () {
      const { dbId, sql } = props.dependOnValues || {}
      if (!dbId) {
        CipMessage.error('请选择数据源')
        return
      }
      if (!sql) {
        CipMessage.error('请输入Sql语句')
        return
      }
      const { data: outParams } = await sqlHelperService.getSelectFields({
        dbId,
        sql: sql
      })
      const { data: params } = await sqlHelperService.getVariable({
        dbId,
        sql: sql
      })
      proxyValue.value = {
        outParams: outParams || [],
        params: (params || []).map(v => ({ name: v }))
      }
    }

    return () =>
      <div style={{ width: width.value }}>
        <CipButton type='primary' onClick={handleClick}>解析Sql语句</CipButton>
      </div>
  }
})
