import { CipForm, generateFieldList } from 'd-render'
import { getComponentCssConfigure } from './util'
import { nextTick, ref, watch } from 'vue'
import './index.less'

export default {
  props: {
    selectItem: {},
    schema: {},
    type: {}
  },
  emits: ['update:selectItem'],
  setup (props, { emit }) {
    const getFieldComponentConfigureFieldConfigList = async (val) => {
      let configure
      try {
        configure = await getComponentCssConfigure(val, props.type)
      } catch (e) {
        // 若获取配置发生错误直接使用默认配置
        console.warn(`form-design: 获取${val}组件配置文件发生错误,使用默认配置进行替换`)
        // configure = defaultConfigureOptions()
        configure = {}
      }
      return generateFieldList(configure)
    }
    const fieldComponentConfigureFieldConfigList = ref([])
    watch([() => props.selectItem?.config?.type, () => props.selectItem?.config?.key], ([val]) => {
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

    return () => {
      if (props.selectItem?.config?.type.endsWith('Chart')) {
        return <CipForm
          class="css-configure"
          model={props.selectItem}
          labelPosition={'top'}
          onUpdate:model={(val) => emit('update:selectItem', val)}
          fieldList={fieldComponentConfigureFieldConfigList.value}
        />
      } else {
        return <CipForm
          class="css-configure"
          model={props.selectItem.config.style}
          labelPosition={'top'}
          onUpdate:model={style => {
            const _val = props.selectItem
            _val.config.style = style
            emit('update:selectItem', _val)
          }}
          fieldList={fieldComponentConfigureFieldConfigList.value}
        />
      }
    }
  }
}
