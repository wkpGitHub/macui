import Model, { transformData } from '@cip/utils/model'

class AppService extends Model {
  @transformData()
  heartbeat () {
    console.log('send heartbeat')
  }
}

export const appService = new AppService()
