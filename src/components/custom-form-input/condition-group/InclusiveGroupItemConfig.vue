<template>
  <div style="width:100%">
    <div v-for="(group, index) in selectedNode.groups" :key="index + '_g'" class="group">
      <div class="group-header">
        <span class="group-name">条件组 {{ groupNames[index] }}</span>
        <div class="group-cp">
          <span>组内条件关系：</span>
          <ElSwitch v-model="group.groupType" active-color="#409EFF"
                     inactive-color="#c1c1c1" active-value="AND" inactive-value="OR"
                     active-text="且" inactive-text="或"/>
        </div>
        <div class="group-operation">
          <ElPopover placement="bottom" title="选择审批条件" width="300" trigger="click">
            <!-- <div>以下条件将决定具体的审批流程</div>-->
            <ElCheckboxGroup v-model="group.cids" value-key="id">
              <ElCheckbox :label="condition.id" v-for="(condition, cindex) in conditionList" :key="condition.id" @change="conditionChange(cindex, group)">
                {{ condition.title }}
              </ElCheckbox>
            </ElCheckboxGroup>
            <template #reference>
              <i class="el-icon-plus"></i>
            </template>
          </ElPopover>
          <i class="el-icon-delete" @click="delGroup(index)"></i>
        </div>
      </div>
      <div class="group-content">
        <p v-if="group.conditions.length === 0">点击右上角 + 为本条件组添加条件 ☝</p>
        <div v-else>
          <ElForm ref="condition-form" label-width="100px">
            <!--构建表达式-->
            <ElFormItem  v-for="(condition, cindex) in group.conditions" :key="condition.id + '_' + cindex" >
              <template #label>
                <Ellipsis :hoverTip="true" :content="condition.title"/>
              </template>
               <span v-if="condition.valueType === ValueType.string">
                <ElSelect size="small" placeholder="判断符" style="width: 120px;" v-model="condition.compare" @change="condition.value = []">
                  <ElOption label="等于" value="="></ElOption>
                  <ElOption label="包含在" value="IN"></ElOption>
                </ElSelect>
                 <span v-if="isSelect(condition.id)" style="margin-left: 10px">
                   <ElSelect v-if="condition.compare === 'IN'" style="width: 280px;" clearable multiple size="small" v-model="condition.value" placeholder="选择值">
                     <ElOption v-for="(option, oi) in getOptions(condition.id)" :key="oi" :label="option" :value="option"></ElOption>
                   </ElSelect>
                   <ElSelect v-else style="width: 280px;" clearable size="small" v-model="condition.value[0]" placeholder="选择值">
                     <ElOption v-for="(option, oi) in getOptions(condition.id)" :key="oi" :label="option" :value="option"></ElOption>
                   </ElSelect>
                 </span>
                 <span v-else style="margin-left: 10px">
                   <ElInput v-if="condition.compare === '='" style="width: 280px;" placeholder="输入比较值" size="small" v-model="condition.value[0]"/>
                   <ElSelect v-else style="width: 280px;" multiple clearable filterable allow-create size="small" v-model="condition.value" placeholder="输入可能包含的值"></ElSelect>
                 </span>
              </span>
              <span v-else-if="condition.valueType === ValueType.number">
                <ElSelect size="small" placeholder="判断符" style="width: 120px;" v-model="condition.compare">
                  <ElOption :label="exp.label" :value="exp.value" :key="exp.value" v-for="exp in explains"></ElOption>
                </ElSelect>
                <span style="margin-left: 10px">
                  <ElInput style="width: 280px;" v-if="conditionValType(condition.compare) === 0" size="small" placeholder="输入比较值" type="number" v-model="condition.value[0]"/>
                  <ElSelect style="width: 280px;" multiple filterable allow-create v-else-if="conditionValType(condition.compare) === 1" size="small" v-model="condition.value" placeholder="输入可能包含的值"></ElSelect>
                  <span v-else>
                    <ElInput style="width: 130px;" size="small" type="number" placeholder="输入比较值" v-model="condition.value[0]"/>
                    <span> ~
                      <ElInput size="small" style="width: 130px;" type="number" placeholder="输入比较值" v-model="condition.value[1]"/>
                    </span>
                  </span>
                </span>
              </span>
              <span v-else-if="condition.valueType === ValueType.user">
                <span class="item-desc" style="margin-right: 20px">属于某部门 / 为某些人其中之一</span>
                <ElButton size="small" icon="el-icon-plus" type="primary" @click="selectUser(condition.value, 'user')" round>选择人员/部门</ElButton>
                <org-items v-model="condition.value"/>
              </span>
              <span v-else-if="condition.valueType === ValueType.dept">
                <span class="item-desc" style="margin-right: 20px">为某部门 / 某部门下的部门</span>
                <ElButton size="small" icon="el-icon-plus" type="primary" @click="selectUser(condition.value, 'dept')" round>选择部门</ElButton>
                <org-items v-model="condition.value"/>
              </span>
              <span v-else-if="condition.valueType === ValueType.date"></span>
              <i class="el-icon-delete" @click="rmSubCondition(group, cindex)"></i>
            </ElFormItem>
          </ElForm>
        </div>
      </div>
    </div>
    <RoleDialog v-model="dialogShow"/>
    <!-- <org-picker :type="orgType" multiple ref="orgPicker" :selected="users" @ok="selected"></org-picker> -->
  </div>
