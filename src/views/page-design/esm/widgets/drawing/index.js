import { ref, computed, provide, watch, createVNode, createTextVNode, h } from 'vue'
import VueDraggable from 'vuedraggable'
import { useNamespace, isNotEmpty } from '@d-render/shared'
import { useList, useFieldDrawing } from './use-field-drawing'
import FormDrawingContent from './widgets/content'
import DeviceContainer from '../../widgets/device-container'

const __defProp = Object.defineProperty
const __getOwnPropSymbols = Object.getOwnPropertySymbols
const __hasOwnProp = Object.prototype.hasOwnProperty
const __propIsEnum = Object.prototype.propertyIsEnumerable
const __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value
const __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) {
    if (__hasOwnProp.call(b, prop)) { __defNormalProp(a, prop, b[prop]) }
  }
  if (__getOwnPropSymbols) {
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) { __defNormalProp(a, prop, b[prop]) }
    }
  }
  return a
}
const index = {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    equipment: {
      type: String
    },
    selectId: [Number, String],
    deviceType: {},
    Component: {},
    handleIconComponent: {}
  },
  emits: ['updateList', 'select'],
  setup (props, context) {
    const ns = useNamespace('design-drawing')
    const {
      list,
      updateList
    } = useList({
      props,
      emit: context.emit
    })
    const {
      selectItem,
      deleteItem,
      copyItem
    } = useFieldDrawing({
      list,
      updateList,
      emit: context.emit
    })
    const addItem = ({
      newIndex
    }) => {
      const newItem = list.value[newIndex]
      context.emit('select', newItem)
    }
    const updateConfig = (element, val) => {
      let _a
      const cloneList = ((_a = props.data) == null ? void 0 : _a.list) || []
      element.config = val
      updateList(cloneList, 'layoutUpdate')
    }
    const hoverList = ref([])
    const entryElement = (id) => {
      leaveElement(id)
      hoverList.value.push(id)
    }
    const leaveElement = (id) => {
      const idx = hoverList.value.indexOf(id)
      if (idx > -1) {
        hoverList.value.splice(hoverList.value.indexOf(id), 1)
      }
    }
    const currentHoverId = computed(() => {
      if (hoverList.value.length === 0) { return void 0 }
      return hoverList.value[hoverList.value.length - 1]
    })
    provide('designDrawing', {
      entryElement,
      leaveElement,
      currentHoverId
    })
    const FormContent = (...args) => {
      const {
        element,
        index
      } = args[0]
      const formContentProps = {
        selectId: props.selectId,
        grid: grid.value,
        element,
        index,
        formLabelPosition: props.data.formLabelPosition,
        Component: props.handleIconComponent,
        onUpdateConfig: (val) => {
          updateConfig(element, val)
        },
        onClick: () => {
          selectItem(element)
        },
        onDelete: () => {
          deleteItem(index)
          leaveElement(element.id)
        },
        onCopy: () => copyItem(index),
        onSelectItem: (element2) => selectItem(element2)
      }
      return h(FormDrawingContent, __spreadValues({}, formContentProps))
    }
    watch(() => props.selectId, (val) => {
      if (!val && list.value.length > 0) {
        selectItem(list.value[0])
      }
    }, {
      immediate: true
    })
    const grid = computed(() => {
      let _a
      if (props.equipment === 'mobile') {
        return 1
      } else {
        return (_a = props.data.grid) != null ? _a : 1
      }
    })
    console.log('C', props.Component)
    return () => createVNode('div', {
      class: [ns.e('container')]
    }, [list.value.length === 0 && createVNode('div', {
      class: 'empty-form--text'
    }, [createTextVNode('\u4ECE\u5DE6\u4FA7\u62D6\u62FD\u6765\u6DFB\u52A0\u5B57\u6BB5')]), createVNode('div', {
      class: [ns.b(), ns.m(props.equipment)]
    }, [createVNode(DeviceContainer, {
      type: 'design',
      equipment: props.equipment,
      deviceType: props.deviceType
    }, {
      default: () => [createVNode(props.Component, {
        style: {
          height: '100%',
          padding: props.equipment === 'pc' ? '20px' : ''
        },
        fieldList: [],
        size: props.data.tableSize || 'default',
        labelWidth: `${props.data.labelWidth}px`,
        labelPosition: props.data.labelPosition,
        labelSuffix: props.data.labelSuffix,
        equipment: props.equipment,
        schema: props.data
      }, {
        default: () => [createVNode(VueDraggable, {
          modelValue: list.value,
          'onUpdate:modelValue': (val) => updateList(val),
          itemKey: 'id',
          group: 'components',
          handle: '.move-icon',
          ghostClass: 'ghost',
          animation: 200,
          componentData: {
            class: ns.be('content', 'wrapper')
            // style: isNotEmpty(grid.value) ? `display: grid;column-gap: 12px; grid-template-columns: repeat(${grid.value},1fr); align-content: start;` : ''
          },
          onAdd: ({
            newIndex
          }) => addItem({
            newIndex
          })
        }, {
          item: FormContent
        })]
      })]
    })])])
  }
}

export { index as default }
