import { getItemConfig } from '../utils'
import { v4 as uuidv4 } from 'uuid'

export default {
  label: {},
  api: {
    label: '接口',
    type: 'select-api',
    dependOn: ['options', 'key'],
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
        dependOn.options[0].children?.push({
          key: _key,
          id: _key,
          config: {
            showOnly: true,
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
        })
      }
    }
  }
}
