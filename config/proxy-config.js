/**
 * key => apiName
 * target => 开发环境地址 及 测试环境地址
 * productionTarget => 生产环境地址
 */
const CHR = '/chr'
const proxyConfig = [
  {
    key: 'apiChr', // 基础后端服务
    target: process.env.VUE_APP_API_CHR_TARGET + CHR,
    productionTarget: process.env.VUE_APP_API_CHR_PRODUCTION_TARGET + CHR
  },
  {
    key: 'apiBasic', // 基础后端服务
    target: process.env.VUE_APP_API_BASIC_TARGET,
    productionTarget: process.env.VUE_APP_API_BASIC_PRODUCTION_TARGET
  },
  {
    key: 'apiBase', // 基础后端服务
    target: process.env.VUE_APP_API_BASIC_TARGET,
    productionTarget: process.env.VUE_APP_API_BASIC_PRODUCTION_TARGET
  },
  {
    key: 'road', // 基础后端服务
    target: 'http://10.10.77.106:8080/road',
    productionTarget: '/road'
  }
]

module.exports = proxyConfig
