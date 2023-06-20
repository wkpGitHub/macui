import { dbInfoEntityEntity } from '@/api/entity/chr'
import { appService, dbInfoService } from '@/api/service/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'
import { keysToConfigMap } from '@d-render/shared'
const appIdConfig = {
  type: 'select',
  label: '应用',
  filterable: true,
  optionProps: {
    value: 'id',
    label: 'name'
  },
  asyncOptions: async (q) => {
    const { data } = await appService.page({ name: q }, {})
    return data
  }
}
export const searchFieldList = generateFieldList(defineSearchFieldConfig(keysToConfigMap([
  'name' /* 'host',  */
])), dbInfoEntityEntity, { appId: { ...appIdConfig, autoSelect: true } })

export const tableColumns = generateFieldList(defineTableFieldConfig(keysToConfigMap([
  'name', 'dbType', 'username', 'url', 'remark', 'createTime'
].map(key => ({ key, showOverflowTooltip: true })))), dbInfoEntityEntity)

console.log('tableColumns', tableColumns)

export const formFieldList = generateFieldList(defineFormFieldConfig(keysToConfigMap([
  'name', 'dbType', 'username', 'password', 'url', 'remark'
])), dbInfoEntityEntity, {
  name: {
    dependOn: ['id']
    // validateExistRemote: (value, { id }) => {
    //   return dbInfoService.checkName({ name: value, id })
    // }
  },
  url: { type: 'textarea', span: 2 },
  remark: {
    type: 'textarea', span: 2
  }
})
