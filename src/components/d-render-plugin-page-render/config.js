export default {
  searchForm: (mode) => () => import(`./search-form${mode}`),
  pageLayoutList: {
    component: () => () => import('./page-layout-list/index'),
    layout: true
  },
  tableButton: () => () => import('./table-button'),
  pageTable: () => () => import('./page-table'),
  pagination: () => () => import('./pagination'),
  dialog: () => () => import('./dialog'),
  form: () => () => import('./form')
}
