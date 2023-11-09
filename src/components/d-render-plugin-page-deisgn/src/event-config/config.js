import { generateFieldList } from 'd-render'
import { EVENT_TYPE, TYPE_KEY } from './const'
import { getModuleTree } from '@/components/d-render-plugin-page-render/use-event-configure'

// 左侧树
export const fieldList = generateFieldList({
  eventType: {
    type: 'selectTreePanel',
    showButton: false,
    defaultValue: TYPE_KEY.method,
    options: [
      ...EVENT_TYPE
    ]
  },
  eventName: {
    readable: false,
    dependOn: ['eventType'],
    changeValue ({ eventType }) {
      const { label } = EVENT_TYPE.find(item => item.value === eventType) ?? {}
      return {
        value: label
      }
    }
  }
})

// 页面配置
export const routerFieldList = generateFieldList({
  pageUrl: {
    label: '页面地址'
  },
  pageParams: {
    label: '页面参数',
    type: 'paramsAdd'
  },
  isNewTab: {
    label: '新窗口打开',
    type: 'switch'
  }
})
// 弹窗配置
export const openDialogFieldList = generateFieldList({
  dialogKey: {
    writable: true,
    label: '弹窗选择',
    type: 'select',
    dependOn: ['_dialogList'],
    readable: true,
    asyncOptions: ({ _dialogList }) => {
      return _dialogList ?? []
    }
  }
})
// 脚本配置
export const scriptFieldList = generateFieldList({
  script: {
    label: '脚本',
    type: 'codemirrorInput'
  }
})
// 函数配置
export const methodFieldList = generateFieldList({
  methods: {
    label: '函数',
    type: 'select',
    dependOn: ['_methodList'],
    asyncOptions: ({ _methodList }) => {
      return _methodList.map(item => item.name)
    }
  }
})

export const apiFieldList = generateFieldList({
  api: {
    label: '接口请求',
    type: 'select',
    dependOn: ['_apiList'],
    asyncOptions: ({ _apiList }) => {
      return _apiList.map(item => item.name)
    }
  }
})

export const varFieldList = generateFieldList({
  var: {
    label: '导出参数',
    description: '把事件的参数映射到一个变量上，进行数据存储',
    disabled: true
  },
  desc: { label: '描述' }
})

const setValFieldList = generateFieldList({
  type: {
    label: '类型',
    type: 'radio',
    options: [{ value: 'module', label: '组件' }, { value: 'variable', label: '页面变量' }],
    defaultValue: 'module'
  },
  target: {
    label: '赋值目标',
    type: 'cascader',
    optionProps: {
      label: 'title',
      value: 'name',
      emitPath: false,
      checkStrictly: true
    },
    dependOn: ['type', '_variables'],
    resetValue: true,
    asyncOptions ({ type, _variables }) {
      if (type === 'module') {
        return getModuleTree()
      } else if (type === 'variable') {
        return _variables
      }
    }
  },
  value: {
    label: '值'
  }
})

export const config = {
  [TYPE_KEY.method]: methodFieldList,
  [TYPE_KEY.script]: scriptFieldList,
  [TYPE_KEY.openDialog]: openDialogFieldList,
  [TYPE_KEY.router]: routerFieldList,
  [TYPE_KEY.var]: varFieldList,
  [TYPE_KEY.api]: apiFieldList,
  [TYPE_KEY.setVal]: setValFieldList
}

export const getDialogKeyList = (list, result = []) => {
  list.forEach(item => {
    if (Object.hasOwn(item, 'config')) {
      if (item.config.type === 'dialog') {
        result.push(item.key)
      }
      if (item.config.options?.length) {
        getDialogKeyList(item.config.options, result)
      }
    } else if (item.children?.length) {
      getDialogKeyList(item.children, result)
    }
  })
  return result
}
