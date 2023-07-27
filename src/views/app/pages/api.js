import axios from 'axios'

const instance = axios.create({})

export default instance

export const apiConfigToApi = (apiConfig) => {
  const { fullPath, query, method = 'get' } = apiConfig
  return (data) => {
    console.log('[low_code] request', data)
    return instance({
      ...data,
      method: method,
      url: fullPath
    })
  }
}
