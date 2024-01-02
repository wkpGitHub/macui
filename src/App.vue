<template>
  <cip-config-provide
    :search-grid="true"
    :search-reset="true"
    :layout="{ pageTheme: 'supergravity', compact: true}"
    :form="{labelPosition: 'top'}"
  >
    <PlConfigProvide  :theme="theme" :themes="themes">
      <el-config-provider :locale="zhCn">
        <router-view/>
      </el-config-provider>
    </PlConfigProvide>
  </cip-config-provide>
</template>
<script>
import { computed } from 'vue'
import CipConfigProvide from '@cip/components/cip-config-provide'
import { PlConfigProvide } from '@cip/page-layout'
// el中文配置
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import cipStore from '@cip/components/store'
import { getFieldValue } from '@cip/utils/util'
import Supergravity from '@page-layout/theme-supergravity'
import Standard from '@page-layout/theme-standard'
import '@page-layout/theme-standard/style'
// import DG from '@page-layout/theme-dg'
// import '@page-layout/theme-dg/style'
import '@page-layout/theme-supergravity/style'
import { baseDicService } from '@lc/api'
export default {
  components: { CipConfigProvide, ElConfigProvider, PlConfigProvide },
  setup () {
    // 全局数据类型下拉
    cipStore.registerActions({
      setDataType ({ state }, dataType) {
        state.dataType = dataType || []
      }
    })

    if (!window.location.pathname.endsWith('/login')) {
      baseDicService.basicType().then(({ data }) => {
        cipStore.dispatch('setDataType', data)
      })
    }

    const theme = computed(() => {
      return getFieldValue(cipStore.state.app, 'config.layout.pageTheme') ?? 'supergravity'
    })
    const themes = {
      standard: Standard,
      supergravity: Supergravity
    }
    return {
      zhCn,
      themes,
      theme
    }
  }
}
</script>
