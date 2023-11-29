import { getItemConfig } from '../utils'

export default {
  label: { },
  api: {
    type: 'select-api',
    label: '查询接口',
    dependOn: ['options', 'key', 'searchParams'],
    onChange ({ api, dependOn, getListConfigByType }) {
      const children = []
      dependOn.options?.forEach(o => o.children && children.push(...o.children))
      const searchForm = getListConfigByType(children, 'searchForm')
      const pageTable = getListConfigByType(children, 'pageTable')
      searchForm.config.options = [{
        key: 'default',
        children: (api.inputParams || []).map(opt => getItemConfig(opt))
      }]
      pageTable.config.options = [{
        key: 'default',
        children: (api.outParams || []).map(opt => getItemConfig(opt))
      }]
      // searchForm.config.events = {
      //   search: {
      //     label: '查询件',
      //     type: 'search',
      //     value: [
      //       {
      //         api: api.name,
      //         eventType: 'api',
      //         eventName: '接口请求'
      //       },
      //       {
      //         type: 'module',
      //         target: dependOn.key,
      //         value: [{ type: 'var', value: api.objId, desc: api.name }],
      //         eventType: 'setVal',
      //         eventName: '赋值'
      //       }
      //     ]
      //   }
      // }
    }
  },
  useDefaultHandle: {
    label: '使用默认操作栏',
    type: 'switch',
    defaultValue: true
  },
  usingSlots: {
    hideItem: true,
    immediateChangeValue: true,
    dependOn: ['useDefaultHandle'],
    changeValue ({ useDefaultHandle }) {
      return {
        value: useDefaultHandle ? ['filter', 'title', 'default', 'pagination', 'dialog'] : ['filter', 'title', 'default', 'pagination', 'dialog', 'handle']
      }
    }
  },
  options: {
    hideItem: 'true',
    type: 'arrayObject',
    dependOn: ['usingSlots', 'options'],
    changeValue: ({ usingSlots, options }) => {
      const value = options.concat(usingSlots.filter(name => {
        return !options.find(option => option.key === name)
      }).map(name => ({ key: name, children: [] })))
      return {
        value
      }
    }
  },
  deleteApi: {
    type: 'select-api',
    label: '删除接口',
    hideInitSearch: true
  }
}
