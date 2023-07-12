import { generateFieldList } from 'd-render'
import { EVENT_TYPE, TYPE_KEY } from './const'
// 左侧树
export const fieldList = generateFieldList({
  eventType: {
    type: 'selectTreePanel',
    showButton: false,
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
    changeConfig (config, { _dialogList }) {
      console.log(_dialogList, '_dialogList')
      config.options = _dialogList
      return config
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
  script: {
    label: '脚本',
    type: 'codemirrorInput'
  }
})

export const config = {
  [TYPE_KEY.method]: methodFieldList,
  [TYPE_KEY.script]: scriptFieldList,
  [TYPE_KEY.openDialog]: openDialogFieldList,
  [TYPE_KEY.router]: routerFieldList
}
