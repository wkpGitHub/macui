import { ref, watch, provide } from 'vue'
import { pageInfoService } from '@/api/service/chr'
import CipButton from '@cip/components/cip-button'
import PreviewLayout from './widgets/preview-layout'
import PageTree from './widgets/page-tree'
import LowCodePage from '@/views/app/pages/low-code/index'
export default {
  setup () {
    const currentPageId = ref()
    const currentPageInfo = ref({ scheme: {} })

    watch(currentPageId, (id) => {
      pageInfoService.detail({ id }).then(res => {
        currentPageInfo.value = res.data
        if (id === 1) {
          currentPageInfo.value.id = 'app-manager'
        }
      })
    }, {})
    provide('cip-page-config', {})
    return () => <PreviewLayout>
      {{
        toolbar: () => <>
          <CipButton>页面设计</CipButton>
        </>,
        tree: () => <>
          <PageTree v-model={currentPageId.value} />
        </>,
        content: () => <div style={'height: 100%'}>
          {currentPageInfo.value.id && <LowCodePage key={currentPageId.value} id={currentPageInfo.value.id}/>}
        </div>,
        configure: () => 'configure'
      }}
    </PreviewLayout>
  }
}
