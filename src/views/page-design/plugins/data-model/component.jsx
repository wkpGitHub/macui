import { reactive, inject, ref } from 'vue'
import { ElTree, ElIcon } from 'element-plus'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { CipButton } from '@xdp/button'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm } from 'd-render'
import { modelFiled, formField } from './config'
export default {
  props: {
    schema: {}
  },
  emits: ['update:schema'],
  setup (props, { emit }) {
    const treeRef = ref()
    const drDesign = inject('drDesign', {})

    const state = reactive({
      form: {},
      title: '',
      isShow: false,
      formField: [],
      isAddModel: false,
      index: -1,
      parent: {}
    })
    function openDialog () {
      state.isShow = true
      state.isAddModel = true
      state.formField = modelFiled(drDesign.schema.dataModel || [])
    }
    function handleConfirm (resolve) {
      if (state.isAddModel) {
        drDesign.schema.dataModel.push({ ...state.form })
      } else {
        const { parent, form } = state
        if (state.index > -1) {
          const children = parent.data.children || parent.data
          children.splice(state.index, 1, { ...form })
        } else {
          parent.children.push({ ...form })
        }
      }
      state.form = {}
      state.isAddModel = false
      state.index = -1
      resolve()
    }

    function renderContent (h, { node, data }) {
      return <div class="flex-center flex-auto text-overflow" style="font-size: 14px;">
        <span class="flex-auto text-overflow" title={data.title}>{data.title}</span>
        {node.level === 1 ? <ElIcon class="mx-1" onClick={() => append(data)}><Plus /></ElIcon> : <ElIcon class="mx-1" onClick={() => editItem(node, data)}><Edit /></ElIcon>}
        <ElIcon onClick={() => remove(node, data)}><Delete/></ElIcon>
      </div>
    }

    const append = (data) => {
      state.parent = data
      state.isShow = true
      state.formField = formField
    }

    const editItem = (node, data) => {
      const parent = node.parent
      const children = parent.data.children || parent.data
      state.index = children.findIndex((d) => d.name === data.name)
      state.form = { ...data }
      state.parent = parent
      state.isShow = true
      state.formField = formField
    }

    const remove = (node, data) => {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.name === data.name)
      children.splice(index, 1)
    }

    return () => <div style={'padding: 0 12px;'}>
      <CipButton style="width: 100%" onClick={openDialog}>新增数据模型</CipButton>
      <ElTree
        ref={treeRef}
        data={drDesign.schema?.dataModel || []}
        props={{ label: 'title', value: 'name' }}
        render-content={renderContent}
        />
      <CipDialog
        v-model={state.isShow}
        title=''
        onConfirm={handleConfirm}
      >
        <CipForm v-model:model={state.form} fieldList={state.formField}></CipForm>
      </CipDialog>
    </div>
  }
}