</template>

<script>
// import OrgPicker from '@/components/common/OrgPicker'
// import OrgItems from '../OrgItems'
import RoleDialog from './role-dialog'
import Ellipsis from '@/components/custom-form-input/common/Ellipsis'
import { ref, computed } from 'vue'
import { ElForm, ElFormItem, ElSwitch, ElPopover, ElCheckboxGroup, ElCheckbox, ElSelect, ElInput, ElOption, ElButton } from 'element-plus'
import { cloneDeep } from '@cip/utils/util'
export default {
  name: 'InclusiveGroupItemConfig',
  components: { ElSwitch, ElPopover, ElCheckboxGroup, ElCheckbox, ElForm, ElFormItem, ElSelect, ElInput, ElOption, ElButton, Ellipsis, RoleDialog },
  props: {
    selectedNode: Object
  },
  data () {
    return {

      showOrgSelect: false,
      // groupConditions: [],
      groupNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      supportTypes: ['Number', 'String', 'Date', 'Dept', 'User'],
      explains: [
        { label: '等于', value: '=' },
        { label: '大于', value: '>' },
        { label: '大于等于', value: '>=' },
        { label: '小于', value: '<' },
        { label: '小于等于', value: '<=' },
        { label: '包含在', value: 'IN' },
        { label: 'x < 值 < x', value: 'B' },
        { label: 'x ≤ 值 < x', value: 'AB' },
        { label: 'x < 值 ≤ x', value: 'BA' },
        { label: 'x ≤ 值 ≤ x', value: 'ABA' }
      ]

    }
  },
  setup (props, { emit }) {
    const supportTypes = ['Number', 'String', 'Date', 'Dept', 'User']
    const orgType = ref('user')
    const user = ref([])
    const dialogShow = ref(false)
    const ValueType = {
      string: 'String',
      object: 'Object',
      array: 'Array',
      number: 'Number',
      date: 'Date',
      user: 'User',
      dept: 'Dept',
      dateRange: 'DateRange'
    }
    const formItems = [
      {
        title: '单行文本输入',
        name: 'TextInput',
        icon: 'el-icon-edit',
        value: '',
        valueType: 'String',
        props: {
          required: false,
          enablePrint: true
        },
        id: 'field3395338033614'
      },
      {
        title: '多行文本输入',
        name: 'TextareaInput',
        icon: 'el-icon-more-outline',
        value: '',
        valueType: 'String',
        props: {
          required: false,
          enablePrint: true
        },
        id: 'field3853538042394'
      },
      {
        title: '上传图片',
        name: 'ImageUpload',
        icon: 'el-icon-picture-outline',
        value: [],
        valueType: 'Array',
        props: {
          required: false,
          enablePrint: true,
          maxSize: 5,
          maxNumber: 10,
          enableZip: true
        },
        id: 'field7888438052717'
      }
    ]
    const filterCondition = (item, list) => {
      if (item.name === 'SpanLayout') {
        item.props.items.forEach(sub => this.filterCondition(sub, list))
      } else if (supportTypes.indexOf(item.valueType) > -1 && item.props.required) {
        list.push({ title: item.title, id: item.id, valueType: item.valueType })
      }
    }
    const conditionList = computed(() => {
      // 构造可用条件选项
      const conditionItems = []
      formItems.forEach(item => filterCondition(item, conditionItems))
      console.log('触发')
      console.log(formItems)
      if (conditionItems.length === 0 || conditionItems[0].id !== 'root') {
        conditionItems.unshift({ id: 'root', title: '发起人', valueType: 'User' })
      }
      return conditionItems
    })
    const conditionChange = (index, group) => {
      // 判断新增的
      group.cids.forEach(cid => {
        if (group.conditions.findIndex(cd => cd.id === cid) < 0) {
          // 新增条件
          const condition = { ...conditionList.value[index] }
          console.log(condition, conditionList.value, index)
          condition.compare = ''
          condition.value = []
          group.conditions.push(condition)
        }
      })
      for (let i = 0; i < group.conditions.length; i++) {
        // 去除没有选中的
        if (group.cids.indexOf(group.conditions[i].id) < 0) {
          group.conditions.splice(i, 1)
        }
      }
    }
    const rmSubCondition = (group, index) => {
      group.cids.splice(index, 1)
      group.conditions.splice(index, 1)
    }
    const delGroup = (index) => {
      const newData = cloneDeep(props.selectedNode)
      newData.groups.splice(index, 1)
      emit('change', newData)
    }
    const selectUser = (value, orgType) => {
      // orgType.value = orgType
      // user.value = value
      dialogShow.value = true
    }
    // const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    // const supportTypes = [ValueType.number, ValueType.string, ValueType.date, ValueType.dept, ValueType.user]

    // const isSelect = (formId) => {
    //   const form = formMap.value.get(formId)
    //   return form && (form.name === 'SelectInput' || form.name === 'MultipleSelect')
    // }

    // const getOptions = (formId) => {
    //   return formMap.value.get(formId).props.options || []
    // }

    // ... (remaining setup code) ...

    return {
      ValueType,
      // groupNames,
      // isSelect,
      // getOptions,
      formItems,
      conditionList,
      conditionChange,
      rmSubCondition,
      delGroup,
      orgType,
      user,
      selectUser,
      dialogShow
      // ... (other variables and functions) ...
    }
  }
}
</script>

<style lang="less" scoped>
.group {
  margin-bottom: 20px;
  color: #5e5e5e;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid #e3e3e3;

  .group-header {
    padding: 5px 10px;
    background: #e3e3e3;
    position: relative;

    div {
      display: inline-block;
    }

    .group-name {
      font-size: small;
    }

    .group-cp {
      font-size: small;
      position: absolute;
      left: 100px;
      display: flex;
      top: 5px;
      justify-content: center;
      align-items: center;
    }

    .group-operation {
      position: absolute;
      right: 10px;

      i {
        padding: 0 10px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .group-content{
    padding: 10px 5px;
    p{
      text-align: center;
      font-size: small;
    }
    .el-icon-delete{
      position: absolute;
      cursor: pointer;
      top: 12px;
      right: 0;
    }
  }

  .condition-title{
    display: block;
    width: 100px;
  }
}
</style>
