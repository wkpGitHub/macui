import { generateFieldList } from 'd-render'
import { pageInfoEntityEntity } from '@/api/entity/chr'
import { keysToConfigMap } from '@d-render/shared'
export const pageSimpleFieldList = generateFieldList(
  keysToConfigMap(['pid', 'name', 'path']),
  pageInfoEntityEntity
)
