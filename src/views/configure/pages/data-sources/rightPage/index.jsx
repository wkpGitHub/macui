import { reactive, watch } from 'vue'
import CipButton from '@cip/components/cip-button'
import CipTabs from '@cip/components/cip-tabs-plus'
import { ElScrollbar } from 'element-plus'
import CipTabPane from '@cip/components/cip-tabs-plus/tab'
import { CipForm } from 'd-render'
import { dataInfoService } from '@lc/api'
import CipMessage from '@cip/components/cip-message'
import { formFieldList, tableColumns } from './config'
import styles from './index.module.less'
export default {
  props: {
    id: String
  },
  setup (props) {
    const state = reactive({
      active: 0,
      dataModel: {},
      loading: false
    })

    const getDataInfo = async () => {
      const { data } = await dataInfoService.detail({ id: props.id })
      return data
    }
    watch(() => props.id, () => {
      getDataInfo().then(res => {
        state.dataModel = res
      })
    }, { immediate: true })

    const onSave = (resolve, reject) => {
      state.loading = true
      dataInfoService.infoSave(state.dataModel).then(res => {
        CipMessage.success(res.message)
      }).finally(() => { state.loading = false })
    }

    return () => <div class="flex-column" style={{ height: '100%' }}>
      <div class="flex-auto">
        <CipTabs class={styles.tabs} v-model={state.active}>
          <CipTabPane lazy label='基础信息' name={0}>
            <ElScrollbar><CipForm v-model:model={state.dataModel} fieldList={formFieldList} labelWidth="110px"></CipForm></ElScrollbar>
          </CipTabPane>
          <CipTabPane lazy label='字段' name={1}>
            <ElScrollbar><CipForm v-model:model={state.dataModel} fieldList={tableColumns} labelWidth="110px"></CipForm></ElScrollbar>
          </CipTabPane>
        </CipTabs>
      </div>
      <div class="flex-shrink flex-end pa-3" style="box-shadow: 0 -2px 12px 0 rgba(0,0,0,.06); margin: 0 -20px">
        <CipButton type="primary" loading={state.loading} onClick={onSave}>保存</CipButton>
      </div>
    </div>
  }
}
