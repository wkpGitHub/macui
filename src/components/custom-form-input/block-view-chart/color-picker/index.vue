<template>
  <el-color-picker v-model="proxyValue" :predefine="predefine"/>
</template>

<script>
import { formInputProps, useFormInput } from '@d-render/shared'
import {
  ElColorPicker
} from 'element-plus'

export default {
  name: 'colorPicker',
  props: formInputProps,
  components: { ElColorPicker },
  setup (props, ctx) {
    const { proxyValue } = useFormInput(props, ctx)
    const predefine = ['rgb(250, 200, 88)', 'rgb(238, 102, 102)', 'rgb(115, 192, 222)', 'rgb(59, 162, 114)', 'rgb(252, 132, 82)', 'rgb(154, 96, 180)', 'rgb(234, 124, 204)', 'rgb(255, 255, 255)', 'rgb(0, 0, 0)']

    return {
      proxyValue,
      predefine
    }
  }
}

</script>
<style scoped lang='less'>
</style>
