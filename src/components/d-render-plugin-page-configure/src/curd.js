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
      // updateDataModel('保存接口')
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
    dependOn: ['options', 'key'],
    onChange ({ row, api, updateDataModel, dependOn, getListConfigByType }) {
      const modelKey = { inputKey: `${dependOn.key}查询接口_入参`, outKey: `${dependOn.key}查询接口_出参` }
      const { inputModel, outModel } = updateDataModel(modelKey)
      const children = []
      dependOn.options?.forEach(o => o.children && children.push(...o.children))
      const searchForm = getListConfigByType(children, 'searchForm')
      const pageTable = getListConfigByType(children, 'pageTable')
      searchForm.config.model = inputModel
      searchForm.config.options = [{
        key: 'default',
        children: (inputModel.children || []).map(opt => getItemConfig(opt))
      }]
      searchForm.config.events = {
        search: {
          label: '查询件',
          type: 'search',
          value: [
            {
              api: api.name,
              eventType: 'api',
              eventName: '接口请求'
            },
            {
              type: 'module',
              target: dependOn.key,
              value: [
                { type: 'var', value: api.objId, desc: api.name }
              ],
              eventType: 'setVal',
              eventName: '赋值'
            }
          ]
        }
      }
      pageTable.config.model = outModel
      pageTable.config.options = [{
        key: 'default',
        children: (outModel.children || []).map(opt => getItemConfig(opt))
      }]
    }
  }
  // dependOn: {
  //   type: 'select',
  // },
  // changeValue () {

  // }
}
