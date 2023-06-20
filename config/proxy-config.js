/**
 * key => apiName
 * target => 开发环境地址 及 测试环境地址
 * productionTarget => 生产环境地址
 */
const proxyConfig = [
  {
    key: 'apiChr', // 基础后端服务
    target: process.env.VUE_APP_API_CHR_TARGET,
    productionTarget: process.env.VUE_APP_API_CHR_PRODUCTION_TARGET
  },
  {
    key: 'apiBasic', // 基础后端服务
    target: process.env.VUE_APP_API_BASIC_TARGET,
    productionTarget: process.env.VUE_APP_API_BASIC_PRODUCTION_TARGET
  }
]

module.exports = proxyConfig
