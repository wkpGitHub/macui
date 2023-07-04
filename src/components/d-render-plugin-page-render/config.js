export default {
  pageLayoutList: {
    component: () => () => import('./page-layout-list/index'),
    layout: true
  },
  tableButton: () => () => import('./table-button'),
  pageTable: () => () => import('./page-table'),
  dialog: {
    component: () => () => import(('./dialog')),
    layout: true
  },
  pagination: () => () => import('./pagination')
}
