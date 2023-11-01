export default {
  searchFormDesign: {
    component: () => () => import('./search-form-design'),
    layout: true
  },
  pageTableDesign: {
    component: () => () => import('./page-table-design'),
    layout: true
  },
  curd: {
    component: () => () => import('./curd/'),
    layout: true
  },
  // tableDesign: {
  //   component: () => () => import('./table-design'),
  //   layout: true
  // },
  dialogDesign: {
    component: () => () => import('./dialog-design'),
    layout: true
  },
  formDesign: {
    component: () => () => import('./form-design'),
    layout: true
  },
  entityDesign: {
    component: () => () => import('./entity-design')
    // layout: true
  },
  simpleCurd: () => () => import('./simple-curd'),
  eventConfig: () => () => import('./event-config')
}
