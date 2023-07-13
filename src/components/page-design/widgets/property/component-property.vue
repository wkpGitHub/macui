<template>
  <CipForm
    :model="selectItem.config"
    @update:model="(val)=> $emit('update:selectItem', val)"
    :fieldList="fieldList"
    labelPosition="top"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, watch, nextTick } from 'vue'
import { CipForm, generateFieldList, DRender } from 'd-render'
import { configureOptionsFieldConfigMap, defaultConfigureOptions } from '@d-render/shared'
const dRender = new DRender()
const props = defineProps({
  data: Object,
  selectItem: Object
})
defineEmits(['update:selectItem'])
const getCustomConfigure = async (type) => (await dRender.componentDictionary[type]('/configure'))()
const customConfigure = ref({})
const itemConfig = computed(() => {
  return props.selectItem.config || {}
})

watch(() => itemConfig.value.type, (val) => {
  if (val) {
    getCustomConfigure(val)
      .then(res => {
        console.log(res.default)
        customConfigure.value = res.default ?? {}
      }).catch(() => {
        customConfigure.value = defaultConfigureOptions()
      }).finally(() => {
        fieldList.value = []
        nextTick().then(() => {
          fieldList.value = generateFieldList(customConfigure.value, configureOptionsFieldConfigMap)
        })
      })
  }
}, { immediate: true })
const fieldList = ref([])
</script>
