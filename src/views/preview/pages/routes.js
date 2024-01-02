export const routes = [
  {
    path: ':path(.*)',
    name: 'lowCodePage',
    props: true,
    component: () => import('@lc/views/app/pages/low-code')
  }
]
