import { centerService } from '@/api'
import { getItemConfig } from '../utils'

export default {
  key: {},
  usingSlots: {
    label: '插槽选则',
    type: 'select',
    multiple: true,
    realArray: true,
    options: [
      { value: 'filter', label: '搜索栏' },
      { value: 'handle', label: '操作' },
      { value: 'title', label: '表标题' },
      { value: 'default', label: '默认' },
      { value: 'pagination', label: '分页' },
      { value: 'dialog', label: '弹窗' }
    ]
  },
  // options: {
  //   type: 'curdConfig',
  //   otherKey: ['apiList']
  // },
  saveApi: {
    type: 'select-api',
    label: '保存接口',
    dependOn: ['options'],
    onChange ({ row, updateApis, updateDataModel, dependOn }) {
      updateApis('save')
      updateDataModel('保存接口')
      centerService.getContent(row.id).then(({ data }) => {
        const { inputParams = [] } = data.flow || {}
        const dialogChildren = dependOn.options.find(opt => opt.key === 'dialog')?.children
        if (dialogChildren?.length && inputParams.length) {
          const dialogOpts = dialogChildren[0].config.options
          const formSlots = dialogOpts.find(opt => opt.key === 'default')?.children
          if (!formSlots?.length) return
          formSlots[0].config.options[0].children = inputParams.map(opt => getItemConfig(opt))
        }
      })
    }
  },
  searchApi: {
    type: 'select-api',
    label: '查询接口',
    dependOn: ['options'],
    onChange ({ row, updateApis, updateDataModel, dependOn, updateMethod }) {
      updateApis('page')
      updateMethod('page', null, true)
      updateDataModel('查询接口')
      const filterChildren = dependOn.options.find(opt => opt.key === 'filter')?.children || []
      const defaultChildren = dependOn.options.find(opt => opt.key === 'default')?.children || []
      centerService.getContent(row.id).then(({ data }) => {
        const { outParams = [], inputParams = [] } = data.flow || {}
        if (filterChildren?.length && inputParams.length) {
          const filterOpts = filterChildren[0].config.options
          filterOpts[0].children = inputParams.map(opt => getItemConfig(opt))
        }
        if (defaultChildren?.length && outParams.length) {
          const defaultOpts = defaultChildren[0].config.options
          defaultOpts[0].children = outParams.map(opt => getItemConfig(opt))
        }
      })
    }
  }
  // dependOn: {
  //   type: 'select',
  // },
  // changeValue () {

  // }
}
