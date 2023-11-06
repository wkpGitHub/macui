import axios from 'axios'
import { store as requestStore } from '@cip/request'

const instance = axios.create({
  baseURL: requestStore.apiConfig.apiChr
})

export default instance

export const apiConfigToApi = (apiConfig) => {
  const { fullPath, httpMethod = 'get' } = apiConfig
  return (data) => {
    return instance({
      ...data,
      method: httpMethod,
      url: fullPath
    })
  }
}
