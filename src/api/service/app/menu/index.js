import Model, { transformData } from '@cip/utils/model'
// import req from '@cip/request'
import { menuEntity } from '@/api/entity'
import frontMenuList from './virtual-data/front-menu'
import managerMenuList from './virtual-data/manger-menu'
class MenuService extends Model {
  @transformData()
  getFrontMenu () {
    return { data: frontMenuList }
  }

  @transformData()
  getManagerMenu () {
    return { data: managerMenuList }
  }
}

export const menuService = new MenuService(menuEntity)
