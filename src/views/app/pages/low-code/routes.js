export const routes = [
  {
    path: ':path(.*)',
    name: 'lowCodePage',
    props: true,
    component: () => import('./index')
  }
]
