import { defineComponent, ref } from 'vue'
import { CipTable, CipForm } from 'd-render'
import CipDialog from '@cip/components/cip-dialog'
import CipTableButton from '@cip/components/cip-table-button'
import CipTree from '@cip/components/cip-tree'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { tableColumns, formFieldList } from './config'

export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      width
    } = useFormInput(props, ctx)

    const options = [{
      label: '123',
      value: '123',
      children: [{
        label: '测试',
        value: '777'
      }
      ]
    }]

    const visible = ref(false)
    const expressVisible = ref(false)
    const levelVisible = ref(false)
    function handleAddOrg () {
      visible.value = true
    }
    function handleAddExpress () {
      expressVisible.value = true
    }
    function handleDel ($index) {
      proxyValue.value.splice($index, 1)
    }
    function handleAddLevel () {
      levelVisible.value = true
    }
    const treeRef = ref()
    const expressTreeRef = ref()
    function handleConfirm (reslove) {
      const temp = treeRef.value.tree.getCheckedNodes(true)
      console.log(temp, 'temp')
      proxyValue.value = temp
      reslove()
    }
    function handleExpressFirm (reslove) {
      const temp = expressTreeRef.value.tree.getCheckedNodes(true)
      console.log(temp, 'temp')
      proxyValue.value = [{ ...temp[0], userType: 1, scopeLabel: '表达式', index: 1 }]
      reslove()
    }
    function handleLevelFirm () {
      levelVisible.value = false
    }
    return () => <>
      <CipTable
        showHeader={false}
        data={proxyValue.value || []}
        columns={tableColumns}
        styles={{ width: width.value }}
        withTableHandle={true}
        maxHeight={'300px'}
        handlerWidth={'80px'}
      >
        {{
          $handler: ({ $index }) => <>
            <CipTableButton onClick={() => { handleDel($index) }}>删除</CipTableButton>
          </>
        }}
      </CipTable>
      <CipButton onClick={handleAddOrg}>添加组织成员</CipButton>
      <CipButton onClick={handleAddExpress}>添加表达式</CipButton>
      <CipButton onClick={handleAddLevel}>添加上下级</CipButton>
      <CipDialog
        title={'选择字段'}
        v-model={visible.value}
        onConfirm={handleConfirm}
        size={'small'}
      >
        <CipTree
          ref={treeRef}
          options={options}
          showButton={false}
          config={{
            showCheckbox: true
          }}
        >
        </CipTree>
      </CipDialog>
      <CipDialog
        title={'选择表达式'}
        v-model={expressVisible.value}
        onConfirm={handleExpressFirm}
        size={'small'}
      >
        <CipTree
          ref={expressTreeRef}
          options={options}
          showButton={false}
          config={{
            showCheckbox: true
          }}
        >
        </CipTree>
      </CipDialog>
      <CipDialog
        title={'选择上下级'}
        v-model={levelVisible.value}
        onConfirm={handleLevelFirm}
        size={'small'}
      >
        <CipForm
          v-model:model={proxyValue.value}
          fieldList={formFieldList}/>
      </CipDialog>
    </>
  }
})
