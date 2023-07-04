export default {
  pageLayoutList: {
    component: () => () => import('./page-layout-list/index'),
    layout: true
  },
  dialog: {
    component: (mode) => () => import((`./dialog${mode}`)),
    layout: true
  }
}
