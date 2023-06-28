import { generateFieldList, defineFormFieldConfig } from 'd-render'
import { cloneDeep } from 'lodash-es'

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
      defaultValue: 'single',
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
      resetValue: true,
      changeConfig (config, { fields }) {
        config.writable = !!fields
        config.options = cloneDeep(fields || [])
        return config
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
        config.options = cloneDeep(fields || [])
        return config
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
    orderMode: {
      label: '排序规则',
      dependOn: ['selectType', 'objectKey'],
      readable: false,
      changeConfig (config, { selectType, objectKey }) {
        config.writable = selectType === 'multi' && objectKey
        return config
      },
      type: 'radio',
      defaultValue: 'fixed',
      options: [
        { label: '固定排序', value: 'fixed' },
        { label: '动态排序', value: 'dynamic' }
      ]
    },
    orderFields: {
      readable: false,
      dependOn: ['selectType', 'orderMode', 'objectKey', 'fields'],
      changeConfig (config, { selectType, orderMode, objectKey, fields }) {
        config.writable = (selectType === 'multi') && (orderMode === 'fixed') && objectKey
        config.options = cloneDeep(fields || [])
        return config
      },
      label: '',
      type: 'sortField'
    },
    orderParams: {
      dependOn: ['selectType', 'orderMode', 'objectKey'],
      readable: false,
      changeConfig (config, { selectType, orderMode, objectKey }) {
        console.log(orderMode)
        config.writable = (selectType === 'multi') && (orderMode === 'dynamic') && objectKey
        console.log(config.writable, 'config.writable')
        return config
      },
      label: '排序参数'
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
    skip: {
      label: '起始偏移量',
      dependOn: ['selectType'],
      readable: false,
      changeConfig (config, { selectType }) {
        config.writable = selectType === 'multi'
        return config
      }
    },
    perPage: {
      label: '每页数量',
      dependOn: ['selectType'],
      readable: false,
      changeConfig (config, { selectType }) {
        config.writable = selectType === 'multi'
        return config
      }
    },
    page: {
      label: '查询页',
      dependOn: ['selectType'],
      readable: false,
      changeConfig (config, { selectType }) {
        config.writable = selectType === 'multi'
        return config
      }
    },
    maxCount: {
      label: '记录总行数',
      dependOn: ['selectType'],
      readable: false,
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
    conditions: {},
    children: []
  }
}
