import { defineComponent, ref } from 'vue'
import { formInputProps, fromInputEmits } from '@d-render/shared'
import { ElButton } from 'element-plus'
import GroupItem from './InclusiveGroupItemConfig.vue'
export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const config = ref({
      groups: [{
        cids: [],
        groupType: 'OR',
        conditions: []
      }]
    })
    const addConditionGroup = () => {
      config.value.groups.push({
        cids: [],
        groupType: 'OR',
        conditions: []
      })
    }
    return () => <>
      <div>
        <ElButton type="primary" size="mini" icon="el-icon-plus" style="margin: 0 15px 15px 0" round onClick={addConditionGroup}>
          添加条件组
        </ElButton>
        <span class="item-desc">只有必填选项才能作为审批条件</span>
      </div>
      <GroupItem selectedNode={config.value} onChange={(obj) => { config.value = obj }}/>
    </>
  }
})
