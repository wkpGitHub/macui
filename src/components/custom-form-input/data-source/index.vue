<template>
  <div :style="{width}">
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
      onChange="" />
  </div>
</template>
<script>
import { ElCascader } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput, useOptions } from '@d-render/shared'
import { computed, ref } from 'vue'
export default {
  components: { ElCascader },
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const cascader = ref()
    const { securityConfig, proxyValue, updateStream, ...formInput } = useFormInput(props, context, {
      fromModelValue: (modelValue) => getValue(modelValue),
      toModelValue: (value) => {
        const modelValue = getModelValue(value)
        if (otherKey.value) {
          const node = cascader.value.getCheckedNodes()
          const fields = node[0].data.fields
          // const otherValue = node.map(i => i.data[optionProps.value.label]).join(splitKey.value)
          updateStream.appendOtherValue(fields)
        }
        return modelValue
      },
      maxOtherKey: 2
    })
    // 是否多选,ElCascader的多选比较特殊,multiple是在props里面,所以特殊处理
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })
    const { options, getValue, getModelValue } = useOptions(props, multiple, updateStream)
    const showAllLevels = computed(() => {
      return securityConfig.value.showAllLevels
    })
    // const splitKey = computed(() => {
    //   return props.config?.splitKey ?? ','
    // })
    // 另一个键
    const otherKey = computed(() => {
      return securityConfig.value.otherKey ?? ''
    })
    // 过滤
    const filterable = computed(() => {
      return securityConfig.value.filterable ?? false
    })
    // 懒加载在optionProps中配置
    const optionProps = computed(() => {
      return {
        value: 'value',
        label: 'label',
        children: 'children',
        multiple: multiple.value,
        emitPath: false,
        ...securityConfig.value.optionProps
      }
    })
    const tempFields = [
      {
        name: 'id',
        ename: '主键',
        type: 'int'
      },
      {
        name: 'name',
        ename: '姓名',
        type: 'text'
      },
      {
        name: 'time',
        ename: '日期',
        type: 'date'
      }
    ]
    const tempOps = ref([
      {
        label: 'model',
        value: 'model',
        children: [
          {
            label: 'user',
            value: 'model:user',
            fields: securityConfig.value.fields || tempFields
          }
        ]
      }
    ])

    return {
      ...formInput,
      proxyValue,
      options,
      filterable,
      optionProps,
      showAllLevels,
      cascader,
      tempOps
    }
  }
}
</script>
