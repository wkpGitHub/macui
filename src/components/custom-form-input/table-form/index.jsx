import { ref, defineComponent, computed, nextTick } from 'vue'
import { CipTable, CipForm } from 'd-render'
import { Plus } from '@element-plus/icons-vue'
import CipButtonText from '@cip/components/cip-button-text'
import CipButton from '@cip/components/cip-button'
import Layout from './layout'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import CipMessageBox from '@cip/components/cip-message-box'

export default defineComponent({
  inheritAttrs: false,
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      width,
      securityConfig
    } = useFormInput(props, ctx)
    const { attrs } = ctx
    const table$ = ref()
    const tempItem = ref()
    const handleCurrentChange = (row) => {
      tempItem.value = row
    }
    const options = computed(() => securityConfig.value.options)
    const createItem = (index) => {
      const initValue = securityConfig.value.createInitValue ? securityConfig.value.createInitValue() : {}
      tempItem.value = initValue
      if (index >= 0) {
        proxyValue.value.splice(index, 0, initValue)
      } else {
        proxyValue.value.push(initValue)
      }
      // 刚刚插入还没选人无法选中需要nextTick
      nextTick().then(() => {
        table$.value.cipTableRef.setCurrentRow(initValue)
        // table$.value.setCurrentRow(initValue)
      })
    }
    const deleteItem = (index) => {
      CipMessageBox.confirm('确认删除此条数据', '提示').then(res => {
        proxyValue.value.splice(index, 1)
      }).catch((e) => {})
    }
    return () => <Layout
      style={{ width: width.value }}
      table={<>
        <CipTable
          {...attrs}
          height={securityConfig.value.height}
          size={securityConfig.value.size}
          rowKey={'name'}
          v-model:data={proxyValue.value}
          highlightCurrentRow
          onCurrent-change={handleCurrentChange}
          ref={table$}
          columns={options.value}
          withTableHandle={true}
          v-slots={{
            $handler: ({ $index }) => <>
            <CipButtonText onClick={() => createItem($index)}>插入</CipButtonText>
            <CipButtonText onClick={() => deleteItem($index)}>删除</CipButtonText>
          </>
          }}/>
        <div style="text-align: center" class="basic-table__add" type="info" v-if="!securityConfig.hideAdd">
          <CipButton link onClick={createItem} icon={Plus}>
            添加
          </CipButton>
        </div>
      </>}
      form={ tempItem.value && <CipForm
        v-model:model={tempItem.value}
        grid={securityConfig.value._isGrid}
        fieldList={securityConfig.value.formFieldList}
      />}
    >
    </Layout>
  }
})
