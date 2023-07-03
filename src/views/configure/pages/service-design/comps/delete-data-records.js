import { generateFieldList, defineFormFieldConfig } from 'd-render'
// 删除记录简单模式
// {
//   "id": "0c829f0887b0",
//   "type": "delete-data-records",
//   "title": "删除记录",
//   "conditions": {},
//   "validateFailed": false,
//   "children": [],
//   "objectKey": "model:product",  // 数据源，每个数据源对应不同fields
//   "filterMode": "normal",  // 类型选择，简单模式、复杂模式
//   "filterFields": {
//       "id": "de64fd9fdcb8",
//       "conjunction": "and",  // 且/或 and/or
//       "children": [
//           {
//               "id": "3578bb9313c7",
//               "left": {
//                   "type": "field",
//                   "field": "产品编号"
//               },
//               "op": "equal",
//               "right": "11111"
//           },
//           {
//               "id": "78179e5840d8",
//               "left": {
//                   "type": "field",
//                   "field": "成本价"
//               },
//               "op": "not_equal",
//               "right": 200
//           }
//       ]
//   },
//   "fields": [
//       {
//           "id": "productid",
//           "fid": "71a4ab25-1b6a-4460-9580-e3b3f401e286",
//           "label": "ID",
//           "type": "int",
//           "name": "id",
//           "isPrimayKey": true,
//           "tag": "数字",
//           "typeLabel": "自增序号"
//       },
//       {
//           "id": "product产品编号",
//           "fid": "2c55d585-a960-45a6-93d2-b263f0cb8468",
//           "label": "产品编号",
//           "type": "text",
//           "name": "产品编号",
//           "isNullable": true,
//           "tag": "文本",
//           "typeLabel": "单行文本"
//       }
//   ]
// }

// 复杂模式 筛选条件数据结构
// filterFields: {
//   "id": "c6eb16a5bbd6",
//   "conjunction": "and",
//   "children": [
//       {
//           "id": "a5c2913d3c0c",
//           "left": {
//               "type": "field",
//               "field": "产品编号"
//           },
//           "op": "equal",
//           "right": "1111"
//       },
//       {
//           "id": "dcb48c9e6513",
//           "conjunction": "or",
//           "children": [
//               {
//                   "id": "f38874664851",
//                   "left": {
//                       "type": "field",
//                       "field": "产品分类"
//                   },
//                   "op": "like",
//                   "right": "333"
//               }
//           ]
//       },
//       {
//           "id": "3f6b869a0901",
//           "left": {
//               "type": "field",
//               "field": "产品规格"
//           },
//           "op": "is_not_empty"
//       }
//   ]
// }

export default {
  category: '实体活动',
  type: 'delete-data-records',
  title: '删除记录',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    objectKey: {
      type: 'select',
      label: '数据源',
      required: true,
      otherKey: 'fields'
    },
    filterMode: {
      dependOn: ['objectKey'],
      readable: false,
      changeConfig (config, { objectKey }) {
        config.writable = !!objectKey
        return config
      },
      label: '新增模式',
      required: true,
      type: 'radio',
      defaultValue: 'normal',
      options: [
        { label: '简单模式', value: 'normal' },
        { label: '复杂模式', value: 'advanced' }
      ]
    },
    filterFields: {
      type: 'filterCondition',
      dependOn: ['objectKey', 'fields'],
      readable: false,
      changeConfig (config, { objectKey, fields }) {
        config.writable = !!objectKey
        config.options = fields || []
        return config
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'delete-data-records',
    title: '删除记录',
    conditions: {},
    children: []
  }
}
