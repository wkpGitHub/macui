import ManagerFramework from '@/views/manager/framework'
const ctx = require.context('@/views/manager', true, /(\w+\/)*(routes|routes\/index)\.js$/i)
const configureCtx = require.context('@/views/configure', true, /(\w+\/)*(routes|routes\/index)\.js$/i)
const getChildren = (ctx) => {
  const result = []
  const paths = ctx.keys()
  paths.forEach(path => {
    const routes = ctx(path).routes || []
    result.push(...routes)
  })
  return result
}
// front 子路由 可用于权限控制
export const configureChildren = getChildren(configureCtx)
// manager 子路由 可用于权限控制
export const mainChildren = getChildren(ctx)

export const mainRoute = {
  path: '/manager',
  name: '_mainFramework',
  component: ManagerFramework,
  props: { layout: 'left-2' },
  children: []
}
export const hideRoute = {
  path: '/manager',
  name: '_mainFramework',
  component: ManagerFramework,
  props: { layout: 'hide' },
  children: []
}
const configureRoute = {
  path: '/configure/:appPath',
  name: 'configureFramework',
  props: true,
  component: () => import('@/views/configure/framework'),
  children: configureChildren
}

const loginRoute = {
  path: '/login',
  name: 'login',
  component: () => import('@cip/plugins/pages/smart-center/login')
}
export const routes = [loginRoute, configureRoute]
