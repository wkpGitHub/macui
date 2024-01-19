import { h, reactive, ref, toRefs, provide } from 'vue'
import {
  toUpperFirstCase,
  getFieldValue,
  DRender
} from '@d-render/shared'
import { CipFormItem, CipFormLayout } from 'd-render'
import './component.less'
// import CipFormLayout from 'd-render/src/cip-form-layout'
const dRender = new DRender()
export default {
  name: 'DrPage',
  props: {
    model: Object,
    fieldList: Array,
    modelKey: {
      type: [String, Function]
    },
    grid: { type: Number }, // 是否开启grid布局
    equipment: {
      type: String,
      default: 'pc',
      validate: (val) => ['pc', 'mobile'].includes(val)
    },
    enterHandler: Function, // 回车触发回调
    options: Object,
    dataBus: Function
  },
  emits: ['update:model', 'submit', 'cancel'],
  setup (props, context) {
    // 下发属性
    const { fieldList } = toRefs(props)
    // 修改model的值
    const updateModel = (val) => {
      context.emit('update:model', val)
    }
    const generateComponentKey = (key) => {
      if (props.modelKey) {
        const appendKey = toUpperFirstCase(key)
        if (typeof props.modelKey === 'function') {
          return `${props.modelKey(props.model)}${appendKey}`
        } else {
          const value = getFieldValue(props.model, props.modelKey)
          return `${value || ''}${appendKey}`
        }
      } else {
        return key
      }
    }
    // 获取layout及item组件需要的props
    const getComponentProps = (key, config) => {
      const componentKey = generateComponentKey(key)
      const componentProps = {
        key: componentKey,
        componentKey,
        model: props.model,
        fieldKey: key,
        config,
        dataBus: props.dataBus,
        grid: props.grid,
        'onUpdate:model': (val) => {
          if (componentKey === generateComponentKey(key)) {
            updateModel(val)
          }
        }
      }
      if (props.enterHandler) {
        componentProps.onKeyup = (e) => {
          const { keyCode } = e
          if (keyCode === 13) {
            props.enterHandler()
          }
        }
      }
      return componentProps
    }
    // 布局字段渲染方式
    const getFormLayout = (componentProps) => {
      return h(CipFormLayout, {
        ...componentProps,
        onSubmit: () => {
          context.emit('submit')
        },
        onCancel: () => {
          context.emit('cancel')
        }
      }, {
        item: ({ children = [], isShow } = {}) => {
          return children.map((v) => getFormDefaultSlot(v, isShow))
        }
      })
    }
    // 输入字段渲染方式
    const getFormItem = (componentProps) => {
      return h(CipFormItem, componentProps)
    }
    // 渲染单个字段
    const getFormDefaultSlot = ({ key, config } = {}, isShow) => {
      // 若存在字段key值的插槽覆盖则配置整个ElFormItem
      config._isGrid = props.grid
      config._isShow = isShow
      if (context.slots[key]) {
        return context.slots[key]({ key, config })
      }
      const componentProps = getComponentProps(key, config)
      // 若存在字段key值+Input的插槽覆盖则配置ElFormItem内的Input
      if (context.slots[`${key}Input`]) {
        return h(CipFormItem, {
          ...componentProps,
          customSlots: context.slots[`${key}Input`]
        })
      }
      // 判断是否为布局类型的字段
      if (dRender.isLayoutType(config.type)) {
        // layout类型字段
        return getFormLayout(componentProps)
      } else {
        // input类型字段
        // 如果需要表单目录导航则添加
        return getFormItem(componentProps)
      }
    }
    // 渲染表单
    const getFormDefaultSlots = () => {
      return fieldList.value.map((v) => getFormDefaultSlot(v))
    }
    provide('cipForm', reactive({ equipment: props.equipment }))
    const page$ = ref()
    return () => h('div', {
      ref: page$,
      class: [
        'dr-page',
        `dr-page--${props.equipment}`,
        'dr-page--grid'
      ],
      style: { gridTemplateColumns: `repeat(${typeof props.grid === 'number' ? props.grid : 1},1fr)` }
    }, { default: () => getFormDefaultSlots() })
  }
}
