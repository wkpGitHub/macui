import { defineComponent, ref } from 'vue'
import { CipForm } from 'd-render'
import CipDialog from '@cip/components/cip-dialog'
import CipTree from '@cip/components/cip-tree'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { formFieldList } from './config'
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus'
import { Setting, CircleClose } from '@element-plus/icons-vue'
import styles from './index.module.less'
export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue
    } = useFormInput(props, ctx)

    const options = [{
      // eslint-disable-next-line no-template-curly-in-string
      label: '${IF()}',
      // eslint-disable-next-line no-template-curly-in-string
      value: '${IF()}',
      children: [{
        // eslint-disable-next-line no-template-curly-in-string
        label: '${IF()}',
        // eslint-disable-next-line no-template-curly-in-string
        value: '${IF()}'
      }
      ]
    }]
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
    const expressVisible = ref(false)
    const levelVisible = ref(false)
    const treeRef = ref()
    const expressTreeRef = ref()
    const levelFormValue = ref()
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
    function handleExpressFirm (reslove) {
      const temp = expressTreeRef.value.tree.getCheckedNodes(true)
      arrayData.value.push({
        userType: 1,
        scopeLabel: '表达式：',
        index: 1,
        ...temp[0]
      })
      console.log(temp, 'temp')
      proxyValue.value = arrayData.value
      reslove()
    }
    function handleLevelFirm () {
      console.log(levelFormValue.value)
      arrayData.value.push({
        params: {
          variables: [
            {
              label: '上下文',
              tag: '对象',
              type: 'object',
              selectMode: 'tree',
              children: []
            },
            {
              label: '系统变量',
              selectMode: 'tree',
              tag: '对象',
              type: 'object',
              children: [
                {
                  label: '用户信息',
                  value: 'user',
                  type: 'object',
                  tag: '对象',
                  disabled: false,
                  children: [
                    {
                      label: '用户ID',
                      value: 'user.id',
                      type: 'string',
                      tag: '文本',
                      disabled: false
                    },
                    {
                      label: '用户名',
                      value: 'user.name',
                      type: 'string',
                      tag: '文本',
                      disabled: false
                    },
                    {
                      label: '手机号',
                      value: 'user.phone',
                      type: 'string',
                      tag: '文本',
                      disabled: false
                    },
                    {
                      label: '邮箱',
                      value: 'user.email',
                      type: 'string',
                      tag: '文本',
                      disabled: false
                    },
                    {
                      label: '昵称',
                      value: 'user.nickName',
                      type: 'string',
                      tag: '文本',
                      disabled: false
                    }
                  ]
                },
                {
                  label: '应用信息',
                  value: 'app',
                  type: 'object',
                  tag: '对象',
                  disabled: false,
                  children: [
                    {
                      label: '应用ID',
                      value: 'app.id',
                      type: 'string',
                      tag: '文本',
                      disabled: false
                    },
                    {
                      label: '应用名称',
                      value: 'app.name',
                      type: 'string',
                      tag: '文本',
                      disabled: false
                    },
                    {
                      label: '当前运行环境',
                      value: 'app.env',
                      type: 'string',
                      tag: '文本',
                      disabled: false
                    }
                  ]
                },
                {
                  label: '组织信息',
                  value: 'company',
                  type: 'object',
                  tag: '对象',
                  disabled: false,
                  children: [
                    {
                      label: '组织ID',
                      value: 'company.id',
                      type: 'string',
                      tag: '文本',
                      disabled: false
                    },
                    {
                      label: '组织名称',
                      value: 'company.name',
                      type: 'string',
                      tag: '文本',
                      disabled: false
                    },
                    {
                      label: '应用标识',
                      value: 'company.key',
                      type: 'string',
                      tag: '文本',
                      disabled: false
                    }
                  ]
                }
              ]
            }
          ],
          id: 'dc413386',
          user: 'FLOW_INITIATOR',
          reportType: 'basePost',
          depValue: '0thManageOf',
          post: 'manager',
          depLabel: '当前部门',
          postLabel: '部门管理员'
        },
        id: 'dc413386',
        label: '当前部门部门管理员',
        scopeLabel: '岗位上下级：',
        value: 'FLOW_INITIATOR:basePost:0thManageOf:manager',
        userType: 2
      })
      proxyValue.value = arrayData.value
      levelVisible.value = false
    }
    function menuClick (oper) {
      if (oper === 'addOrg') {
        visible.value = true
      } else if (oper === 'addExpress') {
        expressVisible.value = true
      } else {
        levelVisible.value = true
      }
      console.log(123)
    }
    function menuDelete (index) {
      arrayData.value.splice(index, 1)
    }
    const addOptions = ref([
      {
        key: 'addOrg',
        title: '组织成员'
      },
      {
        key: 'addExpress',
        title: '表达式'
      },
      {
        key: 'addLevel',
        title: '找上下级'
      }
    ])
    const arrayData = ref([])
    function renderItem (item, index) {
      const operMap = [
        'addOrg',
        'addExpress',
        'addLevel'
      ]
      return (
        <div class={styles.item}>
          <div class={styles['list-item']}>
            <span class={styles.label}>
            {item.scopeLabel}
            {item.label}
            </span>
            <div class={styles.opr}>
              <ElIcon onClick={() => menuClick(operMap[item.userType])}><Setting /></ElIcon>
              <ElIcon onClick={() => menuDelete(index)}><CircleClose /></ElIcon>
            </div>
          </div>
        </div>
      )
    }
    return () => <>
      <div class={styles.form}>
        <div class={styles.usePicker}>
          <div class={styles.resultList}>
            {arrayData.value.length > 0 ? arrayData.value.map((item, index) => (renderItem(item, index))) : <div class={styles.txt}>请选择处理人</div>}
          </div>
          <div class={styles.menu}>
            <ElDropdown
              trigger="click"
              placement="bottom"
              onCommand={menuClick}>
              {{
                default: () => (<CipButton>添加</CipButton>),
                dropdown: () => (
                  <ElDropdownMenu>
                    {addOptions.value.map(item =>
                      <ElDropdownItem key={item.key} command={item.key}>
                        {item.title}
                      </ElDropdownItem>
                    )}
                  </ElDropdownMenu>
                )
              }}
            </ElDropdown>
          </div>
        </div>
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
          v-model:model={levelFormValue.value}
          fieldList={formFieldList}/>
      </CipDialog>
    </>
  }
})
