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
  { label: '等于', value: 'eq', usedFieldType: ['int', 'text', 'date'] },
  { label: '不等于', value: 'ne', usedFieldType: ['int', 'text', 'date'] },
  { label: '模糊匹配', value: 'like', usedFieldType: ['text'] },
  { label: '匹配开头', value: 'sw', usedFieldType: ['text'] },
  { label: '匹配结尾', value: 'ew', usedFieldType: ['text'] },
  { label: '小于', value: 'lt', usedFieldType: ['int', 'date'] },
  { label: '小于或等于', value: 'le', usedFieldType: ['int', 'date'] },
  { label: '大于', value: 'gt', usedFieldType: ['int', 'date'] },
  { label: '大于或等于', value: 'ge', usedFieldType: ['int', 'date'] },
  { label: '范围匹配', value: 'bt', usedFieldType: ['date'] },
  { label: '包含', value: 'in', usedFieldType: ['date'] }
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
