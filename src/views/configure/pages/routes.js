export const routes = [
  {
    name: 'configureDb',
    path: 'db',
    component: () => import('./db')
  },
  {
    name: 'configureApi',
    path: 'api',
    component: () => import('./api')
  },
  {
    name: 'configurePagesManager',
    path: 'pages-preview',
    component: () => import('./pages-manager')
  },
  {
    name: 'configureServiceDesign',
    path: 'service-design',
    component: () => import('./service-design'),
    props: ({ query }) => ({ ...query })
  },
  {
    name: 'configureFlow',
    path: 'flow',
    component: () => import('./flow')
  },
  {
    name: 'configureFlowDesign',
    path: 'flow/design',
    component: () => import('./flow/design')
  },
  {
    name: 'configureSetting',
    path: 'setting',
    component: () => import('./setting')
  },
  {
    name: 'configureConnectorManager',
    path: 'connector',
    component: () => import('./connector-manager')
  },
  {
    name: 'configureDataSources',
    path: 'data-sources',
    component: () => import('./data-sources')
  },
  {
    name: 'configureConnectorManagerItem',
    path: 'connector/:id/item',
    props (route) {
      return {
        connectorId: route.params.id,
        connectorType: route.query.type
      }
    },
    component: () => import('./connector-manager/detail')
  }
]
