import { apiInfoEntityEntity } from '@/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'
import { keysToConfigMap } from '@d-render/shared'

export const searchFieldList = generateFieldList(defineSearchFieldConfig(keysToConfigMap([
])), apiInfoEntityEntity)

export const tableColumns = generateFieldList(defineTableFieldConfig(keysToConfigMap([
])), apiInfoEntityEntity)

export const formFieldList = generateFieldList(defineFormFieldConfig(keysToConfigMap([
])), apiInfoEntityEntity)
