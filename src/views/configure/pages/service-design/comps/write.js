import { generateFieldList, defineFormFieldConfig } from 'd-render'

// {
//   "id": "8d0787c92073",
//   "rootId": "8d0787c92073",
//   "type": "write",
//   "x": -48.5,
//   "y": 204.75,
//   "label": "填写节点", // 节点名称
//   "objectType": "model",
//   "processStrategy": "serial", // 多人处理策略
//   "submitRule": "submit", // 提交规则 type:select
//   "actionGroup": "1",   // 流程操作权限 required: true  ,type: select  值对应actionGroups 数组每条数据的id
//   "form": {
//       "label": "user",
//       "title": "user",
//       "value": "user",
//       "fields": [
//           {
//               "id": "user客户编码",
//               "fid": "1c4ab77c-e02a-4716-b640-ad1e224bab77",
//               "tag": "文本",
//               "name": "客户编码",
//               "type": "text",
//               "label": "客户编码",
//               "typeLabel": "单行文本",
//               "isNullable": true
//           },
//           {
//               "id": "user客户名称",
//               "fid": "d55b7a4d-a8ff-46b6-9072-9594b772f0d3",
//               "tag": "文本",
//               "name": "客户名称",
//               "type": "text",
//               "label": "客户名称",
//               "typeLabel": "单行文本",
//               "isNullable": true
//           }
//       ],
//       "description": "",
//       "originRelation": [],
//       "relationFields": []
//   },
//   "fields": [
//       {
//           "id": "user客户编码",
//           "fid": "1c4ab77c-e02a-4716-b640-ad1e224bab77",
//           "tag": "文本",
//           "name": "客户编码",
//           "type": "text",
//           "label": "客户编码",
//           "typeLabel": "单行文本",
//           "isNullable": true
//       },
//       {
//           "id": "user客户名称",
//           "fid": "d55b7a4d-a8ff-46b6-9072-9594b772f0d3",
//           "tag": "文本",
//           "name": "客户名称",
//           "type": "text",
//           "label": "客户名称",
//           "typeLabel": "单行文本",
//           "isNullable": true
//       }
//   ],
//   "relationFields": [],
//   "originRelation": [],
//   "objectKey": "model:user", // 选择对象 ，required: true
//   "fieldAclGroup": "92278184b573", // 字段操作权限  required: true , type: select
//   "transactor": [ // 处理人， required: true
//       {
//           "uid": "pdm@citycloud.com.cn",
//           "desc": "城云科技(中国)有限公司",
//           "icon": "",
//           "name": "pdm",
//           "type": "user",
//           "email": "pdm@citycloud.com.cn",
//           "isRef": true,
//           "label": "pdm",
//           "phone": "18957146709",
//           "value": "pdm@citycloud.com.cn",
//           "avatar": "",
//           "nickName": "pdm",
//           "userType": 0,
//           "username": "",
//           "department": "城云科技(中国)有限公司",
//           "scopeLabel": "人员："
//       }
//   ],
//   "outputParamName": "填写节点_1fab", // 参数名称
//   "formViewBody": [ // (表单视图 type: select) 对应 option的 body
//       {
//           "id": "u:8d0c83332aa7",
//           "name": "客户编码",
//           "type": "input-text",
//           "label": "客户编码",
//           "required": false,
//           "validations": {},
//           "validationErrors": {}
//       },
//       {
//           "id": "u:67234517d8d0",
//           "name": "客户名称",
//           "type": "input-text",
//           "label": "客户名称",
//           "required": false,
//           "validations": {},
//           "validationErrors": {}
//       }
//   ],
//   "formView": "d35ABeDfNCmoCQ1r9asRrk", // (表单视图 type: select) , 对应option的value
//   "taskTitle": "${开始_d037[0].id}${开始_d037[0].客户名称}" // 任务标题
// }

export default {
  category: '人工节点',
  type: 'write',
  title: '填写节点',
  formField: generateFieldList(defineFormFieldConfig({
    label: { label: '节点名称' },
    objectKey: {
      type: 'dataSource',
      label: '选择对象',
      required: true,
      otherKey: 'fields'
    },
    taskTitle: { label: '任务标题' },
    formView: {
      label: '表单视图',
      type: 'select',
      dependOn: ['fields']
    },
    transactor: {
      label: '处理人',
      required: true
    },
    processStrategy: {
      label: '多人处理策略',
      type: 'radio',
      required: true,
      options: [
        { label: '串行填写一条记录、', value: 'serial' },
        { label: '并行填写多条记录', value: 'parallel' }
      ]
    },
    fieldAclGroup: {
      label: '字段操作权限',
      type: 'select',
      required: true,
      dependOn: ['fields'],
      changeConfig (config, { fields }) {
        config.disabled = !!fields
        return config
      }
    },
    actionGroup: {
      label: '流程操作权限',
      type: 'select',
      required: true
    },
    submitRule: {
      label: '提交规则',
      type: 'select',
      options: [
        { label: '提交', value: 'submit' },
        { label: '不提交', value: 'unsubmit' }
      ]
    },
    outputParamName: {
      label: '参数名称',
      dependOn: ['label']
    }
  })),
  initData: {
    id: '',
    type: 'write',
    title: '填写节点'
  }
}
