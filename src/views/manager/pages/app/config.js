import { appEntityEntity } from '@/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'
import { keysToConfigMap } from '@d-render/shared'
import { appService } from '@/api/service/chr'

export const searchFieldList = generateFieldList(defineSearchFieldConfig(keysToConfigMap([
  'name',
  'path'
])), appEntityEntity)

export const tableColumns = generateFieldList(defineTableFieldConfig(keysToConfigMap([
  'name',
  'path',
  'logo',
  'remark',
  'enabled',
  'createTime'
].map(key => ({ key, showOverflowTooltip: true })))), appEntityEntity)

export const formFieldList = generateFieldList(defineFormFieldConfig(keysToConfigMap([
  {
    key: 'name',
    required: true,
    dependOn: ['id'],
    validateExistRemote: async (value, { id }) => {
      const { data } = await appService.checkName({ name: value, id })
      return { data: !data }
    }
  },
  {
    key: 'path',
    required: true,
    dependOn: ['id'],
    validateExistRemote: async (value, { id }) => {
      const { data } = await appService.checkPath({ path: value, id })
      return { data: !data }
    }
  },
  'logo',
  'remark',
  'enabled'
])), appEntityEntity)
