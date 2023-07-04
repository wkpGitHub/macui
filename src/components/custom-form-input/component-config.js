// 例：
// mode 可能参数为/index /view /mobile /configure
// test: (mode) => () => import(`@/components/hello-component${mode}`)
// test: {
//   component: (mode) => () => import(`@/components/hello-component${mode}`)
// }
// testLayout: {
//   component: (mode) => () => import(`@/components/hello-component${mode}`)
//   layout: true
// }

export default {
  searchForm: (mode) => () => import(`./search-form${mode}`),
  dataType: (mode) => () => import((`./data-type${mode}`)),
  compositionCheckbox: () => () => import('./composition-checkbox'),
  tableForm: () => () => import('./table-form'),
  filterCondition: () => () => import('./filter-condition'),
  selectField: () => () => import('./select-field'),
  sortField: () => () => import('./sort-field'),
  codemirrorInput: () => () => import('./codemirror-input'),
  dataSource: () => () => import('./data-source'),
  tableButton: () => () => import('./table-button'),
  pageTable: () => () => import('./page-table'),
  simpleCurd: () => () => import('./simple-curd'),
  dialog: {
    component: (mode) => () => import((`./dialog${mode}`)),
    layout: true
  },
  pagination: () => () => import('./pagination')
}
