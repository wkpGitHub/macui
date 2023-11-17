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
  selectTreePanel: () => () => import('./select-tree-panel'),
  lineChart: () => () => import('./block-view-chart/line-chart'),
  barChart: () => () => import('./block-view-chart/bar-chart'),
  pieChart: () => () => import('./block-view-chart/pie-chart'),
  scatterChart: () => () => import('./block-view-chart/scatter-chart'),
  sankeyChart: () => () => import('./block-view-chart/sankey-chart'),
  tree: () => () => import('./tree'),
  input: () => () => import('./input'),
  select: (mode) => {
    if (mode === '/view') {
      return () => import('@cip/d-render-plugin-cci/esm/input/basic/select/view.js')
    }
    return () => import('./select')
  },
  date: (mode) => {
    if (mode === '/view') {
      return () => import('@cip/d-render-plugin-cci/esm/input/basic/date-picker/view.js')
    }
    return () => import('./date-picker')
  }
}
