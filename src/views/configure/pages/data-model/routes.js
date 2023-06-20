export const routes = [
  {
    name: 'configureEntity',
    path: 'entity',
    component: () => import('./entity')
  },
  {
    name: 'configureEntitySave',
    path: 'entity/save',
    component: () => import('./entity/save')
  },
  {
    name: 'configureDataStructure',
    path: 'data-structure',
    component: () => import('./data-structure')
  },
  {
    name: 'configureEnum',
    path: 'enum',
    component: () => import('./enum')
  }
]
