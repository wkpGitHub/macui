import { computed, ref, defineComponent } from 'vue'
import CipPageLayoutHandle from '@cip/page-layout/handle'
import CipDialog from '@cip/components/cip-dialog'
import CipMessage from '@cip/components/cip-message'
import CipPagination from '@cip/components/cip-pagination'
import { CipForm, CipTable } from 'd-render'
import { formFieldListMap, debugParamsTableColumn } from './config'
import { centerService } from '@lc/api'
import { useMain } from '@cip/hooks/use-main'
import { SQL } from './constant'
import { useDebug } from './hooks'
import { CipButton } from '@xdp/button'
import styles from './index.module.less'

export default defineComponent({
  props: {
    id: {}
  },
  setup (props) {
    const item = ref({})
    const formFieldList = computed(() => formFieldListMap[item.value.devMode])
    centerService
      .getContent(props.id)
      .then(async res => {
        const data = res.data || {}
        item.value = {
          ...data,
          inputParams: data.flow?.inputParams || [],
          outParams: data.flow?.outParams || []
        }
      })
    // 改为sql模式
    function changeMode () {
      item.value.devMode = SQL
      if (!props.id) {
        item.value.outParams = []
      }
    }
    const { closeTab } = useMain()
    async function handleConfirm (resolve, reject) {
      const { inputParams, outParams, ...res } = item.value
      try {
        const { message } = await centerService.saveContent({
          ...res,
          flow: {
            ...res.flow,
            inputParams,
            outParams
          }
        })
        CipMessage.success(message)
        handleCancel()
        resolve()
      } catch (e) {
        reject(e)
      }
    }
    // 返回上一页面
    async function handleCancel () {
      closeTab()
    }
    const {
      visible,
      debuggerParams,
      debuggerRes,
      debuggerResColumn,
      // openDialog,
      debug,
      offset,
      limit,
      total
    } = useDebug(item) // 调试
    return () => <CipPageLayoutHandle title={`${item.value.name}(${item.value.fullPath})`}>
      {{
        default: () => <>
          <CipForm
            key={item.value.devMode}
            v-model:model={item.value}
            fieldList={formFieldList.value}
            labelWidth={'90px'}
            grid={24}
          ></CipForm>
          <CipDialog
            title='调试'
            v-model={visible.value}
            onConfirm={(resolve) => { resolve() }}
            showOnly={true}
          >
            <div class={styles.label}>请求参数</div>
            <CipTable data={debuggerParams.value} columns={debugParamsTableColumn}></CipTable>
            <div class={[styles.label, styles.btn]}><span>调试结果</span><CipButton type='primary' onClick={debug}>开始调试</CipButton></div>
            <CipTable data={debuggerRes.value} columns={debuggerResColumn.value}></CipTable>
            <div class={styles.pagination}>
              <CipPagination
                v-model:offset={offset.value}
                v-model:limit={limit.value}
                total={total.value}
                onRefresh={debug}
              />
            </div>
          </CipDialog>
        </>,
        handle: ({ confirm, waiting }) => <>
          <CipButton loading={waiting} onClick={handleCancel}>取消</CipButton>
          {item.value.devMode !== SQL && <CipButton loading={waiting} onClick={changeMode}>转换为sql模式</CipButton>}
          {/* <cip-button loading={waiting} type='primary' onClick={() => { confirm(openDialog) }}>调试</cip-button> */}
          <CipButton loading={waiting} type='primary' onClick={() => { confirm(handleConfirm) }}>保存</CipButton>
        </>
      }}
    </CipPageLayoutHandle>
  }
})
