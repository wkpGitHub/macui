import { generateFieldList, defineTableFieldConfig } from 'd-render'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  ename: {},
  formula: {
    writable: true,
    dynamic: true,
    type: 'radio',
    options: [
      { label: '升序', value: 'ASC' },
      { label: '降序', value: 'DESC' }
    ]
  }
}))
