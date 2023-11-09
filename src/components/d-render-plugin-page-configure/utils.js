import { startsWith } from 'lodash-es'

export const addConfigPrefix = (configObj = {}) => {
  const obj = {}
  Object.keys(configObj).forEach(key => {
    obj['config.' + key] = configObj[key]
  })
  return obj
}

/**
 * 字段是否可以作为 x 轴  主要是字符串类型, 所有字段都可以
 * @param {字段} field {name:'', label:'', type}
 */
export const xField = (field) => {
  return true
}

/**
 * 字段是否可以作为 y 轴 数值类型
 * @param {字段} field
 */
export const yField = (field) => {
  if (field && field.dataType) {
    if (startsWith(field.dataType, 'LONG') || startsWith(field.dataType, 'DOUBLE') ||
      startsWith(field.dataType, 'INT') || startsWith(field.dataType, 'BIT') || startsWith(field.dataType, 'FLOAT')) { return true }
  }
  return false
}

export function getId () {
  return Math.random().toString(16).substring(2, 10)
}

const configMap = {
  STRING (item) {
    return {
      config: {
        type: 'input',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  TEXT (item) {
    return {
      config: {
        type: 'input',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  INT (item) {
    return {
      config: {
        type: 'number',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  BIGINT (item) {
    return {
      config: {
        type: 'number',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  DOUBLE (item) {
    return {
      config: {
        type: 'number',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  DECIMAL (item) {
    return {
      config: {
        type: 'number',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  TIMESTAMP (item) {
    return {
      config: {
        type: 'number',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  DATE (item) {
    return {
      config: {
        type: 'date',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  TIME (item) {
    return {
      config: {
        type: 'time',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  DATETIME (item) {
    return {
      config: {
        type: 'date',
        viewType: 'datetime',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  DIC (item) {
    return {
      config: {
        type: 'select',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  ENTITY (item) {
    return {
      config: {
        type: 'select',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  },
  POJO (item) {
    return {
      config: {
        type: 'select',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  }
}

export function getItemConfig (item) {
  if (configMap[item.dataType]) {
    return configMap[item.dataType](item)
  } else {
    return {
      config: {
        type: 'input',
        label: item.title
      },
      id: getId(),
      key: item.name
    }
  }
}

export const handelLabelSizeOptions = (maxValue) => {
  const arr = []
  for (let i = 10; i <= maxValue; i = i + 2) {
    arr.push({ label: i, value: i })
  }
  return arr
}
