// 判断是否需要加在 framework
export const judgeFramework = () => {
  if (window.__MICRO_APP_BASE_ROUTE__) return false
  if (self !== top) return false
  return true
}
