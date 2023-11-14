import { defineComponent, ref } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import CipTree from '@cip/components/cip-tree'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import styles from './index.module.less'
export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      securityConfig
    } = useFormInput(props, ctx)

    const orgOptions = [{
      label: 'pdm',
      value: 'pdm@citycloud.com.cn',
      children: [{
        label: 'pdm',
        value: 'pdm@citycloud.com.cn'
      }
      ]
    }]
    const visible = ref(false)
    const treeRef = ref()
    function handleConfirm (reslove) {
      const temp = treeRef.value.tree.getCheckedNodes(true)
      arrayData.value.push({
        type: 'user',
        userType: 0,
        scopeLabel: '人员：',
        icon: '',
        desc: '城云科技(中国)有限公司',
        department: '城云科技(中国)有限公司',
        uid: 'pdm@citycloud.com.cn',
        name: 'pdm',
        username: '',
        email: 'pdm@citycloud.com.cn',
        avatar: '',
        phone: '18957146709',
        nickName: 'pdm',
        isRef: true,
        ...temp[0]
      })
      proxyValue.value = arrayData.value
      reslove()
    }
    const arrayData = ref([])
    return () => <>
      <div class={styles.form}>
        <CipButton onClick={() => { visible.value = true }} buttonType="create">{securityConfig.value.text}</CipButton>
      </div>
      <CipDialog
        title={'选择字段'}
        v-model={visible.value}
        onConfirm={handleConfirm}
        size={'small'}
      >
        <CipTree
          ref={treeRef}
          options={orgOptions}
          showButton={false}
          config={{
            showCheckbox: true
          }}
        >
        </CipTree>
      </CipDialog>
    </>
  }
})
