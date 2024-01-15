<template>
  <div :style="styles">
    <template
      v-for="({children,...col},optionIndex) in options"
      :key="optionIndex">
      <div :style="{'flex-basis': col.flexBasis}">
        <slot
          name="item"
          :children="children"
          :optionIndex="optionIndex"
          :is-show="config._isShow"
          :addOptionChild="addOptionChild"
          :deleteOptionChild="deleteOptionChild"
          :copyOptionChild="copyOptionChild"
          :updateOptionChildren="updateOptionChildren"
          :updateOptionChild="updateOptionChild"></slot>
      </div>
    </template>
  </div>
</template>
<script>
import { layoutProps, useFormLayoutOptions } from '@d-render/shared'
import { computed } from 'vue'
export default {
  name: 'Grid',
  props: layoutProps,
  emits: ['update:config', 'selectItem'],
  setup (props, { emit }) {
    const formLayoutOptions = useFormLayoutOptions({ props, emit })
    const styles = computed(() => {
      const { config } = props
      const _s = Object.assign({
        display: 'flex',
        gap: config.gap,
        'flex-direction': config.direction
      }, config.style || {})
      console.log(config, _s)
      return _s
    })
    console.log(formLayoutOptions)
    return {
      ...formLayoutOptions,
      styles
    }
  }
}
</script>
