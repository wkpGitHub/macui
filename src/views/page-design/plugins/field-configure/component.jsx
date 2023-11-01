import { nextTick, ref, watch, provide, inject } from 'vue'
import { CipForm } from 'd-render'
import { getComponentConfigure } from './config'
import {
  configureOptionsFieldConfigMap,
  defaultConfigureOptions,
  generateFieldList
} from '@d-render/shared'
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
    // TODO: 通过源代码修改，修改的值无法正常的回显，因为检测不到selectItem的变化
    const configBridge = ref({})
    watch(() => props.selectItem, (val) => {
      if (!val?.key) return
      configBridge.value = val.config
      configBridge.value.key = val.key
      configBridge.value.id = val.id
    }, { immediate: true, deep: true })

    const getFieldComponentConfigureFieldConfigList = async (val) => {
      let configure
      try {
        configure = await getComponentConfigure(val)
      } catch (e) {
        // 若获取配置发生错误直接使用默认配置
        console.warn(`form-design: 获取${val}组件配置文件发生错误,使用默认配置进行替换`)
        configure = defaultConfigureOptions()
      }
      const { config: { filedOptionMap } } = drDesign.path.find(item => item?.config?.type === 'curd') || { config: {} }
      if (filedOptionMap && !['curd', 'searchForm', 'pageTable'].includes(configBridge.value.type)) {
        let options = []
        if (drDesign.path.find(item => item?.config?.type === 'searchForm')) {
          options = ((filedOptionMap.search || []).map(item => ({ label: item.key, value: item.key, type: item.config.type, title: item.config.label })))
        } else if (drDesign.path.find(item => item?.config?.type === 'pageTable')) {
          options = ((filedOptionMap.table || []).map(item => ({ label: item.key, value: item.key, type: item.config.type, title: item.config.label })))
        }
        configure.type = { hideItem: true }
        return generateFieldList(configure, configureOptionsFieldConfigMap, {
          key: {
            type: 'select',
            options,
            withObject: true,
            otherKey: 'keyObj'
          },
          label: {
            dependOn: ['keyObj'],
            changeValue ({ keyObj }) {
              return { value: keyObj.title }
            }
          },
          type: {
            dependOn: ['keyObj'],
            changeValue ({ keyObj }) {
              return { value: keyObj.type }
            }
          }
        })
      } else {
        return generateFieldList(configure, configureOptionsFieldConfigMap)
      }
    }
    const fieldComponentConfigureFieldConfigList = ref([])
    watch([() => configBridge.value.type, () => configBridge.value.key], ([val]) => {
      if (val) {
        fieldComponentConfigureFieldConfigList.value = []
        // dependOn存在缓存问题，暂时先进行清空再赋值操作
        getFieldComponentConfigureFieldConfigList(val).then(res => {
          nextTick().then(() => {
            fieldComponentConfigureFieldConfigList.value = res
          })
        })
      } else {
        return []
      }
    }, { immediate: true })

    const updateSelectItem = (val) => {
      const selectItem = props.selectItem
      selectItem.key = val.key
      Reflect.deleteProperty(val, 'key')
      Reflect.deleteProperty(val, 'id')
      selectItem.config = val// { ...val }
      emit('update:selectItem', selectItem)
    }

    return () => <CipForm
      labelPosition="top"
      model={configBridge.value}
      onUpdate:model={updateSelectItem}
      fieldList={fieldComponentConfigureFieldConfigList.value}
      modelKey="id"
    />
  }
}