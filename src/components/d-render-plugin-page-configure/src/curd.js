import { getItemConfig } from '../utils'
import { generateFieldList } from 'd-render'

export default {
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
  'api.inputParams': {
    label: '查询参数',
    type: 'table',
    hideIndex: true,
    hideAdd: true,
    hideDelete: true,
    options: generateFieldList({
      name: { label: '变量名', writable: true },
      value: { label: '默认值', writable: true, type: 'pageFx' }
    })
  }
}
