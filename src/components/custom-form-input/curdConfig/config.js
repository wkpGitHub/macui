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
