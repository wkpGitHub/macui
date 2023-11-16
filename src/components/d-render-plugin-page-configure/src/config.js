export default {
  input: () => import('./input'),
  grid: () => import('./grid'),
  tree: () => import('./tree'),
  pageLayoutList: () => import('./page-layout/list'),
  curd: () => import('./curd'),
  searchForm: () => import('./search-form-design'),
  pageTable: () => import('./page-table'),
  tableButton: () => import('./table-button'),
  button: () => import('./button'),
  dialog: () => import('./dialog-design'),
  pagination: () => import('./pagination'),
  form: () => import('./form-design'),
  entity: () => import('./entity-design'),
  pageHandle: () => import('./page-handle'),
  lineChart: () => import('./block-view-chart/line-chart'),
  barChart: () => import('./block-view-chart/bar-chart'),
  pieChart: () => import('./block-view-chart/pie-chart'),
  sankeyChart: () => import('./block-view-chart/sankey-chart'),
  scatterChart: () => import('./block-view-chart/scatter-chart')
}
