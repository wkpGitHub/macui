<template>
  <div v-if="securityConfig.chartType === 'pie'">
    <div v-for="(data, index) in proxyOtherValue[0].value.data" :key="data.id">
      <el-color-picker v-model="proxyValue[index]" :predefine="predefine" color-format="rgb"/>
      {{data[proxyOtherValue[1].value]}}
    </div>
  </div>
  <div v-else>
    <div v-for="(column, index) in proxyOtherValue[0].value.columns" :key="index + column.field">
      <el-color-picker v-model="proxyValue[index]" :predefine="predefine" color-format="rgb"/>
      {{column.name}}
    </div>
  </div>
</template>

<script>
import { formInputProps, useFormInput } from '@d-render/shared'
import {
  ElColorPicker
} from 'element-plus'

export default {
  name: 'colorScheme',
  props: formInputProps,
  components: { ElColorPicker },
  setup (props, ctx) {
    const { proxyValue, proxyOtherValue, securityConfig } = useFormInput(props, ctx, { maxOtherKey: 2 })
    const predefine = ['rgb(84, 112, 198)', 'rgb(145, 204, 117)', 'rgb(250, 200, 88)', 'rgb(238, 102, 102)', 'rgb(115, 192, 222)', 'rgb(59, 162, 114)', 'rgb(252, 132, 82)', 'rgb(154, 96, 180)', 'rgb(234, 124, 204)']

    return {
      proxyValue,
      proxyOtherValue,
      securityConfig,
      predefine
    }
  }
}

</script>
<style scoped lang='less'>
</style>
