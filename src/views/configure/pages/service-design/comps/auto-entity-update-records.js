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
  type: 'auto-entity-update-records',
  title: '更新记录',
  formField: generateFieldList(defineFormFieldConfig({
    _staticInfo: { type: 'staticInfo', staticInfo: '节点信息', ...staticInfoStyle },
    title: { label: '节点名称', defaultValue: '更新记录' },
    objectKey: {
      type: 'dataSource',
      label: '更新对象',
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
    type: 'auto-entity-update-records',
    title: '更新记录'
  }
}
