export const routes = [
  {
    path: ':path',
    name: 'lowCodePage',
    props: ({ params, query }) => ({
      path: params.path,
      id: query.id
    }),
    component: () => import('./index')
  }
]
