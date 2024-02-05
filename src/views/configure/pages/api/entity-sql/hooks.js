import { ref } from 'vue'
// import { generateFieldList, defineTableFieldConfig } from 'd-render'
import { cloneDeep } from '@d-render/shared'

export function useDebug (form) {
  const visible = ref(false)
  // 请求参数
  const debuggerParams = ref([])
  // 调式结果
  const debuggerRes = ref([])
  // 调式结果列
  const debuggerResColumn = ref([])
  // 根据接口返回值的fields字段生成调式结果列
  // function getTableColumns (fields = []) {
  //   return generateFieldList(defineTableFieldConfig(fields.reduce((pre, curr) => {
  //     pre[curr.name] = {
  //       label: curr.name
  //     }
  //     return pre
  //   }, {})))
  // }
  function openDialog (resolve) {
    // 深克隆一下 防止修改请求参数值时影响外部form
    debuggerParams.value = cloneDeep(form.value.params)
    debuggerRes.value = []
    debuggerResColumn.value = []
    visible.value = true
    resolve()
  }
  const offset = ref(0)
  const limit = ref(10)
  const total = ref(0)
  async function debug () {
    // const sql = form.value.sql
    // const res = await shareApiConfigAdminService.debug({
    //   ...form.value,
    //   params: debuggerParams.value
    //   // sqlStatement: sql ? encryptionSql(sql) : sql
    // }, {
    //   offset: offset.value,
    //   limit: limit.value
    // })
    // debuggerResColumn.value = getTableColumns(res.fields)
    // debuggerRes.value = res.data
    // total.value = res.total
    // offset.value = res.offset
    // limit.value = res.limit
  }

  return {
    visible,
    debuggerParams,
    debuggerRes,
    debuggerResColumn,
    openDialog,
    debug,
    offset,
    limit,
    total
  }
}
