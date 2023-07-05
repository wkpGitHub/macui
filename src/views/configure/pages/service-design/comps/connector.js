import { generateFieldList, defineFormFieldConfig } from 'd-render'

// {
//   "id": "70beaea97744",
//   "type": "connector",
//   "title": "连接器",
//   "conditions": {},
//   "validateFailed": true,
//   "children": [],
//   "targetName": "aaa", // 节点出参 -必填
//   "enableCustomOutput": true, // 返回结果转换 true/ false
//   "outputTransform": [ // 转换模式数组
//       {
//           "originType": "json",
//           "method": "json-key",
//           "jsonKey": "a.b.c",
//           "targetName": "ddd"
//       }
//   ],
//   "enableResponseAdaptor": true, // 返回结果适配 true/false
//   "responseAdaptor": "module.exports = (responseData) => {\n// 对 responseData 进行处理，或者返回新的内容\nreturn responseData;\n}", // 适配代码
//   "mobiles": []
// }

export default {
  category: '调用服务',
  type: 'connector',
  title: '连接器',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    // link: { label: '连接', type: 'select', options: [], required: true },
    // methods: { label: '方法', type: 'select', options: [], required: true },
    targetName: { label: '节点出参', required: true },
    enableCustomOutput: {
      label: '返回结果转换',
      type: 'switch'
    },
    outputTransform: {
      readable: false,
      dependOn: ['enableCustomOutput'],
      changeConfig (config, { enableCustomOutput }) {
        config.readable = enableCustomOutput
        config.writable = enableCustomOutput
        return config
      }
    },
    enableResponseAdaptor: {
      label: '返回结果适配',
      type: 'switch'
    },
    responseAdaptor: {
      label: '适配代码',
      type: 'codemirrorInput',
      readable: false,
      dependOn: ['enableResponseAdaptor'],
      changeConfig (config, { enableResponseAdaptor }) {
        config.readable = enableResponseAdaptor
        config.writable = enableResponseAdaptor
        return config
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'connector',
    title: '连接器',
    conditions: {},
    validateFailed: true,
    children: [],
    mobiles: []
  }
}
