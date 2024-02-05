// 例：
// mode 可能参数为/index /view /mobile /configure
// test: (mode) => () => import(`@lc/components/hello-component${mode}`)
// test: {
//   component: (mode) => () => import(`@lc/components/hello-component${mode}`)
// }
// testLayout: {
//   component: (mode) => () => import(`@lc/components/hello-component${mode}`)
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
  pageVar: () => () => import('./page-var'),
  pageFx: () => () => import('./page-fx'),
  tabsLayout: {
    component: () => () => import('./tabs-layout'),
    layout: true
  },
  urlWithMethod: () => () => import('./url-with-method'),
  'field-table': () => () => import('./field-table'),
  'inputParams-table': () => () => import('./inputParams-table'),
  curdConfig: () => () => import('./curdConfig'),
  'select-api': () => () => import('./select-api'),
  'select-api-tree': () => () => import('./select-api-tree'),
  chartMargin: () => () => import('./block-view-chart/chart-margin/index'),
  xAxis: () => () => import('./block-view-chart/x-axis/index'),
  yAxis: () => () => import('./block-view-chart/y-axis/index'),
  yAxisField: () => () => import('./block-view-chart/y-axis-field/index'),
  timeLimit: () => () => import('./time-limit'),
  roleSelect: () => () => import('./role-select'),
  'custom-priority': () => () => import('./custom-priority'),
  'condition-group': () => () => import('./condition-group'),
  colorScheme: () => () => import('./block-view-chart/color-scheme/index'),
  colorPicker: () => () => import('./block-view-chart/color-picker/index'),
  setOptions: () => () => import('./set-options'),
  selectModule: () => () => import('./select-module'),
  selectModuleField: () => () => import('./select-module-field'),
  'select-dependOn': () => () => import('./select-dependOn'),
  'out-dependOn': () => () => import('./out-dependOn'),
  // 'select-watch': () => () => import('./select-watch'),
  'event-args': () => () => import('./event-args'),
  'link-params': () => () => import('./link-params'),
  'css-position': () => () => import('./css-position'),
  'css-border': () => () => import('./css-border'),
  'css-gap': () => () => import('./css-gap'),
  'css-background': () => () => import('./css-background'),
  'css-display': () => () => import('./css-display'),
  'background-props': () => () => import('./background-props'),
  'set-css-value': () => () => import('./set-css-value'),
  parseSql: () => () => import('./parse-sql'),
  sqlInput: () => () => import('./sql-input')
}
