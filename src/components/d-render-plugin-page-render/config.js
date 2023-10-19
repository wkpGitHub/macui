export default {
  searchForm: (mode) => () => import(`./search-form${mode}`),
  tableButton: () => () => import('./table-button'),
  button: () => () => import('./button'),
  pageTable: () => () => import('./page-table'),
  pagination: () => () => import('./pagination'),
  dialog: {
    component: () => () => import('./dialog'),
    layout: true
  },
  pageLayoutList: {
    component: () => () => import('./page-layout-list/index'),
    layout: true
  },
  layoutBox: {
    component: () => () => import('./layout-box'),
    layout: true
  },
  entity: {
    component: () => () => import('./entity'),
    layout: true
  },
  form: () => () => import('./form'),
  selectTreePanel: () => () => import('./select-tree-panel')
}
