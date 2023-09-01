import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
import { ElIcon, ElScrollbar } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { PlLeftRight as CipPageLayoutLeftRight, PlHandle as CipPageLayoutHandle } from '@cip/page-layout'
import { CipForm } from 'd-render'
import { CipButton } from '@xdp/button'
import { httpFormFieldList, emailFormFieldList } from './config'
import { connectorService } from '@/api'
import CipMessage from '@cip/components/cip-message'
import CipMessageBox from '@cip/components/cip-message-box'
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
        email: emailFormFieldList
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
    onMounted(async () => {
      await getItemList()
      if (list.value[0]?.id) {
        getItemDetail(list.value[0].id)
      }
    })

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

    async function handleDel (id) {
      await CipMessageBox.confirm('确认删除吗', '删除确认', { type: 'warning' })
      await connectorService.deleteItem({ id })
      CipMessage.success('删除成功')
      getItemList()
    }

    return () => <CipPageLayoutLeftRight class={styles.page}>
      {{
        left: () => <>
          <div class={styles.header}>
            <div>方法列表</div>
            <CipButton buttonType='create' onClick={handleAdd}>新增</CipButton>
          </div>
          <div class={styles['list-wrapper']} v-loading={listLoading.value}>
            <ElScrollbar>
              {list.value.map(v => <div
                key={v.id}
                class={[styles['list-item'], model.value.id === v.id ? styles.active : '']}
                onClick={() => { getItemDetail(v.id) }}
              >
                <div>{v.name}</div>
                {model.value.id === v.id && <ElIcon onClick={() => { handleDel(v.id) }}><Delete /></ElIcon>}
              </div>)}
            </ElScrollbar>
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
