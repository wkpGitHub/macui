import { watch, ref, onMounted } from 'vue'
import CipPageCurd from '@cip/components/cip-page-curd'
import { PlHandle as CipPageLayoutHandle } from '@cip/page-layout'
import { dataInfoService } from '@lc/api/service/chr'
import { tableColumns, formFieldList } from './config'
import CipButton from '@cip/components/cip-button'
export default {
  props: {
    id: [Number, String]
  },
  emits: ['cancel', 'success'],
  setup (props, { emit }) {
    const curd$ = ref()
    const dataModel = ref({})
    onMounted(() => {
      watch(() => props.id, () => {
        dataInfoService.detail({ id: props.id }).then(res => {
          dataModel.value = res.data
        })
        curd$.value.getTableList()
      })
    })
    return () => <CipPageLayoutHandle top={true} title={dataModel.value.name}>
      {{
        default: () => <div>
          <div>
            <div>{dataModel.value.remark}</div>
          </div>
          <CipPageCurd
            ref={curd$}
            outParams={{ dataId: props.id }}
            entity={dataInfoService}
            curdFn={{ pageFn: 'list', createFn: 'save', updateFn: 'save', deleteFn: 'dicDelete' }}
            tableColumns={tableColumns}
            formFieldList={formFieldList}
            formSize={'mini'}
            withSearch={false}
            withPagination={false}
            itemType={'枚举值'}
          />
        </div>,
        handler: () => <>
          <CipButton>编辑</CipButton>
          <CipButton>删除</CipButton>
        </>
      }}

    </CipPageLayoutHandle>
  }
}
