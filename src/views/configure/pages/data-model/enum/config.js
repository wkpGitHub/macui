import { dicValueEntityEntity } from '@lc/api/entity/chr'
// import { daa } from '@lc/api/service/chr'
import { generateFieldList, defineTableFieldConfig } from 'd-render'
import { keysToConfigMap } from '@d-render/shared'

export const tableColumns = generateFieldList(defineTableFieldConfig(keysToConfigMap([
  'value', 'label'
].map(key => ({ key, showOverflowTooltip: true })))), dicValueEntityEntity)

export const formFieldList = generateFieldList(keysToConfigMap(['value', 'label'].map(v => ({ key: v, required: true }))), dicValueEntityEntity)
