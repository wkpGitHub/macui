export default {
  searchFormDesign: {
    component: () => () => import('./search-form-design'),
    layout: true
  },
  pageTableDesign: {
    component: () => () => import('./page-table-design'),
    layout: true
  }
}
