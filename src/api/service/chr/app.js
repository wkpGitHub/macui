import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 应用管理
class AppService extends Model {
  // 名称是否可用
  @transformData()
  checkName ({ createTime, creatorId, creatorName, enabled, id, logo, name, path, remark, updateTime, updatorId, updatorName }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/app/check-name',
      params: { createTime, creatorId, creatorName, enabled, id, logo, name, path, remark, updateTime, updatorId, updatorName }
    })
  }

  // 编码是否可用
  @transformData()
  checkPath (data) {
    const { createTime, creatorId, creatorName, enabled, id, logo, name, path, remark, updateTime, updatorId, updatorName } = data
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/app/check-path',
      params: { createTime, creatorId, creatorName, enabled, id, logo, name, path, remark, updateTime, updatorId, updatorName }
    })
  }

  // 通过key获取配置
  @transformData()
  key ({ appId, key }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/app/config/key',
      params: { appId, key }
    })
  }

  // 应用配置键值对保存
  @transformData()
  save (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/app/config/save',
      data: data
    })
  }

  // 删除
  @transformData()
  delete (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/app/delete',
      data: data
    })
  }

  // 详情
  @transformData()
  info ({ path }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/app/info',
      params: { path }
    })
  }

  // 分页
  @transformData()
  page ({ enabled, name, orderAsc, orderBy, path }, { offset, limit }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/app/page',
      params: { enabled, name, orderAsc, orderBy, path, offset, limit }
    })
  }

  // 保存
  @transformData()
  appSave (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/app/save',
      data: data
    })
  }

  // 切换状态
  @transformData()
  toggle ({ enabled, id }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/app/toggle',
      params: { enabled, id }
    })
  }
}
export const appService = new AppService()
