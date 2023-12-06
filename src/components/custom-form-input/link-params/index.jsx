import { computed, inject, reactive, nextTick } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { generateFieldList } from 'd-render'
import FormTable from '@cip/d-render-plugin-cci/esm/input/basic/table'
import { ElTooltip, ElInput, ElTree } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { pageInfoService } from '@/api'

export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const state = reactive({
      isShow: false,
      minWidth: 0,
      data: []
    })
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx)

    const drDesign = inject('drDesign', {})
    const parentTable = drDesign.path.at(-3)
    /* eslint-disable */
    const tableConfig = computed(() => {
      const tableOpts = {
        name: { label: '参数名', writable: true }
      }
      if (parentTable?.config?.type === 'pageTable') {
        const { children = [] } = parentTable.config.options[0] || {}
        tableOpts.field = { label: '关联表格字段', writable: true, type: 'select', options: children.map(({ config, key }) => ({ label: config.label, value: key })) }
      } else {
        tableOpts.value = { label: '值', writable: true, type: 'pageFx' }
      }

      return {
        label: '参数',
        type: 'table',
        hideIndex: true,
        options: generateFieldList(tableOpts)
      }
    })

    function loadWrap(node) {
      nextTick(() => {
        state.minWidth = (node.clientWidth - 22) + 'px'
      })
    }

    function selectPath(data, node) {
      if (node.isLeaf) {
        proxyValue.value = data.path.replace(/\/\//g, '/')
        pageInfoService.detail({ id: data.id }).then(({data}) => {
          proxyOtherValue[0].value = (data.schema?.variables || []).map(v => ({name: v.name}))
          state.isShow = false
        })
      }
    }

    pageInfoService.tree({}).then(({data}) => {
      function joinParentPath(list, parentPath='') {
        list.forEach(item => {
          item.path = parentPath + item.path
          if (item.children) joinParentPath(item.children, item.path + '/')
        })
      }
      joinParentPath(data, props.config.baseUrl)
      state.data = data
    })

    return () => <div style={{ width: '100%' }} ref={loadWrap}>
      <ElTooltip v-model:visible={state.isShow} effect="light" trigger="click" show-arrow={false} popper-class="el-select__popper" offset={2}>{{
        default: () => <ElInput v-model={proxyValue.value} clearable suffix-icon={ArrowDown} />,
        content: () => <div style={{'min-width': state.minWidth}}>
          <ElTree data={state.data} props={{label: 'name', value: 'path'}} highlight-current onNodeClick={selectPath} />
        </div>
      }}</ElTooltip>
      <FormTable class="mt-2" v-model={proxyOtherValue[0].value} config={tableConfig.value} />
    </div>
  }
}
