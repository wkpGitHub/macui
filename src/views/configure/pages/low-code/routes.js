export const routes = [
  {
    path: 'low/:id',
    name: 'lowCodePage',
    props: true,
    component: () => import('./index')
  }
]
