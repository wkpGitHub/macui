import { cloneDeep, isArray } from '@cip/utils/util'

export const setOptionWritable = (options, value) => {
  return options.map(option => {
    if (option?.config.children?.length > 0) {
      option.config.children = setOptionWritable(option.config.children, value)
    } else {
      option = cloneDeep(option)
      option.config.writable = value
    }
    return option
  })
}

export const isDesignOptions = (options) => {
  const option = options[0]
  return option?.key === 'default' && isArray(option.children)
}
