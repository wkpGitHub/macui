import { ref, watch, provide, computed } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton, ElCollapse, ElCollapseItem, ElIcon } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'

export default {
  name: 'DrDesignFieldConfig',
  inheritAttrs: false,
  props: {
    selectItem: { type: Object, default: () => ({}) },
    schema: Object
  },
  emits: ['update:selectItem'],
  setup (props, { emit }) {
    provide('getSchema', () => props.schema)
    // const drDesign = inject('drDesign', {})
    // TODO: 通过源代码修改，修改的值无法正常的回显，因为检测不到selectItem的变化
    const eventsBridge = ref({})
    watch(() => props.selectItem, (val) => {
      if (!val?.key) return
      eventsBridge.value = val.config.events || {}
    }, { immediate: true, deep: true })

    const eventList = computed(() => Object.values(eventsBridge.value))

    const updateSelectItem = () => {
      const selectItem = props.selectItem
      selectItem.config.events = eventsBridge.value// { ...val }
      emit('update:selectItem', selectItem)
    }

    const eventTypes = [
      { label: '点击事件', value: 'click' },
      { label: '鼠标移入事件', value: 'mouseenter' },
      { label: '鼠标移出事件', value: 'mouseleave' }
    ]

    const eventTypeMap = eventTypes.reduce((total, current) => {
      total[current.value] = current.label
      return total
    }, {})

    function onCommand (type) {
      eventsBridge.value[type] = {
        label: eventTypeMap[type],
        value: []
      }
      updateSelectItem()
    }

    return () => <>
      <ElDropdown style="width: 100%" class="my-2" onCommand={onCommand}>{{
        default: () => <ElButton style="width: 100%">添加事件</ElButton>,
        dropdown: () => <ElDropdownMenu>
          {eventTypes.map(e => <ElDropdownItem command={e.value} disabled={Object.prototype.hasOwnProperty.call(eventsBridge.value, e.value)}>{e.label}</ElDropdownItem>)}
        </ElDropdownMenu>
      }}</ElDropdown>
      <ElCollapse>
        {eventList.value.map(item => <ElCollapseItem>{{
          title: () => <>
            {item.label}
            <span style={{ flex: 'auto' }}></span>
            <ElIcon><Plus/></ElIcon>
            <ElIcon class="mx-2"><Delete/></ElIcon>
          </>,
          default: () => <div>content</div>
        }}</ElCollapseItem>)}
      </ElCollapse>
    </>
  }
}
