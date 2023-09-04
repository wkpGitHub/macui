import { defineComponent, ref, computed } from 'vue'
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

    const tempOps = ref([])
    dataInfoService.tree({ withBasic: false }).then(({ data }) => {
      tempOps.value = data?.datasources || []
    })

    return () => <div class="flex" style="width: 100%">
      <ElSelect v-model={proxyValue.value} style="width: 100%">
        {cipStore.state.dataType.map(opt => <ElOption key={opt.id} value={opt.id} label={opt.name} />)}
      </ElSelect>
      {proxyValue.value === 'ENTITY' && <ElCascader
        style="width: 100%"
        v-model={proxyOtherValue[0].value}
        options={tempOps.value}
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
