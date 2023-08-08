const classMap = {
  branch (config, data) {
    let branchConditions = false
    config.children.forEach(child => {
      if (Object.prototype.hasOwnProperty.call(child, 'expression')) {
        // eslint-disable-next-line no-eval
        branchConditions = eval(child.conditions)
      }
      if (branchConditions) classMap[child.type](child, data)
    })
  },

  'create-data-records' (config, data) {
    console.log(config.fields, data)
  },

  set (config, data) {
    let _val = config.value
    if (['boolean', 'object', 'array'].includes(config.dataType)) _val = JSON.parse(_val)
    data.var[config.name] = _val
  },

  break (config, data) {
    console.log(config.id, config.title)
  },

  end (config, data) {
    console.log(config.id, config.title)
  },

  loop (config, data) {
    /* eslint-disable */
    labelLoop: for (let i = 0, len = config.loopName.length; i < len; i++) {
      for (let j=0, length = config.children.length; j < length; j++) {
        const child = config.children[j]
        if (child.type === 'break') break labelLoop
        else if (child.type === 'continue') continue labelLoop
        else {
          classMap[child.type](child, data)
        }
      }
    }
    /* eslint-enable */
  }
}

export function run (configList, data = { global: {}, var: {}, params: {} }) {
  configList.forEach(config => classMap[config.type](config, data))
}
