export const menuEntity = {
  id: {}, // 唯一标识可为空
  name: {}, // 对于路由名称
  title: {}, // 标题
  code: {}, // 权限
  icon: {}, // _开通的为svg-icon
  cache: {}, // 是否开启缓存 也可有route定义是用meta.cache直接控制
  children: { type: ['this'] },
  hideInMenu: {}, // 是否隐藏该路由
  route: {}, // 内部路由 [注: 推荐使用全路径]
  link: {}, // 外部链接
  badge: {}, // 固定的徽标
  getBadge: {}, // 支持异步的获取徽标
}
