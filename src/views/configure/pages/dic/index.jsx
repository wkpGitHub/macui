import { ref, watch } from 'vue'
import { PlLeftRight as CipPageLayoutLeftRight } from '@cip/page-layout'
import { dataInfoService } from '@lc/api'
import PageTree from './page-tree'
import { tableColumns, formFieldList } from './config'
import CipPageCurd from '@cip/components/cip-page-curd'

export default {
  setup (props, ctx) {
    const currentDataModel = ref()
    const curd$ = ref()
    watch(() => currentDataModel.value, () => {
      curd$.value.getTableList()
    })
    return () => <CipPageLayoutLeftRight>
      {{
        left: () => <PageTree v-model={currentDataModel.value} type="dic" />,
        default: () => <div style={{ height: '100%' }}>
          {currentDataModel.value && <CipPageCurd
            ref={curd$}
            noPadding
            outParams={{ dataId: currentDataModel.value }}
            entity={dataInfoService}
            curdFn={{ pageFn: 'list', createFn: 'save', updateFn: 'save', deleteFn: 'dicDelete' }}
            tableColumns={tableColumns}
            formFieldList={formFieldList}
            formLabelWidth="60px"
            formSize={'mini'}
            withSearch={false}
            withPagination={false}
            itemType={'枚举值'}
          />}
        </div>
      }}
    </CipPageLayoutLeftRight>
  }
}
