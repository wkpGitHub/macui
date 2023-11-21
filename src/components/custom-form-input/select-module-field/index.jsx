import { defineComponent, inject, reactive } from 'vue'
import { ElInput, ElIcon, ElCard } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { MoreFilled } from '@element-plus/icons-vue'
import CipDialog from '@cip/components/cip-dialog'
import CipTree from '@cip/components/cip-tree'

export default defineComponent({
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx, { maxOtherKey: 2 })
    const drDesign = inject('drDesign', {})

    const state = reactive({ isShow: false, item: {} })

    function selectVar (item) {
      state.item = item
    }

    function onConfirm (resolve) {
      if (state.item.name) {
        proxyValue.value = state.item.name
        proxyOtherValue[0].value = state.item.title
        proxyOtherValue[1].value = state.item.dataType
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
            options={drDesign.schema?.dataModel || []}
            showButton={false}
            config={{
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
