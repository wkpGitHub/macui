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
  dataType: (mode) => () => import((`./data-type${mode}`)),
  dataType2: (mode) => () => import((`./data-type2${mode}`)),
  compositionCheckbox: () => () => import('./composition-checkbox'),
  tableForm: () => () => import('./table-form'),
  filterCondition: () => () => import('./filter-condition'),
  selectField: () => () => import('./select-field'),
  sortField: () => () => import('./sort-field'),
  codemirrorInput: () => () => import('./codemirror-input'),
  dataSource: () => () => import('./data-source'),
  transactorSelect: () => () => import('./transactor-select'),
  objFields: () => () => import('./obj-fields'),
  paramsAdd: () => () => import('./params-add'),
  fxTable: () => () => import('./fx-table'),
  setFx: () => () => import('./set-fx'),
  selectVar: () => () => import('./select-var'),
  tabsLayout: {
    component: () => () => import('./tabs-layout'),
    layout: true
  },
  urlWithMethod: () => () => import('./url-with-method')
}
