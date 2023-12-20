import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'

// {
//   "id": "bd33ff4782fd",
//   "type": "http",
//   "title": "http请求",
//   "conditions": {},
//   "validateFailed": false,
//   "children": [],
//   "sourceName": "input", // 入参来源,(placeholder=默认是 input，来自前端的提交)
//   "targetName": "output", // 节点出参 (placeholder="默认是 output，这个变量将作为最终结果")
//   "method": "get",        // type: select (get、post、put、 patch、 delete)
//   "url": "http://123.html", // 请求地址
//   "retry": 0, //重试次数, type 数字输入框
//   "contentType": "json", // 请求格式 type: select (json: json、 表单: form、 文件上传: upload)
//   "isDownload": true, // 文件下载 true/false
//   "authType": "none", // 请求验证方式-type :select (none/无 、 basic/HTTP账号密码、 jwt/JWT、  baiduCloud/百度云、 third/第三方签名)
//   "basicUsername": "http-user", // basic-用户名
//   "basicPassword": "http-pwd",// basic-密码
//   "jwtMethod": "HS256", // 签名方式
//   "jwtSecret": "HS256pwd", // HS256 密钥
//   "baiduCloudAK": "Ak", // 百度云 AK
//   "baiduCloudSK": "sk", // 百度云 SK
//   "thirdEndpoint": "", // 签名接口 必填
//   "thirdExpireDuration": 900, // 过期时间
//   "enableCustomInput": true,
//   "customInputMerge": true, // Body转换-追加（true）、覆盖(false)
//   "inputMap": [ // Body转换数组
//       {
//           "variables": [
//               {
//                   "label": "上下文",
//                   "tag": "对象",
//                   "type": "object",
//                   "selectMode": "tree",
//                   "children": []
//               },
//               {
//                   "label": "系统变量",
//                   "selectMode": "tree",
//                   "tag": "对象",
//                   "type": "object",
//                   "children": [
//                       {
//                           "label": "用户信息",
//                           "value": "user",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "用户ID",
//                                   "value": "user.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "用户名",
//                                   "value": "user.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "手机号",
//                                   "value": "user.phone",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "邮箱",
//                                   "value": "user.email",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "昵称",
//                                   "value": "user.nickName",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "应用信息",
//                           "value": "app",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "应用ID",
//                                   "value": "app.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用名称",
//                                   "value": "app.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "当前运行环境",
//                                   "value": "app.env",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "组织信息",
//                           "value": "company",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "组织ID",
//                                   "value": "company.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "组织名称",
//                                   "value": "company.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用标识",
//                                   "value": "company.key",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       }
//                   ]
//               }
//           ],
//           "targetName": "aaa",
//           "sourceName": "bbb"
//       },
//       {
//           "variables": [
//               {
//                   "label": "上下文",
//                   "tag": "对象",
//                   "type": "object",
//                   "selectMode": "tree",
//                   "children": []
//               },
//               {
//                   "label": "系统变量",
//                   "selectMode": "tree",
//                   "tag": "对象",
//                   "type": "object",
//                   "children": [
//                       {
//                           "label": "用户信息",
//                           "value": "user",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "用户ID",
//                                   "value": "user.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "用户名",
//                                   "value": "user.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "手机号",
//                                   "value": "user.phone",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "邮箱",
//                                   "value": "user.email",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "昵称",
//                                   "value": "user.nickName",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "应用信息",
//                           "value": "app",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "应用ID",
//                                   "value": "app.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用名称",
//                                   "value": "app.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "当前运行环境",
//                                   "value": "app.env",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "组织信息",
//                           "value": "company",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "组织ID",
//                                   "value": "company.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "组织名称",
//                                   "value": "company.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用标识",
//                                   "value": "company.key",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       }
//                   ]
//               }
//           ],
//           "targetName": "ccc",
//           "sourceName": "ddd"
//       }
//   ],
//   "enableCustomHeader": true,
//   "headerMap": [ // Header转换
//       {
//           "variables": [
//               {
//                   "label": "上下文",
//                   "tag": "对象",
//                   "type": "object",
//                   "selectMode": "tree",
//                   "children": []
//               },
//               {
//                   "label": "系统变量",
//                   "selectMode": "tree",
//                   "tag": "对象",
//                   "type": "object",
//                   "children": [
//                       {
//                           "label": "用户信息",
//                           "value": "user",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "用户ID",
//                                   "value": "user.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "用户名",
//                                   "value": "user.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "手机号",
//                                   "value": "user.phone",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "邮箱",
//                                   "value": "user.email",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "昵称",
//                                   "value": "user.nickName",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "应用信息",
//                           "value": "app",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "应用ID",
//                                   "value": "app.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用名称",
//                                   "value": "app.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "当前运行环境",
//                                   "value": "app.env",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "组织信息",
//                           "value": "company",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "组织ID",
//                                   "value": "company.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "组织名称",
//                                   "value": "company.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用标识",
//                                   "value": "company.key",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       }
//                   ]
//               }
//           ],
//           "targetName": "提交参数3", // 字段名
//           "sourceName": "333" // 值
//       },
//       {
//           "variables": [
//               {
//                   "label": "上下文",
//                   "tag": "对象",
//                   "type": "object",
//                   "selectMode": "tree",
//                   "children": []
//               },
//               {
//                   "label": "系统变量",
//                   "selectMode": "tree",
//                   "tag": "对象",
//                   "type": "object",
//                   "children": [
//                       {
//                           "label": "用户信息",
//                           "value": "user",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "用户ID",
//                                   "value": "user.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "用户名",
//                                   "value": "user.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "手机号",
//                                   "value": "user.phone",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "邮箱",
//                                   "value": "user.email",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "昵称",
//                                   "value": "user.nickName",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "应用信息",
//                           "value": "app",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "应用ID",
//                                   "value": "app.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用名称",
//                                   "value": "app.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "当前运行环境",
//                                   "value": "app.env",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "组织信息",
//                           "value": "company",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "组织ID",
//                                   "value": "company.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "组织名称",
//                                   "value": "company.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用标识",
//                                   "value": "company.key",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       }
//                   ]
//               }
//           ],
//           "targetName": "提交参数4",
//           "sourceName": "444"
//       }
//   ],
//   "customHeaderMerge": true, // Header转换 - 追加字段（true）、覆盖所有字段(false)
//   "enableCustomQuery": true,
//   "customQueryMerge": true, // Query转换 - 追加（true）、覆盖(false)
//   "queryMap": [ // Query转换
//       {
//           "variables": [
//               {
//                   "label": "上下文",
//                   "tag": "对象",
//                   "type": "object",
//                   "selectMode": "tree",
//                   "children": []
//               },
//               {
//                   "label": "系统变量",
//                   "selectMode": "tree",
//                   "tag": "对象",
//                   "type": "object",
//                   "children": [
//                       {
//                           "label": "用户信息",
//                           "value": "user",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "用户ID",
//                                   "value": "user.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "用户名",
//                                   "value": "user.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "手机号",
//                                   "value": "user.phone",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "邮箱",
//                                   "value": "user.email",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "昵称",
//                                   "value": "user.nickName",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "应用信息",
//                           "value": "app",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "应用ID",
//                                   "value": "app.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用名称",
//                                   "value": "app.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "当前运行环境",
//                                   "value": "app.env",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "组织信息",
//                           "value": "company",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "组织ID",
//                                   "value": "company.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "组织名称",
//                                   "value": "company.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用标识",
//                                   "value": "company.key",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       }
//                   ]
//               }
//           ],
//           "targetName": "提交参数1",
//           "sourceName": "111"
//       },
//       {
//           "variables": [
//               {
//                   "label": "上下文",
//                   "tag": "对象",
//                   "type": "object",
//                   "selectMode": "tree",
//                   "children": []
//               },
//               {
//                   "label": "系统变量",
//                   "selectMode": "tree",
//                   "tag": "对象",
//                   "type": "object",
//                   "children": [
//                       {
//                           "label": "用户信息",
//                           "value": "user",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "用户ID",
//                                   "value": "user.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "用户名",
//                                   "value": "user.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "手机号",
//                                   "value": "user.phone",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "邮箱",
//                                   "value": "user.email",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "昵称",
//                                   "value": "user.nickName",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "应用信息",
//                           "value": "app",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "应用ID",
//                                   "value": "app.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用名称",
//                                   "value": "app.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "当前运行环境",
//                                   "value": "app.env",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       },
//                       {
//                           "label": "组织信息",
//                           "value": "company",
//                           "type": "object",
//                           "tag": "对象",
//                           "disabled": false,
//                           "children": [
//                               {
//                                   "label": "组织ID",
//                                   "value": "company.id",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "组织名称",
//                                   "value": "company.name",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               },
//                               {
//                                   "label": "应用标识",
//                                   "value": "company.key",
//                                   "type": "string",
//                                   "tag": "文本",
//                                   "disabled": false
//                               }
//                           ]
//                       }
//                   ]
//               }
//           ],
//           "targetName": "提交参数2",
//           "sourceName": "222"
//       }
//   ],
//   "enableCustomOutput": false, // 返回结果转换 true/ false
//   "customOutputMerge": true, // 转换模式 （追加/true、 覆盖/false）
//    "outputTransform": [ // 转换模式数组
//       {
//           "originType": "json",
//           "method": "json-key",
//           "jsonKey": "aaa",
//           "targetName": "bbb"
//       },
//       {
//           "originType": "xml",
//           "method": "json-query",
//           "jsonQuery": "ccc",
//           "targetName": "ddd"
//       },
//       {
//           "originType": "json",
//           "method": "tpl",
//           "tpl": "eee",
//           "targetName": "fff",
//           "toJSON": false // 将结果转成 JSON
//       },
//       {
//           "originType": "string",
//           "method": "regex",
//           "regex": "title:(.a)",
//           "regexFlag": "im",
//           "targetName": "ggg"
//       }
//   ],
//   "enableResponseAdaptor": false, // 返回结果适配 true/false
//   "responseAdaptor": "\nmodule.exports = (responseData) => {\n  // 对 responseData 进行处理，或者返回新的内容\n  return responseData;\n}" // 适配代码
// }

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

    children: [],
    method: 'get',
    authType: 'none'
  }
}
