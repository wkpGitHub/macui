import { ref, watch, provide, computed, nextTick, withModifiers, inject } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton, ElCollapse, ElCollapseItem, ElIcon } from 'element-plus'
import { Plus, Delete, Edit } from '@element-plus/icons-vue'
import { filterList } from '@/lib/utils'
import { EVENT_TYPE, getConfig, useUpdateView } from './config'
import CipMessageBox from '@cip/components/cip-message-box'
import LayoutBox from '@lc/components/d-render-plugin-page-render/layout-box'
import CipDialog from '@cip/components/cip-dialog'
import CpTree from '@cip/components/cip-tree'
import { CipForm } from 'd-render'
import CipButtonText from '@cip/components/cip-button-text'
import VueDraggable from 'vuedraggable'
import { getComponentConfigure } from '../field-configure/config'
import './index.less'

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
    const drDesign = inject('drDesign', {})
    const config = getConfig(drDesign)
    const treeModel = ref({})
    const treeRef = ref()
    const collaseExpends = ref([])
    const currentDialog = ref({
      isShow: false
    })

    // TODO: 通过源代码修改，修改的值无法正常的回显，因为检测不到selectItem的变化
    const eventsBridge = ref({})
    watch(() => props.selectItem, (val) => {
      if (!val?.key) return
      eventsBridge.value = val.config.events || {}
    }, { immediate: true, deep: true })

    const formFieldList = computed(() => config[treeModel.value.eventType] || [])

    const eventList = computed(() => Object.values(eventsBridge.value))

    const updateSelectItem = () => {
      const selectItem = props.selectItem
      selectItem.config.events = eventsBridge.value// { ...val }
      emit('update:selectItem', selectItem)
    }

    const getFieldComponentConfigureFieldConfigList = async (type) => {
      let options = []
      try {
        const { events } = await getComponentConfigure(type)
        options = events?.options || []
      } catch (e) { }
      return options
    }

    const eventTypes = ref([])
    let eventTypeMap = {}
    watch(() => props.selectItem.config?.type, (v) => {
      getFieldComponentConfigureFieldConfigList(v).then(res => {
        eventTypes.value = res
        eventTypeMap = res.reduce((total, current) => {
          total[current.value] = current
          return total
        }, {})
      })
    }, { immediate: true })

    function onCommand (type) {
      eventsBridge.value[type] = {
        label: eventTypeMap[type].label,
        type,
        args: eventTypeMap[type].args,
        value: []
      }
      updateSelectItem()
    }

    function deleteEvent (item) {
      CipMessageBox.confirm(`确认删除${item.label}?`, '提示').then(() => {
        Reflect.deleteProperty(eventsBridge.value, item.type)
      }).catch(() => {})
    }

    const treeData = computed(() => {
      return filterList(EVENT_TYPE, props.excludes, props.includes)
    })

    const handleDialogOpen = () => {
      nextTick().then(() => {
        treeRef.value?.setCurrentKey(treeModel.value.eventType)
      })
    }

    const handleNodeClick = ({ data }) => {
      treeModel.value.eventType = data.value
      treeModel.value.eventName = data.label
    }

    function saveItem (resolve) {
      const { parent, item, index } = currentDialog.value
      Reflect.deleteProperty(item, '_viewData')
      Reflect.deleteProperty(item, '_apiData')
      if (index > -1) {
        eventsBridge.value[parent.type].value.splice(index, 1, { ...item, ...treeModel.value })
      } else {
        eventsBridge.value[parent.type].value.push({ ...item, ...treeModel.value })
      }
      currentDialog.value.isShow = false
      collaseExpends.value = [...new Set([...collaseExpends.value, parent.type])]
      resolve()
    }

    // 删除
    const handleDelete = (parent, element, index) => {
      CipMessageBox.confirm(`确认删除${element.eventName}?`, '提示').then(() => {
        eventsBridge.value[parent.type].value.splice(index, 1)
      }).catch(() => {})
    }
    // 编辑
    const handleEdit = (parent, item, index) => {
      handleNodeClick({ data: { value: item.eventType, label: item.eventName } })
      currentDialog.value = {
        parent,
        item,
        index,
        isShow: true
      }
    }

    function addEvent (parent) {
      handleNodeClick({ data: { value: 'updateView', label: '联动' } })
      currentDialog.value = {
        parent,
        item: { eventType: 'updateView' },
        index: -1,
        isShow: true
      }
    }

    function saveUpdateView (item, resolve) {
      const { type, target, inputParams } = item
      const _item = {
        target,
        inputParams,
        eventType: 'updateView',
        eventName: '联动'
      }
      if (Object.prototype.hasOwnProperty.call(eventsBridge.value, type)) {
        eventsBridge.value[type].value.push(_item)
      } else {
        eventsBridge.value[type] = {
          label: eventTypeMap[type],
          type,
          value: [_item]
        }
      }
      collaseExpends.value = [...new Set([...collaseExpends.value, type])]
      updateSelectItem()
      resolve()
    }
    const { state, render } = useUpdateView(drDesign, eventTypes, saveUpdateView)

    return () => eventTypes.value.length > 0 && <>
      <ElButton style="width: 100%" class="mt-2" onClick={() => { state.isShow = true; state.item = {} }}>联动</ElButton>
      <ElDropdown style="width: 100%" class="my-2" onCommand={onCommand}>{{
        default: () => <ElButton style="width: 100%">添加事件</ElButton>,
        dropdown: () => <ElDropdownMenu>
          {eventTypes.value.map(e => <ElDropdownItem command={e.value} disabled={Object.prototype.hasOwnProperty.call(eventsBridge.value, e.value)}>{e.label}</ElDropdownItem>)}
        </ElDropdownMenu>
      }}</ElDropdown>
      <ElCollapse v-model={collaseExpends.value}>
        {eventList.value.map(parent => <ElCollapseItem name={parent.type}>{{
          title: () => <>
            {parent.label}
            <span style={{ flex: 'auto' }}></span>
            <ElIcon onClick={withModifiers(() => addEvent(parent), ['stop'])}><Plus/></ElIcon>
            <ElIcon onClick={withModifiers(() => deleteEvent(parent), ['stop'])} class="mx-2"><Delete/></ElIcon>
          </>,
          default: () => <div class="event-handle--content">
          <VueDraggable v-model={parent.value}>
            {
              {
                item: ({ element, index }) => {
                  return <div className="event-handle--content__item">
                    <div className="event-handle--content__item--text">{element.eventName}</div>
                    <div className="event-handle--content__item--icon">
                      <CipButtonText size="small" icon={Edit} type="text" onClick={() => handleEdit(parent, element, index)}></CipButtonText>
                      <CipButtonText size="small" icon={Delete} type="text" onClick={() => handleDelete(parent, element, index)}></CipButtonText>
                    </div>
                  </div>
                }
              }
            }
          </VueDraggable>
        </div>
        }}</ElCollapseItem>)}
      </ElCollapse>
      <CipDialog title={'事件'} v-model={currentDialog.value.isShow} onConfirm={saveItem} onOpen={handleDialogOpen}>
        <LayoutBox>{{
          operate: () => <CpTree options={treeData.value} showButton={false} onNode-click={handleNodeClick} ref={treeRef} config={{ highlightCurrent: true, nodeKey: 'value' }}></CpTree>,
          content: () => <CipForm v-model:model={currentDialog.value.item} fieldList={formFieldList.value} key={treeModel.value.eventType} />
        }}</LayoutBox>
      </CipDialog>
      {render()}
    </>
  }
}
