import { generateFieldList } from 'd-render'
import { getModuleTree } from '@/components/d-render-plugin-page-render/use-event-configure'

export const TYPE_KEY = {
  method: 'method',
  openDialog: 'openDialog',
  script: 'script',
  router: 'router',
  api: 'api',
  setVal: 'setVal'
}
export const EVENT_TYPE = [
  { value: 'method', label: '函数' },
  { value: 'openDialog', label: '打开弹窗' },
  { value: 'router', label: '页面' },
  { value: 'script', label: '脚本' },
  { value: 'api', label: '接口请求' },
  { value: 'setVal', label: '赋值' }
]

const getDialogKeyList = (list, result = []) => {
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

export function getConfig (drDesign) {
  // 页面配置
  const routerFieldList = generateFieldList({
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
  const openDialogFieldList = generateFieldList({
    dialogKey: {
      writable: true,
      label: '弹窗选择',
      type: 'select',
      readable: true,
      asyncOptions: () => {
        return getDialogKeyList(drDesign.schema.list) ?? []
      }
    }
  })
  // 脚本配置
  const scriptFieldList = generateFieldList({
    script: {
      label: '脚本',
      type: 'codemirrorInput'
    }
  })
  // 函数配置
  const methodFieldList = generateFieldList({
    methods: {
      label: '函数',
      type: 'select',
      asyncOptions: () => {
        return drDesign.schema.methods.map(item => item.name)
      }
    }
  })

  const apiFieldList = generateFieldList({
    api: {
      label: '接口请求',
      type: 'select',
      asyncOptions: () => {
        return drDesign.schema.apiList.map(item => item.name)
      }
    }
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
      dependOn: ['type'],
      resetValue: true,
      asyncOptions ({ type }) {
        if (type === 'module') {
          return getModuleTree()
        } else if (type === 'variable') {
          return drDesign.schema.variables
        }
      }
    },
    value: {
      label: '值',
      type: 'pageVar'
    }
  })

  return {
    [TYPE_KEY.method]: methodFieldList,
    [TYPE_KEY.script]: scriptFieldList,
    [TYPE_KEY.openDialog]: openDialogFieldList,
    [TYPE_KEY.router]: routerFieldList,
    [TYPE_KEY.api]: apiFieldList,
    [TYPE_KEY.setVal]: setValFieldList
  }
}
