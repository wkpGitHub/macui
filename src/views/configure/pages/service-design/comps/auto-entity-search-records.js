import { generateFieldList, defineFormFieldConfig } from 'd-render'
import { cloneDeep } from 'lodash-es'

// {
//   "id": "7dc14cf932a6",
//   "rootId": "7dc14cf932a6",
//   "type": "auto-entity-search-records",
//   "x": -48.5,
//   "y": 537.8671875,
//   "title": "查询记录", // 节点名称
//   "objectType": "model",
//   "objectKey": "model:user", // 查询对象
//   "selectType": "multi", // 查询记录-单条、多条
//   "filterMode": "normal",  // 筛选条件- 普通、高级
//   "filterFields": { // 筛选条件
//       "id": "dc4c74b128bb",
//       "conjunction": "and",
//       "children": [
//           {
//               "id": "2fde3ce3629a",
//               "left": {
//                   "type": "field",
//                   "field": "客户编码"
//               },
//               "op": "equal",
//               "right": "222"
//           }
//       ]
//   },
//   "queryFields": [ // 查询字段
//       "客户名称",
//       "客户编码",
//       "开拓日期"
//   ],
//   "orderBy": "开拓日期", // 排序字段
//   "orderType": "ASC", // 顺序设置 - 升序/ASC 、降序/DESC
//   "maxCount": "100", // 最大查询数量
//   "page": "5",  // 查询页
//   "perPage": "10", // 每页记录数量
//   "skip": "20", // 偏移量
//   "outputParamName": "查询记录_6306", // 参数名称
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
//   "originRelation": []
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
  type: 'auto-entity-search-records',
  title: '查询记录',
  formField: generateFieldList(defineFormFieldConfig({
    _staticInfo: { type: 'staticInfo', staticInfo: '节点信息', ...staticInfoStyle },
    title: { label: '节点名称' },
    objectKey: {
      type: 'dataSource',
      label: '查询对象',
      required: true,
      otherKey: 'fields'
    },
    selectType: {
      label: '查询记录',
      type: 'radio',
      defaultValue: 'single',
      options: [
        { label: '单条记录', value: 'single' },
        { label: '多条记录', value: 'multi' }
      ]
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
    },
    _staticInfo3: { type: 'staticInfo', staticInfo: '查询字段', ...staticInfoStyle },
    queryFields: {
      dependOn: ['fields']
    },
    _staticInfo4: {
      type: 'staticInfo',
      staticInfo: '排序设置',
      ...staticInfoStyle,
      dependOn: ['selectType'],
      changeConfig (config, { selectType }) {
        config.readable = selectType === 'multi'
        return config
      }
    },
    orderBy: {
      label: '排序字段',
      type: 'select',
      optionProps: { label: 'label', value: 'name' },
      dependOn: ['fields', 'selectType'],
      changeConfig (config, { fields, selectType }) {
        config.readable = selectType === 'multi'
        config.options = cloneDeep(fields || [])
        return config
      }
    },
    orderType: {
      label: '顺序设置',
      type: 'select',
      options: [
        { label: '升序', value: 'ASC' },
        { label: '降序', value: 'DESC' }
      ],
      dependOn: ['selectType'],
      changeConfig (config, { selectType }) {
        config.readable = selectType === 'multi'
        return config
      }
    },
    _staticInfo5: {
      type: 'staticInfo',
      staticInfo: '分页设置',
      ...staticInfoStyle,
      dependOn: ['selectType'],
      changeConfig (config, { selectType }) {
        config.readable = selectType === 'multi'
        return config
      }
    },
    maxCount: {
      label: '最大查询数量',
      dependOn: ['selectType'],
      changeConfig (config, { selectType }) {
        config.readable = selectType === 'multi'
        return config
      }
    },
    page: {
      label: '查询页',
      dependOn: ['selectType'],
      changeConfig (config, { selectType }) {
        config.readable = selectType === 'multi'
        return config
      }
    },
    perPage: {
      label: '每页记录数量',
      dependOn: ['selectType'],
      changeConfig (config, { selectType }) {
        config.readable = selectType === 'multi'
        return config
      }
    },
    skip: {
      label: '偏移量',
      dependOn: ['selectType'],
      changeConfig (config, { selectType }) {
        config.readable = selectType === 'multi'
        return config
      }
    },
    _staticInfo6: { type: 'staticInfo', staticInfo: '输出参数', ...staticInfoStyle },
    outputParamName: {
      label: '参数名称',
      dependOn: ['title']
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'auto-entity-search-records',
    title: '查询记录'
  }
}
