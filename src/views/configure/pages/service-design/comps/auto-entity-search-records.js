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
  category: '自动节点',
  type: 'auto-entity-search-records',
  title: '查询记录',
  formField: generateFieldList(defineFormFieldConfig({
    _staticInfo: { type: 'staticInfo', staticInfo: '节点信息', ...staticInfoStyle },
    title: { label: '节点名称', defaultValue: '查询记录' },
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
      readable: false,
      changeConfig (config, { fields, selectType }) {
        if (selectType === 'multi') {
          config.writable = true
          config.options = cloneDeep(fields || [])
          return config
        }
      }
    },
    orderType: {
      label: '顺序设置',
      type: 'select',
      options: [
        { label: '升序', value: 'ASC' },
        { label: '降序', value: 'DESC' }
      ],
      readable: false,
      dependOn: ['selectType'],
      changeConfig (config, { selectType }) {
        if (selectType === 'multi') {
          config.writable = selectType === 'multi'
          return config
        }
      }
    },
    _staticInfo5: {
      type: 'staticInfo',
      staticInfo: '分页设置',
      ...staticInfoStyle,
      dependOn: ['selectType'],
      readable: false,
      changeConfig (config, { selectType }) {
        if (selectType === 'multi') {
          config.writable = selectType === 'multi'
          return config
        }
      }
    },
    maxCount: {
      label: '最大查询数量',
      dependOn: ['selectType'],
      readable: false,
      changeConfig (config, { selectType }) {
        if (selectType === 'multi') {
          config.writable = true
          return config
        }
      }
    },
    page: {
      label: '查询页',
      dependOn: ['selectType'],
      readable: false,
      changeConfig (config, { selectType }) {
        if (selectType === 'multi') {
          config.writable = true
          return config
        }
      }
    },
    perPage: {
      label: '每页记录数量',
      dependOn: ['selectType'],
      readable: false,
      changeConfig (config, { selectType }) {
        if (selectType === 'multi') {
          config.writable = true
          return config
        }
      }
    },
    skip: {
      label: '偏移量',
      dependOn: ['selectType'],
      readable: false,
      changeConfig (config, { selectType }) {
        if (selectType === 'multi') {
          config.writable = true
          return config
        }
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
