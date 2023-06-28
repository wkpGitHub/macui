import { generateFieldList, defineTableFieldConfig } from 'd-render'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  ename: {},
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
