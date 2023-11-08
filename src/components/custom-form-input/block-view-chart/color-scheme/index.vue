<template>
  <el-color-picker v-model="proxyValue" :predefine="predefineColors" color-format="rgb"/>
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
    const { proxyValue } = useFormInput(props, ctx)
    const predefineColors = [
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)',
      '#c7158577'
    ]

    return {
      proxyValue,
      predefineColors
    }
  }
}

</script>
<style scoped lang='less'>
</style>
