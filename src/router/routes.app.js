const appCtx = require.context('@lc/views/app', true, /(\w+\/)*(routes|routes\/index)\.js$/i)
const getChildren = (ctx) => {
  const result = []
  const paths = ctx.keys()
  paths.forEach(path => {
    const routes = ctx(path).routes || []
    result.push(...routes)
  })
  return result
}
// manager 子路由 可用于权限控制
export const appChildren = getChildren(appCtx)

const loginRoute = {
  path: '/login',
  name: 'login',
  component: () => import('@cip/plugins/pages/smart-center/login')
}
export const appRoute = {
  path: '/:appPath',
  name: 'appFramework',
  component: () => import('@lc/views/app/framework'),
  props: true
}
export const appHideRoute = {
  path: '/:appPath',
  name: 'appFramework',
  component: () => import('@lc/views/app/framework'),
  props: ({ params }) => {
    return {
      appPath: params.appPath,
      layout: 'hide'
    }
  }
}
export const routes = [loginRoute]
