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
    name: 'configureDataSourcesDetail',
    path: 'data-sources/:id/detail',
    props (route) {
      return {
        id: route.params.id
      }
    },
    component: () => import('./data-sources/detail')
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
  },
  {
    name: 'serviceConfig',
    path: 'service-config',
    component: () => import('./api/entity-sql'),
    props: ({ query }) => ({ ...query })
  }
]
