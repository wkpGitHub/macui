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
    validateExistRemote: (value, { id }) => {
      return appService.checkName({ name: value, id })
    }
  },
  {
    key: 'path',
    required: true,
    dependOn: ['id'],
    validateExistRemote: (value, { id }) => {
      return appService.checkPath({ path: value, id })
    }
  },
  'logo',
  'remark',
  'enabled'
])), appEntityEntity)
