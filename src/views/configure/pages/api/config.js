import { apiInfoEntityEntity } from '@lc/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'
import { apiConfigService, sysDicService } from '@lc/api'
import { computed, reactive } from 'vue'

const apiTypeOpts = [
  { label: '查询', value: 'query' },
  { label: '详情', value: 'detail' },
  { label: '保存', value: 'save' },
  { label: '删除', value: 'delete' },
  { label: '统计', value: 'agg' },
  { label: '上传', value: 'fileUpload' },
  { label: '下载', value: 'fileDown' },
  { label: '图片', value: 'image' }
]

export function usePage () {
  const state = reactive({
    devOpts: [],
    pidOpts: []
  })

  console.log('sysDicService', sysDicService)
  sysDicService.maps().then(({ data }) => {
    const arr = []
    Object.keys(data.apiDevModel || {}).forEach(key => {
      arr.push({ value: key, label: data.apiDevModel[key] })
    })
    state.devOpts = arr
  })
  apiConfigService.list({ pid: 0 }).then(({ data }) => {
    state.pidOpts = data || []
  })

  const searchFieldList = computed(() => generateFieldList(defineSearchFieldConfig({
    path: {},
    name: {},
    devMode: { options: state.devOpts }
  }), apiInfoEntityEntity))

  const tableColumns = computed(() => generateFieldList(defineTableFieldConfig({
    name: {},
    fullPath: { minWidth: '110px' },
    devMode: { options: state.devOpts },
    apiType: {
      label: '接口类型',
      type: 'select',
      options: apiTypeOpts
    },
    updateTime: {}
  }), apiInfoEntityEntity))

  const formFieldList = computed(() => generateFieldList(defineFormFieldConfig({
    name: {
      required: true
    },
    path: {
      required: true
    },
    apiType: {
      label: '接口类型',
      type: 'select',
      required: true,
      options: apiTypeOpts
    },
    devMode: { options: state.devOpts },
    pid: {
      label: 'API分组',
      type: 'select',
      required: true,
      optionProps: {
        label: 'name',
        value: 'id'
      },
      options: state.pidOpts
    },
    remark: {}
  }), apiInfoEntityEntity))

  return {
    searchFieldList,
    tableColumns,
    formFieldList
  }
}
