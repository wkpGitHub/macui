import { generateFieldList, defineFormFieldConfig } from 'd-render'
import { cloneDeep } from 'lodash-es'

// {
//   "id": "07fe2a170cee",
//   "rootId": "07fe2a170cee",
//   "type": "auto-entity-delete-records",
//   "x": -48.5,
//   "y": 542.5546875,
//   "title": "删除记录", // 节点名称
//   "objectType": "model",
//   "filterMode": "normal", // 类型选择，普通模式、高级模式
//   "form": {
//       "title": "user",
//       "description": "",
//       "fields": [
//           {
//               "id": "userid",
//               "fid": "1d62719d-f46a-4853-9af7-b0c8f2a2fce6",
//               "label": "ID",
//               "type": "int",
//               "name": "id",
//               "isPrimayKey": true,
//               "tag": "数字",
//               "typeLabel": "自增序号"
//           },
//           {
//               "id": "user客户编码",
//               "fid": "1c4ab77c-e02a-4716-b640-ad1e224bab77",
//               "label": "客户编码",
//               "type": "text",
//               "name": "客户编码",
//               "isNullable": true,
//               "tag": "文本",
//               "typeLabel": "单行文本"
//           }
//       ],
//       "relationFields": [],
//       "originRelation": [],
//       "label": "user",
//       "value": "user"
//   },
//   "fields": [
//       {
//           "id": "userid",
//           "fid": "1d62719d-f46a-4853-9af7-b0c8f2a2fce6",
//           "label": "ID",
//           "type": "int",
//           "name": "id",
//           "isPrimayKey": true,
//           "tag": "数字",
//           "typeLabel": "自增序号"
//       },
//       {
//           "id": "user客户编码",
//           "fid": "1c4ab77c-e02a-4716-b640-ad1e224bab77",
//           "label": "客户编码",
//           "type": "text",
//           "name": "客户编码",
//           "isNullable": true,
//           "tag": "文本",
//           "typeLabel": "单行文本"
//       }
//   ],
//   "relationFields": [],
//   "filterFields": {
//       "id": "0ee448dc20fa",
//       "conjunction": "and",
//       "children": [
//           {
//               "id": "d243e7dde0e8",
//               "left": {
//                   "type": "field",
//                   "field": "客户编码"
//               },
//               "op": "equal",
//               "right": "222"
//           }
//       ]
//   },
//   "objectKey": "model:user" // 删除对象，每个删除对象对应不同fields
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
  category: '自动节点',
  type: 'auto-entity-delete-records',
  title: '删除记录',
  formField: generateFieldList(defineFormFieldConfig({
    _staticInfo: { type: 'staticInfo', staticInfo: '节点信息', ...staticInfoStyle },
    title: { label: '节点名称' },
    objectKey: {
      type: 'dataSource',
      label: '删除对象',
      required: true,
      otherKey: 'fields'
    },
    _staticInfo2: { type: 'staticInfo', staticInfo: '筛选条件', ...staticInfoStyle },
    filterMode: {
      dependOn: ['objectKey'],
      readable: false,
      changeConfig (config, { objectKey }) {
        config.writable = !!objectKey
        return config
      },
      label: '类型选择',
      type: 'radio',
      defaultValue: 'normal',
      options: [
        { label: '普通模式', value: 'normal' },
        { label: '高级模式', value: 'advanced' }
      ]
    },
    filterFields: {
      type: 'filterCondition',
      dependOn: ['objectKey', 'fields'],
      readable: false,
      changeConfig (config, { objectKey, fields }) {
        config.writable = !!objectKey
        config.options = cloneDeep(fields || [])
        return config
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'auto-entity-delete-records',
    title: '删除记录'
  }
}
