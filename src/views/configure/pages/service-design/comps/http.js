import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'

const staticInfoStyle = {
  fontWeight: 'bold',
  fontSize: 16,
  inputStyle: {
    borderBottom: '1px solid #ccc',
    padding: '0 0 10px 0'
  }
}

export default {
  category: '调用服务',
  type: 'http',
  title: 'http请求',
  formField: generateFieldList(defineFormFieldConfig({
    _staticInfo: { type: 'staticInfo', staticInfo: '基本信息', ...staticInfoStyle },
    title: { label: '节点标题' },
    sourceName: { label: '入参来源' },
    targetName: { label: '节点出参' },
    url: { label: '请求地址', required: true },
    method: {
      required: true,
      label: 'method',
      type: 'select',
      defaultValue: 'get',
      options: ['get', 'post', 'put', 'patch', 'delete']
    },
    contentType: {
      label: '请求格式',
      readable: false,
      type: 'select',
      options: [
        { label: 'json', value: 'json' },
        { label: '表单', value: 'form' },
        { label: '文件上传', value: 'upload' }
      ],
      dependOn: ['method'],
      changeConfig (config, { method }) {
        config.writable = method !== 'get'
        return config
      }
    },
    retry: { label: '重试次数', type: 'number' },

    _staticInfo1: { type: 'staticInfo', staticInfo: '提交参数', ...staticInfoStyle },
    customQueryMerge: {
      label: 'Query转换',
      type: 'switch',
      activeText: '追加',
      inactiveText: '覆盖'
    },
    queryMap: {
      type: 'table',
      options: generateFieldList(defineTableFieldConfig({
        targetName: { writable: true, required: true, label: '字段名' },
        sourceName: { writable: true, label: '值' }
      }))
    },
    customHeaderMerge: {
      label: 'Header转换',
      type: 'switch',
      activeText: '追加',
      inactiveText: '覆盖'
    },
    headerMap: {
      type: 'table',
      options: generateFieldList(defineTableFieldConfig({
        targetName: { writable: true, required: true, label: '字段名' },
        sourceName: { writable: true, label: '值' }
      }))
    },
    customInputMerge: {
      label: 'Body转换',
      type: 'switch',
      activeText: '追加',
      inactiveText: '覆盖',
      readable: false,
      dependOn: ['method'],
      changeConfig (config, { method }) {
        config.writable = method !== 'get'
        return config
      }
    },
    inputMap: {
      type: 'table',
      options: generateFieldList(defineTableFieldConfig({
        targetName: { writable: true, required: true, label: '字段名' },
        sourceName: { writable: true, label: '值' }
      })),
      readable: false,
      dependOn: ['method'],
      changeConfig (config, { method }) {
        config.writable = method !== 'get'
        return config
      }
    },
    _staticInfo2: { type: 'staticInfo', staticInfo: '返回结果', ...staticInfoStyle },
    isDownload: {
      label: '文件下载',
      type: 'switch'
    },
    enableCustomOutput: {
      label: '返回结果转换',
      type: 'switch',
      dependOn: ['isDownload'],
      changeConfig (config, { isDownload }) {
        config.readable = !isDownload
        config.writable = !isDownload
        return config
      }
    },
    customOutputMerge: {
      label: '转换模式',
      type: 'switch',
      readable: false,
      activeText: '追加',
      inactiveText: '覆盖',
      dependOn: ['isDownload', 'enableCustomOutput'],
      changeConfig (config, { isDownload, enableCustomOutput }) {
        config.readable = !isDownload & enableCustomOutput
        config.writable = !isDownload & enableCustomOutput
        return config
      }
    },
    outputTransform: {
      readable: false,
      dependOn: ['isDownload', 'enableCustomOutput'],
      changeConfig (config, { isDownload, enableCustomOutput }) {
        config.readable = !isDownload & enableCustomOutput
        config.writable = !isDownload & enableCustomOutput
        console.log(isDownload, 'enableCustomOutput')
        return config
      }
    },
    enableResponseAdaptor: {
      label: '返回结果适配',
      type: 'switch',
      dependOn: ['isDownload'],
      changeConfig (config, { isDownload }) {
        config.readable = !isDownload
        config.writable = !isDownload
        return config
      }
    },
    responseAdaptor: {
      label: '适配代码',
      type: 'codemirrorInput',
      readable: false,
      dependOn: ['isDownload', 'enableResponseAdaptor'],
      changeConfig (config, { isDownload, enableResponseAdaptor }) {
        config.readable = !isDownload & enableResponseAdaptor
        config.writable = !isDownload & enableResponseAdaptor
        return config
      }
    },

    _staticInfo3: { type: 'staticInfo', staticInfo: '认证鉴权', ...staticInfoStyle },
    authType: {
      type: 'select',
      label: '请求认证方式',
      defaultValue: 'none',
      options: [
        { label: '无', value: 'none' },
        { label: 'HTTP账号密码', value: 'basic' },
        { label: 'JWT', value: 'jwt' },
        { label: '百度云', value: 'baiduCloud' },
        { label: '第三方', value: 'third' }
      ]
    },
    basicUsername: {
      label: '用户名',
      readable: false,
      dependOn: ['authType'],
      changeConfig (config, { authType }) {
        config.writable = authType === 'basic'
        return config
      }
    },
    basicPassword: {
      label: '密码',
      readable: false,
      dependOn: ['authType'],
      changeConfig (config, { authType }) {
        config.writable = authType === 'basic'
        return config
      }
    },
    jwtMethod: {
      label: '签名方式',
      type: 'select',
      options: [
        { label: 'HS256', value: 'HS256' },
        { label: 'RS256', value: 'RS256' }
      ],
      readable: false,
      dependOn: ['authType'],
      changeConfig (config, { authType }) {
        config.writable = authType === 'jwt'
        return config
      }
    },
    jwtRSAKey: {
      label: 'RS256密钥',
      readable: false,
      dependOn: ['authType', 'jwtMethod'],
      changeConfig (config, { authType, jwtMethod }) {
        config.writable = authType === 'jwt' && jwtMethod === 'RS256'
        return config
      }
    }, // RS256
    jwtSecret: {
      label: 'HS256密钥',
      readable: false,
      dependOn: ['authType', 'jwtMethod'],
      changeConfig (config, { authType, jwtMethod }) {
        config.writable = authType === 'jwt' && jwtMethod === 'HS256'
        return config
      }
    }, // HS256
    baiduCloudAK: {
      label: '百度云AK',
      readable: false,
      dependOn: ['authType'],
      changeConfig (config, { authType }) {
        config.writable = authType === 'baiduCloud'
        return config
      }
    },
    baiduCloudSK: {
      label: '百度云SK',
      readable: false,
      dependOn: ['authType'],
      changeConfig (config, { authType }) {
        config.writable = authType === 'baiduCloud'
        return config
      }
    },
    thirdEndpoint: {
      label: '签名接口',
      required: true,
      readable: false,
      dependOn: ['authType'],
      changeConfig (config, { authType }) {
        config.writable = authType === 'third'
        return config
      }
    },
    thirdExpireDuration: {
      type: 'number',
      label: '过期时间',
      defaultValue: 900,
      readable: false,
      dependOn: ['authType'],
      changeConfig (config, { authType }) {
        config.writable = authType === 'third'
        return config
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'http',
    title: 'http请求',
    conditions: {},
    children: [],
    method: 'get',
    authType: 'none'
  }
}
