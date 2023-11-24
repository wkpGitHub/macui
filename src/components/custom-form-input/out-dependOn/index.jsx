import { ElTreeSelect, ElInput, ElButton } from 'element-plus'
import CipDialog from '@cip/components/cip-dialog'
import { reactive, inject, computed } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { getModuleTree, getListConfigByKey } from '@/components/d-render-plugin-page-render/use-event-configure'

function getModules (list = [], pKey = '', id) {
  let _list = []
  let notFind = true
  function deepFind (list, pKey, id) {
    list.forEach(item => {
      const _item = { }

      _item.name = pKey ? `${pKey}.${item.key}` : item.key
      // 是layout继承当前父亲key，否则继承父亲key+当前key
      // const _pKey = isLayoutType(item.config.type) ? pKey : _item.name
      if (item.id === id) {
        _list = list.map(item => ({
          disabled: item.id === id,
          name: pKey ? `${pKey}.${item.key}` : item.key,
          title: item.config.label
        }))
        notFind = false
      }
      if (item.config.options && notFind) {
        const _children = []
        item.config.options.forEach(o => o.children && _children.push(...o.children))
        deepFind(_children, '', id)
      }
    })
  }
  deepFind(list, pKey, id)
  return _list
}

export default {
  name: 'curd-config',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const drDesign = inject('drDesign', {})
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx, { maxOtherKey: 2 })

    const list = computed(() => {
      if (props.config?.canOutDependOn) {
        return getModuleTree(true, drDesign) || []
      } else {
        return getModules(drDesign.schema?.list, '', props.dependOnValues.id) || []
      }
    })

    let _parent
    function getParent (parent) {
      const children = []
      parent.config?.options?.forEach(o => o.children && children.push(...o.children))
      if (children?.length) {
        children.forEach(item => {
          if (item.id === props.dependOnValues.id) {
            _parent = parent
          } else {
            getParent(item)
          }
        })
      }
    }
    getParent({ config: { options: [{ children: drDesign.schema?.list }] } })

    const state = reactive({
      isShow: false,
      fieldList: [],
      target: proxyOtherValue[0].value ? proxyOtherValue[0].value[0] : ''
    })

    function onConfirm (resolve) {
      // proxyValue.value = `return {
      //   value: dependOnValues.${state.target}
      // }`
      // proxyOtherValue[0].value = [state.target]
      resolve()
    }

    function onNodeClick (data, node) {
      if (_parent) {
        if (['searchForm', 'pageTable', 'form'].includes(_parent.config.type)) {
          // 同一个父亲
          const _name = node.parent.data.name.split('.').pop()
          if (_name === _parent.key) {
            const _key = data.name.split('.').pop()
            proxyOtherValue[0].value = [_key]
            proxyValue.value = `return {
              value: dependOnValues.${_key}
            }`
          } else {
            if (_parent.config.dependOn) {
              _parent.config.dependOn = [...new Set([..._parent.config.dependOn, data.name])]
            } else {
              _parent.config.dependOn = [data.name]
            }
            proxyOtherValue[1].value = [data.name]
            proxyValue.value = `return {
              value: outDependOnValues.${data.name}
            }`
          }
        } else {
          proxyOtherValue[0].value = [data.name]
          proxyValue.value = `return {
            value: dependOnValues.${data.name}
          }`
        }
      } else {
        proxyOtherValue[0].value = [data.name]
        proxyValue.value = `return {
          value: dependOnValues.${data.name}
        }`
      }
    }

    return () => <>
      <ElButton type="primary" style="width: 100%" onClick={() => { state.isShow = true }}>数据联动</ElButton>
      <CipDialog title="设置数据联动" v-model={state.isShow} class="change-value" onConfirm={onConfirm}>
        <div class="flex-center">
          <ElInput readonly disabled modelValue={props.dependOnValues.label} />
          <span class="flex-shrink mx-2">联动显示为</span>
          <ElTreeSelect style="width: 100%" v-model={state.target} onNodeClick={onNodeClick} clearable data={list.value} props={{ label: 'title', value: 'name' }} default-expand-all check-strictly />
          <span class="flex-shrink mx-2">的值</span>
        </div>
      </CipDialog>
    </>
  }
}
