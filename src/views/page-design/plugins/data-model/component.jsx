import { ref, inject, watchEffect, onMounted } from 'vue'
import { ElTree } from 'element-plus'
import { CipButton } from '@xdp/button'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'
import { formField } from './config'
import { cloneDeep } from '@cip/utils/util.js'
export default {
  props: {
    schema: {}
  },
  emits: ['update:schema'],
  setup (props, { emit }) {
    const treeRef = ref()
    const { schema } = inject('drDesign', {})

    function getStaticData () {
      const temp = (schema.dataModel || []).find(v => v.value === 'private')?.children || []
      return cloneDeep(temp)
    }

    onMounted(() => {
      console.log('mounted')
    })

    function setStaticData (data) {
      (schema.dataModel || []).find(v => v.value === 'private').children = data
    }

    const visible = ref(false)
    const form = ref({})
    function openDialog () {
      form.value.fields = getStaticData()
      visible.value = true
    }
    function handleConfirm (resolve) {
      const data = (form.value.fields || []).map(v => {
        return {
          label: `${v.name}【${v.ename}】`,
          value: v.ename,
          data: v.typeInfo.transFrom(v.data)
        }
      })
      setStaticData(data)
      resolve()
    }

    watchEffect(() => {
      console.log(schema.dataModel, 'kkk')
    })
    return () => <div style={'padding: 0 12px;'}>
      <CipButton type='primary' onClick={openDialog} buttonType='create'>新增静态数据</CipButton>
      <ElTree ref={treeRef} data={schema.dataModel || []} />
      <CipDialog
        v-model={visible.value}
        title='静态数据'
        onConfirm={handleConfirm}
      >
        <CipForm v-model:model={form.value} fieldList={formField}></CipForm>
      </CipDialog>
    </div>
  }
}
