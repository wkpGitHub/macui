<template>

    <el-cascader
      v-model="proxyValue"
      ref="cascader"
      :placeholder="placeholder"
      :options="tempOps"
      :show-all-levels="showAllLevels"
      :props="optionProps"
      :disabled="disabled"
      :filterable="filterable"
      :style="{width}"
      popper-class="cip-popper-class"
      :clearable="clearable"
      @change="changeModelData" />

</template>
<script>
import { ElCascader } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput, useOptions } from '@d-render/shared'
import { computed, ref } from 'vue'
import { dataInfoService } from '@/api'
export default {
  components: { ElCascader },
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const cascader = ref()
    const { securityConfig, proxyValue, proxyOtherValue, updateStream, ...formInput } = useFormInput(props, context, { maxOtherKey: 2 })
    // 是否多选,ElCascader的多选比较特殊,multiple是在props里面,所以特殊处理
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })
    const { options } = useOptions(props, multiple, updateStream)
    const showAllLevels = computed(() => {
      return securityConfig.value.showAllLevels
    })

    // 过滤
    const filterable = computed(() => {
      return securityConfig.value.filterable ?? false
    })

    // 懒加载在optionProps中配置
    const optionProps = computed(() => {
      return {
        value: 'id',
        label: 'name',
        children: 'children',
        multiple: multiple.value,
        emitPath: false,
        ...securityConfig.value.optionProps
      }
    })

    const tempOps = ref([])
    dataInfoService.tree({ withBasic: false }).then(({ data }) => {
      tempOps.value = data?.datasources || []
    })

    function changeModelData (id) {
      if (id) {
        dataInfoService.detail({ id }).then(({ data }) => {
          proxyOtherValue[0].value = data?.fields || []
        })
      } else {
        proxyOtherValue[0].value = []
      }
    }

    return {
      ...formInput,
      proxyValue,
      options,
      filterable,
      optionProps,
      showAllLevels,
      cascader,
      tempOps,
      changeModelData
    }
  }
}
</script>
