import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
import { ElIcon } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { PlLeftRight as CipPageLayoutLeftRight, PlHandle as CipPageLayoutHandle } from '@cip/page-layout'
import { CipForm } from 'd-render'
import { CipButton } from '@xdp/button'
import { httpFormFieldList } from './config'
import { connectorService } from '@/api'
import CipMessage from '@cip/components/cip-message'
import styles from './index.module.less'

export default defineComponent({
  name: 'connector-manager',
  props: {
    connectorId: {},
    connectorType: {}
  },
  setup (props) {
    const formLoading = ref(false)
    const model = ref({})
    const formFieldList = computed(() => {
      return ({
        http: httpFormFieldList,
        email: []
      })[props.connectorType] || []
    })
    async function submit (resolve, reject) {
      const params = {
        ...model.value,
        connector: props.connectorId
      }
      try {
        const { message } = await connectorService.saveItem(params)
        CipMessage.success(message)
        getItemList()
        resolve()
      } catch (e) {
        reject(e)
      }
    }

    const listLoading = ref(false)
    const list = ref([])
    async function getItemList () {
      listLoading.value = true
      try {
        const { data } = await connectorService.getItemList({ connector: props.connectorId })
        list.value = data || []
      } finally {
        listLoading.value = false
      }
    }
    onMounted(() => { getItemList() })
    async function getItemDetail (id) {
      formLoading.value = true
      try {
        const { data } = await connectorService.getItemDetail({ id })
        model.value = data
      } finally {
        formLoading.value = false
      }
    }

    const formRef = ref()
    async function handleAdd () {
      model.value = {}
      await nextTick()
      await nextTick()
      formRef.value.clearValidate()
    }

    return () => <CipPageLayoutLeftRight>
      {{
        left: () => <>
          <div class={styles.header}>
            <div>方法列表</div>
            <CipButton buttonType='create' onClick={handleAdd}>新增</CipButton>
          </div>
          <div class={styles['list-wrapper']} v-loading={listLoading.value}>
            {list.value.map(v => <div
              key={v.id}
              class={[styles['list-item'], model.value.id === v.id ? styles.active : '']}
              onClick={() => { getItemDetail(v.id) }}
            >
              <div>{v.name}</div>
              <ElIcon><Delete /></ElIcon>
            </div>)}
          </div>
        </>,
        default: () => <CipPageLayoutHandle v-loading={formLoading.value}>
          {{
            default: () => <CipForm
              ref={formRef}
              v-model:model={model.value}
              fieldList={formFieldList.value}
              labelPosition='top'
            />,
            handle: ({ confirm, waiting }) => <>
              <CipButton type='primary' loading={waiting} onClick={() => { confirm(submit) }}>保存</CipButton>
            </>
          }}
        </CipPageLayoutHandle>
      }}
    </CipPageLayoutLeftRight>
  }
})
