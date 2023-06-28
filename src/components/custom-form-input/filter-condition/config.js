import { generateFieldList, defineTableFieldConfig } from 'd-render'

// 前端form-input类型与字段类型的一个映射
const typeMap = {
  int: 'number',
  text: 'input',
  date: 'date'
}

// 字段 type: int  op [equal|not_equal|less|less_or_equal|greater|greater_or_equal|is_empty|is_not_empty]
// 字段 type: text  op [equal|not_equal|like|not_like|starts_with|ends_with|is_empty|is_not_empty]
// 字段 type: date  op [equal|not_equal|less|less_or_equal|greater|greater_or_equal|between|not_between]
const opOptions = [
  { label: '等于', value: 'equal', usedFieldType: ['int', 'text', 'date'] },
  { label: '不等于', value: 'not_equal', usedFieldType: ['int', 'text', 'date'] },
  { label: '模糊匹配', value: 'like', usedFieldType: ['text'] },
  { label: '不匹配', value: 'not_like', usedFieldType: ['text'] },
  { label: '匹配开头', value: 'starts_with', usedFieldType: ['text'] },
  { label: '匹配结尾', value: 'ends_with', usedFieldType: ['text'] },
  { label: '小于', value: 'less', usedFieldType: ['int', 'date'] },
  { label: '小于或等于', value: 'less_or_equal', usedFieldType: ['int', 'date'] },
  { label: '大于', value: 'greater', usedFieldType: ['int', 'date'] },
  { label: '大于或等于', value: 'greater_or_equal', usedFieldType: ['int', 'date'] },
  { label: '为空', value: 'is_empty', usedFieldType: ['int', 'text'] },
  { label: '不为空', value: 'is_not_empty', usedFieldType: ['int', 'text'] },
  { label: '属于范围', value: 'between', usedFieldType: ['date'] },
  { label: '不属于范围', value: 'not_between', usedFieldType: ['date'] }
]

const needHide = ['is_empty', 'is_not_empty']
const needRange = ['between', 'not_between']
export function getTableColumn (options, optionProps) {
  return generateFieldList(defineTableFieldConfig({
    field: {
      label: '123423',
      type: 'select',
      writable: true,
      withObject: true,
      otherKey: 'left',
      optionProps: { label: 'ename', value: 'name' } || optionProps.value,
      options: options.value
    },
    op: {
      dynamic: true,
      readable: false,
      dependOn: ['left'],
      type: 'select',
      options: [],
      changeConfig (config, { left }) {
        if (left.type) {
          config.writable = true
          config.options = opOptions.filter(v => v.usedFieldType.includes(left.type))
        } else {
          config.readable = false
        }
        return config
      }
    },
    right: {
      dynamic: true,
      readable: false,
      dependOn: ['left', 'op'],
      changeConfig (config, { left, op }) {
        if (left.type) {
          config.type = typeMap[left.type]
          if (needHide.includes(op)) {
            config.readable = false
          } else {
            config.writable = true
          }
          if (needRange.includes(op)) {
            config.type = config.type + 'Range'
          }
        } else {
          config.readable = false
        }
        return config
      }
    }
  }))
}
