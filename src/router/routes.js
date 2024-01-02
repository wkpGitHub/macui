import ManagerFramework from '@lc/views/manager/framework'
const ctx = require.context('@lc/views/manager', true, /(\w+\/)*(routes|routes\/index)\.js$/i)
const configureCtx = require.context('@lc/views/configure', true, /(\w+\/)*(routes|routes\/index)\.js$/i)
const previewCtx = require.context('@lc/views/preview', true, /(\w+\/)*(routes|routes\/index)\.js$/i)
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
// front 子路由 可用于权限控制
export const previewChildren = getChildren(previewCtx)
// manager 子路由 可用于权限控制
export const mainChildren = getChildren(ctx)

export const mainRoute = {
  path: '/',
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
  component: () => import('@lc/views/configure/framework'),
  children: configureChildren
}

const previewRoute = {
  path: '/preview/:appPath',
  name: 'previewFramework',
  props: true,
  component: () => import('@lc/views/preview/framework'),
  children: previewChildren
}

const designRoute = {
  path: '/design/:appPath/:id',
  name: 'configurePagesDesign',
  props: true,
  component: () => import('@lc/views/page-design')
}

const loginRoute = {
  path: '/login',
  name: 'login',
  component: () => import('@cip/plugins/pages/smart-center/login')
}

const noLayoutPreviewRoute = {
  path: '/view/:appPath/:path(.*)',
  name: 'viewPage',
  props: true,
  component: () => import('@lc/views/app/pages/low-code')
}

export const routes = [loginRoute, configureRoute, previewRoute, designRoute, noLayoutPreviewRoute]
