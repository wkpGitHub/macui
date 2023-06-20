import { apiInfoEntityEntity } from '@/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'

export const searchFieldList = generateFieldList(defineSearchFieldConfig({

}), apiInfoEntityEntity)

export const tableColumns = generateFieldList(defineTableFieldConfig({

}), apiInfoEntityEntity)

export const formFieldList = generateFieldList(defineFormFieldConfig({

}), apiInfoEntityEntity)
