import { defineComponent, ref } from 'vue'
import { ElCollapse, ElCollapseItem, ElInput } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import CipDialog from '@cip/components/cip-dialog'
import CipButton from '@cip/components/cip-button'
import { compList, classifyCompByCategory } from '../../comps'

import styles from './index.module.less'
export default defineComponent({
  name: 'comp-list',
  setup (props, { attrs }) {
    const activeNames = ref([])
    const activeNodes = ref([])
    activeNames.value = compList.map((_, index) => index)

    const keyWord = ref('')
    filterNodes()
    function filterNodes (val = '') {
      const temp = compList.filter(comp => comp.title.includes(val))
      activeNodes.value = classifyCompByCategory(temp)
      // 全部展开
      activeNames.value = activeNodes.value.map((compType) => compType.category)
    }
    return () => <CipDialog
      {...attrs}
      title={'活动节点'}
    >
      <ElInput v-model={keyWord.value} placeholder={'请输入关键字'} onInput={filterNodes} suffixIcon={Search}></ElInput>
      <ElCollapse v-model={activeNames.value}>
        {
          activeNodes.value.map((compType) => <ElCollapseItem title={compType.category} key={compType.category} name={compType.category}>
            <div class={styles['comp-wrapper']}>
              {compType.children.map(comp => <CipButton key={comp.type}>{comp.title}</CipButton>)}
            </div>
          </ElCollapseItem>)
        }
      </ElCollapse>
    </CipDialog>
  }
})
