import Model, { transformData } from '@cip/utils/model'
// import req from '@cip/request'
import { menuEntity } from '@lc/api/entity'
import configureMenuList from './virtual-data/configure-menu'
import managerMenuList from './virtual-data/manger-menu'
class MenuService extends Model {
  @transformData()
  getConfigureMenu () {
    return { data: configureMenuList }
  }

  @transformData()
  getManagerMenu () {
    return { data: managerMenuList }
  }
}

export const menuService = new MenuService(menuEntity)
