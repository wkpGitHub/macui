<template>
  <div :class="$style.wrapper">
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import { appService } from '@/api/service/chr'
import store from '@cip/components/store'
export default defineComponent({
  props: {
    layout: String,
    appPath: String
  },
  setup (props) {
    const ready = ref(false)
    const appInfo = ref({})
    const getAppInfo = async () => {
      const { data } = await appService.info({ path: props.appPath })
      appInfo.value = data
      store.dispatch('setApp', data)
      ready.value = true
    }

    const platformTitle = computed(() => {
      if (!appInfo.value.name) return '应用配置平台'
      return `${appInfo.value.name}-应用配置平台`
    })
    onMounted(() => {
      watch(platformTitle, (val = '') => {
        document.title = val
      }, { immediate: true })
    })

    getAppInfo()

    return {
      ready,
      appInfo
    }
  }
})
</script>
<style lang="less" module>
.wrapper{
  height: 100%;
}
</style>
