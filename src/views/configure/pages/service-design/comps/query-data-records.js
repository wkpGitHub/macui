import { generateFieldList, defineFormFieldConfig } from 'd-render'
import { cloneDeep } from 'lodash-es'

// {
//   "id": "850cae9f30a7",
//   "type": "query-data-records",
//   "title": "查询记录",
//   "conditions": {},
//   "validateFailed": false,
//   "children": [],
//   "targetName": "节点出参222", // 节点出参
//   "objectKey": "model:product",   // 数据源
//   "selectType": "multi", // 查询记录-单条、多条
//   "filterMode": "advanced", // 筛选条件- 简单、复杂
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
//       },
//       {
//           "id": "product产品名称",
//           "fid": "ccdd52dd-d893-4d63-8c33-8045374a9f6c",
//           "label": "产品名称",
//           "type": "text",
//           "name": "产品名称",
//           "isNullable": true,
//           "tag": "文本",
//           "typeLabel": "单行文本"
//       },
//       {
//           "id": "product产品分类",
//           "fid": "c4dae29d-3dec-4782-a1d6-6a950505345d",
//           "label": "产品分类",
//           "type": "text",
//           "name": "产品分类",
//           "isNullable": true,
//           "tag": "文本",
//           "typeLabel": "单行文本"
//       },
//       {
//           "id": "product产品规格",
//           "fid": "1f776103-e5f1-4767-8271-a05df446156d",
//           "label": "产品规格",
//           "type": "text",
//           "name": "产品规格",
//           "isNullable": true,
//           "tag": "文本",
//           "typeLabel": "单行文本"
//       },
//       {
//           "id": "product产品单位",
//           "fid": "d388f4df-a6af-4363-a264-abfd2204a002",
//           "label": "产品单位",
//           "type": "text",
//           "name": "产品单位",
//           "isNullable": true,
//           "tag": "文本",
//           "typeLabel": "单行文本"
//       },
//       {
//           "id": "product产品图片",
//           "fid": "5d1bcd74-d042-45aa-b768-f991a13ef160",
//           "label": "产品图片",
//           "type": "image",
//           "name": "产品图片",
//           "isNullable": true,
//           "tag": "图片",
//           "typeLabel": "图片"
//       },
//       {
//           "id": "product销售价",
//           "fid": "219d0eec-5398-46c8-936b-2764f53a51df",
//           "label": "销售价",
//           "type": "float",
//           "name": "销售价",
//           "isNullable": true,
//           "tag": "小数",
//           "typeLabel": "浮点数（Float）"
//       },
//       {
//           "id": "product成本价",
//           "fid": "97394694-5e39-43a7-87a4-047b13881608",
//           "label": "成本价",
//           "type": "float",
//           "name": "成本价",
//           "isNullable": true,
//           "tag": "小数",
//           "typeLabel": "浮点数（Float）"
//       },
//       {
//           "id": "product产品简介",
//           "fid": "a1bc1622-1a3c-4a8d-958d-d11cb52d3739",
//           "label": "产品简介",
//           "type": "textarea",
//           "name": "产品简介",
//           "isNullable": true,
//           "tag": "多行文本",
//           "typeLabel": "多行文本"
//       }
//   ],
//   "relationFields": [],
//   "totalFields": [],
//   "selectField": [ // 查询字段
//       {
//           "label": "产品名称",
//           "alias": "产品名称",
//           "isNullable": true,
//           "weight": -1,
//           "orderType": "ASC",
//           "type": "text",
//           "name": "产品名称",
//           "key": "产品名称",
//           "level": 2
//       },
//       {
//           "label": "产品编号",
//           "alias": "产品编号",
//           "isNullable": true,
//           "weight": -1,
//           "orderType": "ASC",
//           "type": "text",
//           "name": "产品编号",
//           "key": "产品编号",
//           "level": 2
//       }
//   ],
//   "filterFields": { // 筛选条件
//       "id": "2cb99ca6259d",
//       "conjunction": "and",
//       "children": [
//           {
//               "id": "d0323fef8824",
//               "left": {
//                   "type": "field",
//                   "field": "产品编号"
//               },
//               "op": "equal",
//               "right": "111"
//           },
//           {
//               "id": "58f0458fc0bc",
//               "conjunction": "and",
//               "children": [
//                   {
//                       "id": "988f2fc371b8",
//                       "left": {
//                           "type": "field",
//                           "field": "产品名称"
//                       },
//                       "op": "not_equal",
//                       "right": "333"
//                   }
//               ]
//           }
//       ]
//   },
//   "orderFields": [ // 排序设置
//       {
//           "label": "产品编号",
//           "alias": "产品编号",
//           "isNullable": true,
//           "weight": -1,
//           "orderType": "ASC",
//           "type": "text",
//           "name": "产品编号",
//           "key": "产品编号",
//           "level": 2
//       },
//       {
//           "label": "产品名称",
//           "alias": "产品名称",
//           "isNullable": true,
//           "weight": -1,
//           "orderType": "DESC",
//           "type": "text",
//           "name": "产品名称",
//           "key": "产品名称",
//           "level": 2
//       }
//   ],
//   "orderParams": "", // 动态排序-排序参数（请绑定动态排序参数，注意动态排序参数为数组，支持多字段排序。动态字段排序规则，数据格式如下：[{"orderBy": "xxx", "orderDir": "xxx"}, ..., {"orderBy": "xxx", "orderDir": "xxx"},]）
//   "orderMode": "fixed", // 排序规则-固定排序(fixed)、动态排序(dynamic)
//   "maxCount": "200", // 分页设置-记录行总数
//   "skip": "100", // 分页设置-起始偏移量
//   "perPage": "10", // 分页设置-每页数量
//   "page": "1",  // 分页设置-查询页
//   "orderBy": "id",
//   "orderType": ""
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
  category: '实体活动',
  type: 'query-data-records',
  title: '查询记录',
  formField: generateFieldList(defineFormFieldConfig({
    _staticInfo: { type: 'staticInfo', staticInfo: '基本信息', ...staticInfoStyle },
    title: { label: '节点标题' },
    objectKey: {
      type: 'dataSource',
      label: '数据源',
      required: true,
      otherKey: 'fields'
    },
    selectType: {
      label: '查询记录',
      type: 'radio',
      defaultValue: 'multi',
      options: [
        { label: '单条记录', value: 'single' },
        { label: '多条记录', value: 'multi' }
      ]
    },
    targetName: { label: '节点出参', required: true },
    _staticInfo1: {
      type: 'staticInfo',
      dependOn: ['objectKey'],
      readable: false,
      changeConfig (config, { objectKey }) {
        config.writable = !!objectKey
        return config
      },
      staticInfo: '查询字段',
      ...staticInfoStyle
    },
    selectFields: {
      type: 'selectField',
      label: '',
      readable: false,
      dependOn: ['fields'],
      changeConfig (config, { fields }) {
        config.writable = !!fields
        return config
      },
      asyncOptions ({ fields }) {
        return cloneDeep(fields || [])
      }
    },
    _staticInfo2: {
      type: 'staticInfo',
      dependOn: ['objectKey'],
      readable: false,
      changeConfig (config, { objectKey }) {
        config.writable = !!objectKey
        return config
      },
      staticInfo: '筛选条件',
      ...staticInfoStyle
    },
    filterMode: {
      dependOn: ['objectKey'],
      readable: false,
      changeConfig (config, { objectKey }) {
        config.writable = !!objectKey
        return config
      },
      required: true,
      type: 'radio',
      defaultValue: 'normal',
      options: [
        { label: '简单模式', value: 'normal' },
        { label: '表达式', value: 'fx' }
      ]
    },
    filterFields: {
      type: 'filterCondition',
      dependOn: ['objectKey', 'fields', 'filterMode'],
      readable: false,
      changeConfig (config, { objectKey, fields, filterMode }) {
        config.writable = !!objectKey
        config.type = filterMode === 'fx' ? 'setFx' : 'filterCondition'
        config.options = cloneDeep(fields || [])
        return config
      },
      changeValue ({ filterMode }) {
        let value = {
          logic: 'and',
          children: []
        }
        if (filterMode === 'fx') {
          value = []
        }
        return { value }
      }
    },
    _staticInfo3: {
      type: 'staticInfo',
      dependOn: ['selectType', 'objectKey'],
      readable: false,
      changeConfig (config, { selectType, objectKey }) {
        config.writable = selectType === 'multi' && objectKey
        return config
      },
      staticInfo: '排序设置',
      ...staticInfoStyle
    },
    orderFields: {
      dependOn: ['selectType', 'objectKey', 'fields'],
      readable: false,
      changeConfig (config, { selectType, objectKey }) {
        config.writable = selectType === 'multi' && objectKey
        return config
      },
      label: '',
      type: 'sortField',
      asyncOptions ({ fields }) {
        return cloneDeep(fields || [])
      }
    },
    _staticInfo4: {
      type: 'staticInfo',
      dependOn: ['selectType'],
      readable: false,
      changeConfig (config, { selectType }) {
        config.writable = selectType === 'multi'
        return config
      },
      staticInfo: '分页设置',
      ...staticInfoStyle
    },
    usePage: {
      label: '分页查询',
      type: 'radio',
      dependOn: ['selectType'],
      defaultValue: true,
      readable: false,
      options: [{ label: '是', value: true }, { label: '否', value: false }],
      changeConfig (config, { selectType }) {
        config.writable = selectType === 'multi'
        return config
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'query-data-records',
    title: '查询记录',
    children: []
  }
}
