<template>
    <Main v-if="ready"
          :nav-menu="menu"
          :privileges="privileges"
          :hide-footer="true"
          theme="standard"
          :layout="layout"
          :with-tabs="false"
          :root-path="`/preview/${appPath}`"
    >
      <template #collapse>
      </template>
      <template #expand>
        <span style="margin-left: 8px;">{{appInfo.name}}</span>
      </template>
      <template #header-plugin>
        <div>hi</div>
      </template>
    </Main>
</template>
<script>
import { defineComponent, ref, provide } from 'vue'
import { pageInfoToMenu } from '../util'
import Main from '@cip/components/main'
import { appService, privilegeService, pageInfoService } from '@/api'
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
    const menu = ref([])
    const getAppInfo = async () => {
      const { data } = await appService.info({ path: props.appPath })
      appInfo.value = data
      store.dispatch('setApp', data)
      document.title = data.name
    }
    const getMenu = async () => {
      await pageInfoService.tree({}).then(res => {
        console.log(res.data)
        const m = pageInfoToMenu.fromDataSet(res.data)
        console.log('m11', m)
        menu.value = m
        ready.value = true
        // menu.value = res.data || []
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
    getAppInfo().then(() => {
      getMenu()
      getPrivileges()
    })
    // Promise.allSettled([getMenu(), getPrivileges()]).then(res => {
    //   loading.value = false
    // })
    return {
      ready,
      appInfo,
      menu,
      privileges
    }
  }
})
</script>
