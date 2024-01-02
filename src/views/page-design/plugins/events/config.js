import { generateFieldList, CipForm } from 'd-render'
import { getModuleTree, getListConfigByKey } from '@lc/components/d-render-plugin-page-render/use-event-configure'
import { cloneDeep } from '@cip/utils/util.js'
import { reactive } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import { getComponentConfigure } from '../field-configure/config'
// import { cloneDeep } from '@cip/utils/util'

export const TYPE_KEY = {
  updateView: 'updateView',
  method: 'method',
  openDialog: 'openDialog',
  script: 'script',
  router: 'router',
  api: 'api',
  componentMethod: 'componentMethod',
  visible: 'visible',
  disabled: 'disabled'
}
export const EVENT_TYPE = [
  { value: 'updateView', label: '联动' },
  { value: 'componentMethod', label: '调用组件方法' },
  { value: 'api', label: '接口请求' },
  { value: 'openDialog', label: '打开弹窗' },
  { value: 'router', label: '打开页面' },
  { value: 'method', label: '函数' },
  { value: 'script', label: '脚本' },
  { value: 'visible', label: '隐藏组件' },
  { value: 'disabled', label: '禁用组件' }
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
const updateViewFieldList = (drDesign, params) => generateFieldList({
  ...params,
  target: {
    label: '选择展示块',
    type: 'select',
    required: true,
    withObject: true,
    hideIndex: true,
    hideAdd: true,
    hideDelete: true,
    otherKey: '_viewData',
    asyncOptions: () => {
      const _list = []
      function getApis (list = []) {
        list.forEach(item => {
          if (item.config?.api) {
            _list.push({ ...item, label: item.config.label, value: item.key })
          }
          if (item.config?.options) {
            const _children = []
            item.config.options?.forEach(o => o.children && _children.push(...o.children))
            getApis(_children)
          }
        })
      }
      getApis(drDesign.schema?.list)
      return _list
    }
  },
  inputParams: {
    type: 'table',
    options: generateFieldList({
      name: { label: '字段', writable: true },
      value: { label: '值', writable: true, type: 'pageFx' }
    }),
    dependOn: ['_viewData'],
    changeValue ({ _viewData: { config } }) {
      return { value: cloneDeep(config.api.inputParams || []) }
    }
  }
})
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
      required: true,
      withObject: true,
      otherKey: '_apiData',
      optionProps: {
        label: 'name',
        value: 'name'
      },
      asyncOptions: () => {
        return drDesign.schema?.apiList || []
      }
    },
    inputParams: {
      label: '请求参数',
      dependOn: ['_apiData'],
      type: 'table',
      options: generateFieldList({
        name: { label: '字段', writable: true },
        value: { label: '值', writable: true, type: 'pageFx' }
      }),
      hideIndex: true,
      hideAdd: true,
      hideDelete: true,
      changeValue ({ _apiData }) {
        return { value: (_apiData.inputParams || []).map(item => ({ ...item })) }
      }
    },
    type: {
      label: '返回结果赋值于',
      type: 'radio',
      options: [{ value: 'module', label: '组件' }, { value: 'variable', label: '外部变量' }],
      defaultValue: 'module'
    },
    target: {
      label: '目标',
      type: 'selectTree',
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
          return getModuleTree(false, drDesign)
        } else if (type === 'variable') {
          return drDesign.schema.variables
        }
      }
    }
  })

  const componentMethodFieldList = generateFieldList({
    target: {
      label: '目标组件',
      required: true,
      type: 'selectTree',
      optionProps: {
        label: 'title',
        value: 'name',
        emitPath: false,
        checkStrictly: true
      },
      asyncOptions () {
        return getModuleTree(false, drDesign)
      }
    },
    methodName: {
      label: '组件内部方法',
      type: 'select',
      withObject: true,
      required: true,
      otherKey: '_method',
      dependOn: ['target'],
      async asyncOptions ({ target }) {
        const _options = [{ label: '设置值', value: 'setData', args: ['设置值'] }]
        if (target) {
          const item = getListConfigByKey(drDesign.schema?.list, target)
          const configure = await getComponentConfigure(item.config.type)
          configure.methods?.options?.forEach(m => _options.push(m))
        }

        return _options
      }
    },
    args: {
      required: true,
      hideLabel: true,
      type: 'event-args',
      dependOn: ['_method']
    }
  })

  const visibleFieldList = generateFieldList({
    target: {
      label: '目标组件',
      type: 'selectTree',
      required: true,
      optionProps: {
        label: 'title',
        value: 'name',
        emitPath: false,
        checkStrictly: true
      },
      options: getModuleTree(false, drDesign)
    },
    value: {
      required: true,
      label: '值',
      type: 'pageFx'
    }
  })

  return {
    [TYPE_KEY.updateView]: updateViewFieldList(drDesign, {}),
    [TYPE_KEY.componentMethod]: componentMethodFieldList,
    [TYPE_KEY.api]: apiFieldList,
    [TYPE_KEY.openDialog]: openDialogFieldList,
    [TYPE_KEY.method]: methodFieldList,
    [TYPE_KEY.script]: scriptFieldList,
    [TYPE_KEY.router]: routerFieldList,
    [TYPE_KEY.visible]: visibleFieldList,
    [TYPE_KEY.disabled]: visibleFieldList
  }
}

export function useUpdateView (drDesign, eventTypes, saveUpdateView) {
  const state = reactive({
    isShow: false,
    item: {}
  })
  return {
    state,
    render () {
      const formFieldList = updateViewFieldList(drDesign, {
        type: {
          label: '触发方式',
          type: 'select',
          options: eventTypes.value,
          required: true
        }
      })
      return <CipDialog title={'联动'} v-model={state.isShow} onConfirm={(resolve) => saveUpdateView(state.item, resolve)}>
        <CipForm v-model:model={state.item} fieldList={formFieldList} />
      </CipDialog>
    }
  }
}
