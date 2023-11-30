import { getItemConfig } from '../utils'
import { v4 as uuidv4 } from 'uuid'

export default {
  label: {},
  api: {
    label: '保存接口',
    type: 'select-api',
    dependOn: ['options', 'key'],
    hideInitSearch: true,
    onChange ({ api, dependOn, getListConfigByType }) {
      const children = []
      dependOn.options?.forEach(o => o.children && children.push(...o.children))
      const form = getListConfigByType(children, 'form')
      if (form.key) {
        form.config.options = [{
          key: 'default',
          children: (api.inputParams || []).map(opt => getItemConfig(opt))
        }]
      } else {
        const _key = uuidv4()
        dependOn.options[0].children = [{
          key: _key,
          id: _key,
          config: {
            type: 'form',
            class: 'disabled-table',
            key: _key,
            id: _key,
            label: '表单',
            usingSlots: ['default'],
            options: [{
              key: 'default',
              children: (api.inputParams || []).map(opt => getItemConfig(opt))
            }]
          }
        }]
      }
    }
  },
  detailApi: {
    label: '详情接口',
    type: 'select-api',
    hideInitSearch: true
  },
  useDefaultHandle: {
    label: '使用默认底部操作栏',
    type: 'switch',
    defaultValue: true
  },
  usingSlots: {
    hideItem: true,
    immediateChangeValue: true,
    dependOn: ['useDefaultHandle'],
    changeValue ({ useDefaultHandle }) {
      return {
        value: useDefaultHandle ? ['default'] : ['default', 'handle']
      }
    }
  }
}
