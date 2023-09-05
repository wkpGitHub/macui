import { defineComponent, ref } from 'vue'
import { ElCollapse, ElCollapseItem, ElInput } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import CipDialog from '@cip/components/cip-dialog'
import CipButton from '@cip/components/cip-button'
import { compList, classifyCompByCategory } from '../../comps'
import { v4 as uuid } from 'uuid'
import { iconHtmlMap } from '../../ausyda'
import './index.less'

const iconClassMap = {
  start: 'node-start',
  branch: 'node-logic',
  break: 'node-logic',
  loop: 'node-logic node-icon-loop-wrapper',
  continue: 'node-logic node-icon-continue-wrapper',
  exit: 'node-logic',
  'datasource-sql': 'icon-outer',
  script: 'icon-outer',
  notification: 'icon-outer',
  email: 'icon-outer',
  connector: 'icon-outer',
  flow: 'icon-outer',
  apicenter: 'icon-outer',
  http: 'icon-outer',
  'delete-data-records': 'icon-outer icon-crud',
  'query-data-records': 'icon-outer icon-crud',
  'update-data-records': 'icon-outer icon-crud',
  'create-data-records': 'icon-outer icon-crud',
  coder: 'icon-outer',
  'date-format': 'icon-outer',
  mapping: 'icon-outer',
  expand: 'icon-outer',
  folded: 'icon-outer',
  delete: 'icon-outer',
  set: 'icon-outer'
}

export default defineComponent({
  name: 'comp-list',
  emits: ['click-comp'],
  setup (props, { attrs, emit }) {
    const activeNames = ref([])
    const activeNodes = ref([])
    activeNames.value = compList.map((_, index) => index)

    const keyWord = ref('')
    filterNodes()
    function filterNodes (val = '') {
      const temp = compList.filter(comp => comp?.title?.includes?.(val))
      activeNodes.value = classifyCompByCategory(temp)
      // 全部展开
      activeNames.value = activeNodes.value.map((compType) => compType.category)
    }

    function handleClickComp (comp) {
      const data = { ...comp.initData }
      data.id = uuid()
      emit('click-comp', data)
    }
    return () => <CipDialog
      {...attrs}
      title={'活动节点'}
    >
      <ElInput v-model={keyWord.value} placeholder={'请输入关键字'} onInput={filterNodes} suffixIcon={Search}></ElInput>
      <ElCollapse v-model={activeNames.value}>
        {
          activeNodes.value.map((compType) => <ElCollapseItem title={compType.category} key={compType.category} name={compType.category}>
            <div class={'comp-wrapper api-editor'}>
              {compType.children.map(comp => <CipButton key={comp.type} onClick={() => { handleClickComp(comp) }}><div class={`${iconClassMap[comp.type]} mr-2`} v-html={iconHtmlMap[comp.type]}></div>{comp.title}</CipButton>)}
            </div>
          </ElCollapseItem>)
        }
      </ElCollapse>
    </CipDialog>
  }
})
