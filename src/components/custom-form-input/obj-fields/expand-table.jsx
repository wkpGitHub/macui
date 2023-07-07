import { defineComponent } from 'vue'
import CipButton from '@cip/components/cip-button'
import { ElFormItem, ElInput, ElSelect, ElOption, ElCheckbox } from 'element-plus'

import styles from './index.module.less'
const typeOptions = [
  {
    label: '文本',
    value: 'string'
  },
  {
    label: '数字',
    value: 'number'
  },
  {
    label: '整数',
    value: 'int'
  },
  {
    label: '布尔',
    value: 'boolean'
  },
  {
    label: '对象',
    value: 'object'
  },
  {
    label: '数组',
    value: 'array'
  }
]

export default defineComponent({
  name: 'ExpandTable',
  props: {
    data: {
      default: () => []
    }
  },
  setup (props) {
    function addProperty () {
      // eslint-disable-next-line vue/no-mutating-props
      props.data.push({
        type: 'string'
      })
    }

    function delProperty ($index) {
      // eslint-disable-next-line vue/no-mutating-props
      props.data.splice($index, 1)
    }

    function handleChangeType (v, type) {
      if (type === 'object') {
        v.children = []
      }
    }
    return () => <div styles='width: 100%;'>
      {
        props.data.map((v, index) => <>
          <div class={styles.block}>
            <ElFormItem><ElInput v-model={v.name} placeholder='字段名'/></ElFormItem>
            <ElFormItem><ElInput v-model={v.title} placeholder='名称'/></ElFormItem>
            <ElFormItem>
              <ElSelect v-model={v.type} onChange={(type) => { handleChangeType(v, type) }}>
                {typeOptions.map(type => <ElOption label={type.label} value={type.value}></ElOption>)}
              </ElSelect>
            </ElFormItem>
            <ElFormItem><ElCheckbox v-model={v.isArray} label='是否数组'/></ElFormItem>
            <ElFormItem><ElCheckbox v-model={v.required} label='必填'/></ElFormItem>
            <div onClick={() => { delProperty(index) }}>删除</div>
          </div>
          {
            v.children && <ExpandTable style='margin-left: 20px;' data={v.children}></ExpandTable>
          }
        </>)
      }
      <CipButton type='primary' text onClick={addProperty}>新增属性</CipButton>
    </div>
  }
})
