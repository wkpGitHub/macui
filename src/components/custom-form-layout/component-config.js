export default {
  pageLayoutList: {
    component: () => () => import('./page-layout-list/index'),
    layout: true
  },
  searchFormDesign: {
    component: () => () => import('./search-form-design/index'),
    layout: true
  }
  // dialogDesign: {
  //   component: () => () => import('./dialog-design/index'),
  //   layout: true
  // }
}
