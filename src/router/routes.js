import ManagerFramework from '@/views/manager/framework'
import FrontFramework from '@/views/front/framework'
const ctx = require.context('@/views/manager', true, /(\w+\/)*routes\/index\.js$/i)
const frontCtx = require.context('@/views/front', true, /(\w+\/)*routes\/index\.js$/i)
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
export const frontChildren = getChildren(frontCtx)
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
const frontRoute = {
  path: '/',
  name: '_frontFramework',
  component: FrontFramework,
  children: frontChildren
}

export const routes = [frontRoute]
