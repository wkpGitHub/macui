import { generateFieldList, defineTableFieldConfig } from 'd-render'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  label: {},
  formula: {
    writable: true,
    dynamic: true,
    dependOn: ['isNullable'],
    changeConfig (config, { isNullable }) {
      config.required = !isNullable
      return config
    }
  }
}))
