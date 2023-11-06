<template>
  <div>
    <div
      v-for="(item, index) in proxyValue?.columns"
      :key="'y-'+index"
      style="display: flex; align-items: center; margin-bottom: 12px;"
    >
      <el-select
        v-model="item.field"
        filterable
        placeholder="请选择字段"
        @change="t => yFieldChange(t)"
      >
        <el-option
          v-for="op in yFields"
          :key="'yo'+index+op.name"
          :label="op.label"
          :value="op.name" />
      </el-select>
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
  ElSelect,
  ElOption,
  ElIcon
} from 'element-plus'
import { Remove, Plus } from '@element-plus/icons-vue'

export default {
  name: 'yAxisField',
  props: formInputProps,
  components: { ElSelect, ElOption, ElIcon, Remove, Plus },
  setup (props, ctx) {
    const { proxyValue, emitModelValue, securityConfig } = useFormInput(props, ctx)
    const yFields = computed(() => {
      return securityConfig.value.yFields || []
    })

    // y 轴字段选择
    const yFieldChange = (name) => {
      emitModelValue(proxyValue.value)
    }

    const addYField = () => {
      if (!proxyValue.value.columns) {
        proxyValue.value.columns = []
      }
      proxyValue.value.columns.push({ field: '' })
      emitModelValue(proxyValue.value)
    }

    const deleteYField = (index) => {
      if (proxyValue.value.columns.length < 2) return
      proxyValue.value.columns.splice(index, 1)
      emitModelValue(proxyValue.value)
    }

    onMounted(() => {
      proxyValue.value = proxyValue.value ? proxyValue.value : { columns: [{ field: '' }] }
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
