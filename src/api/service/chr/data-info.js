import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 数据模型管理
class DataInfoService extends Model {
  // 信息名称是否可用
  @transformData()
  checkName ({ dbId, id, name, type }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/check-name',
      params: { dbId, id, name, type }
    })
  }

  // 数据表名称是否可用
  @transformData()
  checkTableName ({ dbId, id, tableName, type }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/check-table-name',
      params: { dbId, id, tableName, type }
    })
  }

  // ddl分页
  @transformData()
  page ({ dataId, orderAsc, orderBy }, { offset, limit }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/ddl/page',
      params: { dataId, orderAsc, orderBy, offset, limit }
    })
  }

  // 删除
  @transformData()
  delete (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/delete',
      data: data
    })
  }

  // 详情带字段信息
  @transformData()
  detail ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/detail',
      params: { id }
    })
  }

  // 字典值删除
  @transformData()
  dicDelete (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/dic/delete',
      data: data
    })
  }

  // 字典值列表
  @transformData()
  list ({ dataId }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/dic/list',
      params: { dataId }
    })
  }

  // 字典值保存
  @transformData()
  save (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/dic/save',
      data: data
    })
  }

  // 下载excel导入模板
  @transformData()
  downloadExcelTemplate ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/downloadExcelTemplate',
      params: { id }
    })
  }

  // 导出excel数据
  @transformData()
  exportExcelData ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/exportExcelData',
      params: { id }
    })
  }

  // 批量删除字段
  @transformData()
  fieldDelete (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/field/delete',
      data: data
    })
  }

  // 数据模型列表
  @transformData()
  infoList ({ dbId, name, type }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/list',
      params: { dbId, name, type }
    })
  }

  // 数据信息保存
  @transformData()
  infoSave (data) {
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/save',
      data: data
    })
  }

  // 初始值接口
  @transformData()
  scaffold ({ id }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/scaffold',
      params: { id }
    })
  }

  // 同步结构
  @transformData()
  sync ({ dataId }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/sync',
      params: { dataId }
    })
  }

  // 数据模型树
  @transformData()
  tree ({ name, withBasic }) {
    return req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/tree',
      params: { name, withBasic }
    })
  }

  // 数据模型树
  @transformData()
  async treeWithType ({ name, withBasic, type }) {
    const { data } = await req({
      method: 'get',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/tree',
      params: { name, withBasic }
    })
    return { data: data[type] }
  }

  // excel数据导入
  @transformData()
  uploadExcelData (data) {
    const { id } = data
    return req({
      method: 'post',
      apiName: 'apiChr',
      url: '/api/v1/storage/info/uploadExcelData',
      params: { id }
    })
  }
}
export const dataInfoService = new DataInfoService()
