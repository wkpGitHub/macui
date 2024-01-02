<template>
    <Main
      v-if="ready"
      :nav-menu="menu"
      :privileges="privileges"
      :hide-footer="true"
      theme="standard"
      :layout="layout"
      :with-tabs="false"
      :root-path="`/configure/${appPath}`"
    >
      <template #expand>
        <span style="margin-left: 8px;">应用配置({{appInfo.name}})</span>
      </template>
    </Main>
</template>
<script>
import { defineComponent, ref, provide, onMounted, computed, watch } from 'vue'
import Main from '@cip/components/main'
import { menuService, privilegeService } from '@lc/api'
import { appService } from '@lc/api/service/chr'
import store from '@cip/components/store'
export default defineComponent({
  components: { Main },
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
    const menu = ref([])
    const getMenu = async () => {
      await menuService.getConfigureMenu().then(res => {
        menu.value = res.data || []
      })
    }
    const privileges = ref([])
    provide('ownPrivileges', privileges)
    const getPrivileges = async () => {
      await privilegeService.list().then(res => {
        privileges.value = (res.data || []).map(v => v.code)
      }).catch(() => {
        privileges.value = []
      })
    }
    // const loading = ref(true)
    getAppInfo()
    getMenu()
    getPrivileges()
    // Promise.allSettled([getMenu(), getPrivileges()]).then(res => {
    //   loading.value = false
    // })
    return {
      ready,
      menu,
      privileges,
      appInfo,
      homeView: { fullPath: '/manager', name: 'managerHome', title: '首页' }
    }
  }
})
</script>
