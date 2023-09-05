import { defineComponent, computed } from 'vue'
import { ElSelect, ElOption, ElCascader } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import cipStore from '@cip/components/store'
import { dataInfoService } from '@/api'

export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue, proxyOtherValue, securityConfig } = useFormInput(props, ctx, { maxOtherKey: 1 })
    const complexType = ['ENTITY', 'POJO']
    const showAllLevels = computed(() => {
      return securityConfig.value.showAllLevels
    })

    // 过滤
    const filterable = computed(() => {
      return securityConfig.value.filterable ?? false
    })

    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })

    let tempOps = []
    dataInfoService.tree({ withBasic: false }).then(({ data }) => {
      tempOps = data || {}
    })
    const cascaderOpts = computed(() => {
      if (proxyValue.value === 'ENTITY') {
        return tempOps?.datasources || []
      } else if (proxyValue.value === 'POJO') {
        return tempOps?.pojos || []
      } else {
        return []
      }
    })

    const opts = computed(() => {
      if (securityConfig.value.tableData) {
        const selectedType = securityConfig.value.tableData.find(item => complexType.includes(item.dataType))
        const list = cipStore.state.dataType.map(item => {
          const _item = { ...item }
          if (complexType.includes(_item.id)) {
            _item.disabled = !!selectedType && !complexType.includes(proxyValue.value)
          }
          return _item
        })
        return list
      } else {
        return cipStore.state.dataType
      }
    })

    return () => <div class="flex" style="width: 100%">
      <ElSelect v-model={proxyValue.value} style="width: 100%">
        {opts.value.map(opt => <ElOption key={opt.id} value={opt.id} label={opt.name} disabled={opt.disabled} />)}
      </ElSelect>
      {complexType.includes(proxyValue.value) && <ElCascader
        style="width: 100%"
        v-model={proxyOtherValue[0].value}
        options={cascaderOpts.value}
        show-all-levels={showAllLevels}
        props={{
          value: 'id',
          label: 'name',
          children: 'children',
          multiple: multiple.value,
          emitPath: false
        }}
        filterable={filterable}
        popper-class="cip-popper-class" />}
    </div>
  }
})
