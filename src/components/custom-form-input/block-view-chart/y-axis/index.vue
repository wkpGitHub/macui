<template>
  <div>
    <div
      v-for="(item, index) in proxyValue?.columns"
      :key="'y-'+index"
      style="display: flex; align-items: center; margin-bottom: 12px;"
    >
      <el-select
        v-model="item.field"
        class="form-item-xy"
        filterable
        placeholder="请选择字段"
        @change="val => yFieldChange(val, item)"
      >
        <el-option
          v-for="op in yFields"
          :key="'yo'+index+op.name"
          :label="op.title"
          :value="op.name" />
      </el-select>

      <el-tooltip
        effect="dark"
        placement="top"
        content="y轴别名，优先作为坐标轴的名称，非必填项，内容中可以使用\n换行"
      >
        <el-input
          v-model="item.alias"
          class="form-item-xy"
          placeholder="y轴别名">
        </el-input>
      </el-tooltip>

      <el-icon style='color: #D9D9D9; cursor: pointer;' @click="deleteYField(index)"><Remove /></el-icon>
    </div>
    <div>
      <div class="config-add">
        <div @click="addYField"><el-icon><Plus /></el-icon> 新增</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { formInputProps, useFormInput } from '@d-render/shared'
import {
  ElInput,
  ElSelect,
  ElOption,
  ElTooltip,
  ElIcon
} from 'element-plus'
import { Remove, Plus } from '@element-plus/icons-vue'

export default {
  name: '',
  props: formInputProps,
  components: { ElInput, ElSelect, ElOption, ElTooltip, ElIcon, Remove, Plus },
  setup (props, ctx) {
    const { proxyValue, emitModelValue, securityConfig } = useFormInput(props, ctx)
    const yFields = computed(() => {
      return securityConfig.value.yFields || []
    })

    const getTitle = (val) => {
      return yFields.value.find(yField => yField.name === val).title
    }

    const yFieldChange = (val, item) => {
      item.name = getTitle(val)
      emitModelValue(proxyValue.value)
    }

    const addYField = () => {
      if (!proxyValue.value.columns) {
        proxyValue.value.columns = []
      }
      proxyValue.value.columns.push({ name: '', field: '', alias: '' })
      emitModelValue(proxyValue.value)
    }

    const deleteYField = (index) => {
      if (proxyValue.value.columns.length < 2) return
      proxyValue.value.columns.splice(index, 1)
      emitModelValue(proxyValue.value)
    }

    onMounted(() => {
      proxyValue.value = proxyValue.value ? proxyValue.value : { columns: [{ name: '', field: '', alias: '' }] }
    })

    return {
      proxyValue,
      yFields,
      addYField,
      deleteYField,
      yFieldChange
    }
  }
}

</script>
<style scoped lang='less'>
.form-item-xy {
  width: 124px;
  margin-right: 12px;
}
</style>
