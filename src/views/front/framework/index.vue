<template>
  <Main :nav-menu="menu"
        theme="light"
        :hide-footer="true"
        layout="top"
        :home-view="homeView"
        :privileges="privileges"
        :with-tabs="true"
        :badge-interval="5">
    <template #collapse>
    </template>
    <template #expand>
      <span style="margin-left: 8px; cursor:pointer;" >{{platformName}}</span>
    </template>
  </Main>
</template>
<script>
import { defineComponent, provide, ref } from 'vue'
import Main from '@cip/components/main'
import { menuService, privilegeService } from '@/api'
export default defineComponent({
  components: { Main },
  setup () {
    const menu = ref([])
    const getMenu = () => {
      menuService.getFrontMenu().then(res => {
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
    const homeView = ref({ name: 'home', fullPath: '/', title: '首页' })

    getPrivileges()
    getMenu()

    return {
      menu,
      homeView,
      privileges,
      platformName: process.env.VUE_APP_PLATFORM_NAME
    }
  }
})
</script>
