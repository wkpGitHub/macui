export const addConfigPrefix = (configObj = {}) => {
  const keyArr = Object.keys(configObj)
  const obj = {}
  keyArr.forEach(key => {
    obj['config.' + key] = configObj[key]
  })
  return obj
}
