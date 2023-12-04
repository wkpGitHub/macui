import { defineComponent, inject, reactive } from 'vue'
import { ElInput, ElIcon, ElCard } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { MoreFilled } from '@element-plus/icons-vue'
import CipDialog from '@cip/components/cip-dialog'
import CipTree from '@cip/components/cip-tree'
import { cloneDeep } from '@cip/utils/util'

export default defineComponent({
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx)
    const drDesign = inject('drDesign', {})

    let api
    for (let i = drDesign.path.length - 1; i >= 0; i--) {
      if (drDesign.path[i].config?.api) {
        api = cloneDeep(drDesign.path[i].config?.api)
      }
    }

    const options = [
      {
        title: '入参',
        children: api.inputParams || []
      },
      {
        title: '出参',
        children: api.outParams || []
      }
    ]

    const state = reactive({ isShow: false, item: {} })

    function selectVar (item) {
      state.item = item
    }

    function onConfirm (resolve) {
      if (state.item.name) {
        proxyValue.value = state.item.name
        proxyOtherValue[0].value = state.item.title
      }
      resolve()
    }

    function renderTreeItem ({ node, data }) {
      return <div style='display: flex;align-items: center;justify-content: space-between;' onClick={() => selectVar(data)}>
      <span>{data.title}</span>
    </div>
    }

    return () => <>
      <ElInput v-model={proxyValue.value}>{{
        suffix: () => <ElIcon style="cursor: pointer" onClick={() => { state.isShow = true }}><MoreFilled /></ElIcon>
      }}</ElInput>
      <CipDialog title={'选择字段'} v-model={state.isShow} onConfirm={onConfirm} width="500px">
        <ElCard shadow="never">
          <CipTree
            options={options}
            showButton={false}
            config={{
              optionProps: {
                label: 'title',
                value: 'name'
              },
              highlightCurrent: true,
              defaultExpandAll: false,
              renderItem: renderTreeItem
            }}
          >
          </CipTree>
        </ElCard>
      </CipDialog>
    </>
  }
})
