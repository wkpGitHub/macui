import { ref, watch } from 'vue'
import { pageInfoService } from '@/api/service/chr'
import DesignLayout from './widgets/design-layout'
import DesignModules from './widgets/modules'
import PageTree from './widgets/page-tree'
import PageDesign from './widgets/design'
export default {
  setup () {
    const currentModule = ref('page')
    const currentPageId = ref()
    const currentPageInfo = ref({ scheme: {} })
    watch(currentPageId, (id) => {
      pageInfoService.detail({ id }).then(res => {
        currentPageInfo.value = res.data
        console.log(currentPageInfo.value)
      })
    }, {})
    return () => <DesignLayout>
      {{
        modules: () => <DesignModules
          v-model={currentModule.value}
          items={[{ value: 'page', label: 'P' }, { value: 'component', label: 'C' }]}
        />,
        tree: () => <>
          <PageTree v-model={currentPageId.value} style={{ display: currentModule.value === 'page' ? undefined : 'none' }} />
          <div style={{ display: currentModule.value === 'component' ? undefined : 'none' }}>'component'</div>
        </>,
        content: () => <div style={'height: 100%'}>
          {currentPageInfo.value.id && <PageDesign key={currentPageId.value} v-model:scheme={currentPageInfo.value.scheme}/>}
        </div>,
        configure: () => 'configure'
      }}
    </DesignLayout>
  }
}
