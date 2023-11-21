import { ElTreeSelect, ElIcon, ElInput, ElButton, ElCard, ElRadioGroup, ElRadioButton, ElForm, ElFormItem } from 'element-plus'
import { Plus, Minus } from '@element-plus/icons-vue'
import CipButtonText from '@cip/components/cip-button-text'
import CipDialog from '@cip/components/cip-dialog'
import { reactive, inject, computed } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { getModuleTree } from '@/components/d-render-plugin-page-render/use-event-configure'
import LSelect from '../select-dependOn/select'
import { dataInfoService } from '@/api'

const signOptions = [
  { label: '等于', value: '==' },
  { label: '不等于', value: '!=' },
  { label: '大于', value: '>' },
  { label: '大于等于', value: '>=' },
  { label: '小于', value: '<' },
  { label: '小于等于', value: '<=' }
]

const logicSign = [
  { label: '且', value: '&&' },
  { label: '或', value: '||' }
]

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
          value: pKey ? `${pKey}.${item.key}` : item.key,
          label: item.config.label
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
      if (props.config?.outDependOn) {
        return getModuleTree(true, drDesign) || []
      } else {
        return getModules(drDesign.schema?.list, '', props.dependOnValues.id) || []
      }
    })

    const state = reactive({
      isShow: false,
      fieldList: [],
      form: proxyOtherValue[1].value || {
        value: '',
        mode: 'static',
        conditions: [{
          source: '',
          sign: '==',
          target: '',
          logic: '&&'
        }]
      },
      tableOptions: []
    })
    // 请求关联表下拉数据
    dataInfoService.tree({ withBasic: false }).then(({ data }) => {
      state.tableOptions = data?.datasources || []
    })

    function changeModelData (id) {
      if (id) {
        dataInfoService.detail({ id }).then(({ data }) => {
          state.fieldList = (data?.fields || []).map(({ title, name }) => ({ label: title, value: name }))
        })
      } else {
        state.fieldList = []
      }
    }

    const addCondition = (item) => {
      item.conditions.push({
        source: '',
        sign: '===',
        target: '',
        logic: '&&'
      })
    }
    const removeCondition = (item, index) => {
      item.conditions.splice(index, 1)
    }
    const renderConditions = (item) => {
      return item.conditions.map((condition, index) => (
        <div class="change-value-box__row" key={index}>
          {item.conditions.length > 1 && index > 0 && (
            <div class="cvb-logic">
              <LSelect v-model={condition.logic} config={{ options: logicSign, clearable: false }} />
            </div>
          )}
          <div class={{ 'cvb-source': true, 'no-logic': index === 0 }}>
            <ElTreeSelect style="width: 100%" v-model={condition.source} clearable data={list.value} props={{ label: 'title', value: 'name' }} default-expand-all check-strictly />
          </div>
          <div class="cvb-sign">
            <LSelect v-model={condition.sign} config={{ options: signOptions, clearable: false }} />
          </div>
          <div class="cvb-target">{renderMap[state.form.mode].renderTarget(condition)}</div>
          <div class="cvb-opt">
            <CipButtonText onClick={() => addCondition(item)}>
              <ElIcon><Plus /></ElIcon>
            </CipButtonText>
            {item.conditions.length > 1 && (
              <CipButtonText onClick={() => removeCondition(item, index)}>
                <ElIcon>
                  <Minus />
                </ElIcon>
              </CipButtonText>
            )}
          </div>
        </div>
      ))
    }

    const renderMap = {
      static: {
        topSelect () {
          return <span></span>
        },
        renderValue () {
          return <ElInput v-model={state.form.value} />
        },
        renderTarget (condition) {
          return <ElInput v-model={condition.target} />
        }
      },
      api: {
        topSelect () {
          return <ElFormItem label="选择接口">
            <LSelect v-model={state.form.api} config={{ options: logicSign, clearable: false }} />
          </ElFormItem>
        },
        renderValue () {
          return <LSelect v-model={state.form.value} config={{ options: [{ label: '单条数据', value: 'content' }, { label: '多条数据', value: 'list' }], clearable: false }} />
        },
        renderTarget (condition) {
          return <ElInput v-model={condition.target} />
        }
      },
      table: {
        topSelect () {
          return <ElFormItem label="数据关联表">
            <ElTreeSelect style="width: 100%" v-model={state.form.table} data={state.tableOptions} onChange={changeModelData}
              props={{ label: 'name', value: 'id' }} default-expand-all filterable />
          </ElFormItem>
        },
        renderValue () {
          return <LSelect v-model={state.form.value} config={{ options: state.fieldList, clearable: false }} />
        },
        renderTarget (condition) {
          return <LSelect v-model={condition.target} config={{ options: state.fieldList, clearable: false }} />
        }
      }
    }

    function onConfirm (resolve) {
      const dependOnList = []
      let str = 'debugger; if ('
      state.form.conditions.forEach((item, index) => {
        if (index === 0) {
          str += `(dependOnValues.${item.source} ${item.sign} ${item.target})`
        } else {
          str += `${item.logic}  (dependOnValues.${item.source} ${item.sign} ${item.target})`
        }
        dependOnList.push(item.source)
      })
      str += `) {
        return {
          value: ${state.form.value}
        }
      }`
      proxyValue.value = str
      proxyOtherValue[0].value = [...new Set(dependOnList)]
      proxyOtherValue[1].value = state.form
      resolve()
    }
    return () => <>
      <ElButton type="primary" style="width: 100%" onClick={() => { state.isShow = true }}>数据联动</ElButton>
      <CipDialog title="设置数据联动" v-model={state.isShow} class="change-value" onConfirm={onConfirm}>
        <ElForm label-position="top">
          <ElFormItem label="关联模式">
            <ElRadioGroup v-model={state.form.mode}>
              <ElRadioButton label="static">静态数据</ElRadioButton>
              <ElRadioButton label="api">接口请求</ElRadioButton>
              <ElRadioButton label="table">数据关联表</ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
          {renderMap[state.form.mode].topSelect()}
        </ElForm>
        <ElCard class="my-2" header="条件规则" shadow="never">{renderConditions(state.form)}</ElCard>
        <div class="flex-center">
          <ElInput readonly disabled modelValue={props.dependOnValues.label} />
          <span class="flex-shrink mx-2">联动显示为</span>
          {renderMap[state.form.mode].renderValue()}
          <span class="flex-shrink mx-2">的值</span>
        </div>
      </CipDialog>
    </>
  }
}
