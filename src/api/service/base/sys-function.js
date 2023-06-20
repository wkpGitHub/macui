import Model, { transformData } from '@cip/utils/model'
import req from '@cip/request'
// 系统功能管理
class SysFunctionService extends Model {
  // 新增/修改信息
  @transformData()
  fun (data) {
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/fun',
      data: data
    })
  }

  // 名称是否可用
  @transformData()
  nameCheck ({ children[0].ename, children[0].fullPathName, children[0].icon, children[0].isBack, children[0].isBtn, children[0].isCache, children[0].isOpen, children[0].isPublic, children[0].seq, createTime, ename, fullPathName, icon, id, isBack, isBtn, isCache, isDir, isOpen, isPublic, name, pid, seq, updateTime }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/fun/nameCheck',
      params: { children[0].ename, children[0].fullPathName, children[0].icon, children[0].isBack, children[0].isBtn, children[0].isCache, children[0].isOpen, children[0].isPublic, children[0].seq, createTime, ename, fullPathName, icon, id, isBack, isBtn, isCache, isDir, isOpen, isPublic, name, pid, seq, updateTime }
    })
  }

  // 功能树
  @transformData()
  tree ({ teamId }) {
    return req({
      method: 'get',
      apiName: 'apiBase',
      url: '/api/sys/fun/tree',
      params: { teamId }
    })
  }

  // 删除
  @transformData()
  delete (data) {
    const { id } = data
    return req({
      method: 'post',
      apiName: 'apiBase',
      url: '/api/sys/fun/{id}/delete',
      pathParams: { id }
    })
  }
}
export const sysFunctionService = new SysFunctionService()
