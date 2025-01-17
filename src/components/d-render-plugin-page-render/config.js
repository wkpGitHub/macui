export default {
  searchForm: (mode) => () => import(`./search-form${mode}`),
  tableButton: () => () => import('./table-button'),
  button: () => () => import('./button'),
  img: () => () => import('./img'),
  span: () => () => import('./span'),
  color: () => () => import('./color'),
  link: () => () => import('./link'),
  pageTable: () => () => import('./page-table'),
  pagination: () => () => import('./pagination'),
  div: {
    component: () => () => import('./div'),
    layout: true
  },
  dialog: {
    component: () => () => import('./dialog'),
    layout: true
  },
  pageLayoutList: {
    component: () => () => import('./page-layout-list/index'),
    layout: true
  },
  pageHandle: {
    component: () => () => import('./page-handle'),
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
  curd: {
    component: () => () => import('./curd'),
    layout: true
  },
  grid: {
    component: () => () => import('./grid'),
    layout: true
  },
  selectTreePanel: () => () => import('./select-tree-panel'),
  lineChart: () => () => import('./block-view-chart/line-chart'),
  barChart: () => () => import('./block-view-chart/bar-chart'),
  pieChart: () => () => import('./block-view-chart/pie-chart'),
  scatterChart: () => () => import('./block-view-chart/scatter-chart'),
  sankeyChart: () => () => import('./block-view-chart/sankey-chart'),
  stackLineChart: () => () => import('./block-view-chart/stack-line-chart'),
  areaChart: () => () => import('./block-view-chart/area-chart'),
  stackBarChart: () => () => import('./block-view-chart/stack-bar-chart'),
  horizontalBarChart: () => () => import('./block-view-chart/horizontal-bar-chart'),
  stackHorizontalBarChart: () => () => import('./block-view-chart/stack-horizontal-bar-chart'),
  annulusChart: () => () => import('./block-view-chart/annulus-chart'),
  nightingaleChart: () => () => import('./block-view-chart/nightingale-chart'),
  tree: () => () => import('./tree'),
  input: (mode) => {
    if (mode === '/view') {
      return () => import('./input/view.jsx')
    }
    return () => import('./input')
  },
  select: (mode) => {
    if (mode === '/view') {
      return () => import('./select/view.jsx')
    }
    return () => import('./select')
  },
  date: (mode) => {
    if (mode === '/view') {
      return () => import('@cip/d-render-plugin-cci/esm/input/basic/date-picker/view.js')
    }
    return () => import('./date-picker')
  },
  textarea: (mode) => {
    if (mode === '/view') {
      return () => import('@cip/d-render-plugin-cci/esm/input/basic/textarea/view.js')
    }
    return () => import('./textarea')
  },
  radio: (mode) => {
    if (mode === '/view') {
      return () => import('@cip/d-render-plugin-cci/esm/input/basic/radio/view.js')
    }
    return () => import('./radio')
  },
  checkbox: (mode) => {
    if (mode === '/view') {
      return () => import('@cip/d-render-plugin-cci/esm/input/basic/checkbox/view.js')
    }
    return () => import('./checkbox')
  },
  number: (mode) => {
    if (mode === '/view') {
      return () => import('@cip/d-render-plugin-cci/esm/input/basic/number/view.js')
    }
    return () => import('./number')
  },
  switch: (mode) => {
    if (mode === '/view') {
      return () => import('@cip/d-render-plugin-cci/esm/input/basic/switch/view.js')
    }
    return () => import('./switch')
  },
  rate: (mode) => {
    if (mode === '/view') {
      return () => import('@cip/d-render-plugin-cci/esm/input/basic/rate/view.js')
    }
    return () => import('./rate')
  },
  slider: (mode) => {
    if (mode === '/view') {
      return () => import('@cip/d-render-plugin-cci/esm/input/basic/slider/view.js')
    }
    return () => import('./slider')
  }
}
