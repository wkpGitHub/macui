import { generateFieldList, defineTableFieldConfig, defineFormFieldConfig } from 'd-render'
import { computed } from 'vue'
// 前端form-input类型与字段类型的一个映射

// 字段 type: int  op [equal|not_equal|less|less_or_equal|greater|greater_or_equal|is_empty|is_not_empty]
// 字段 type: text  op [equal|not_equal|like|not_like|starts_with|ends_with|is_empty|is_not_empty]
// 字段 type: date  op [equal|not_equal|less|less_or_equal|greater|greater_or_equal|between|not_between]
const opOptions = [
  { label: '等于', value: 'eq', usedFieldType: ['INT', 'BIGINT', 'DOUBLE', 'DECIMAL', 'TIMESTAMP', 'STRING', 'TEXT', 'ENTITY', 'POJO', 'DIC', 'BOOLEAN', 'DATE', 'TIME', 'DATETIME'] },
  { label: '不等于', value: 'ne', usedFieldType: ['INT', 'BIGINT', 'DOUBLE', 'DECIMAL', 'TIMESTAMP', 'STRING', 'TEXT', 'ENTITY', 'POJO', 'DIC', 'BOOLEAN', 'DATE', 'TIME', 'DATETIME'] },
  { label: '模糊匹配', value: 'like', usedFieldType: ['STRING', 'TEXT', 'ENTITY', 'POJO', 'DIC'] },
  { label: '匹配开头', value: 'sw', usedFieldType: ['STRING', 'TEXT', 'ENTITY', 'POJO', 'DIC'] },
  { label: '匹配结尾', value: 'ew', usedFieldType: ['STRING', 'TEXT', 'ENTITY', 'POJO', 'DIC'] },
  { label: '小于', value: 'lt', usedFieldType: ['INT', 'BIGINT', 'DOUBLE', 'DECIMAL', 'TIMESTAMP', 'DATE', 'TIME', 'DATETIME'] },
  { label: '小于或等于', value: 'le', usedFieldType: ['INT', 'BIGINT', 'DOUBLE', 'DECIMAL', 'TIMESTAMP', 'DATE', 'TIME', 'DATETIME'] },
  { label: '大于', value: 'gt', usedFieldType: ['INT', 'BIGINT', 'DOUBLE', 'DECIMAL', 'TIMESTAMP', 'DATE', 'TIME', 'DATETIME'] },
  { label: '大于或等于', value: 'ge', usedFieldType: ['INT', 'BIGINT', 'DOUBLE', 'DECIMAL', 'TIMESTAMP', 'DATE', 'TIME', 'DATETIME'] },
  { label: '范围匹配', value: 'bt', usedFieldType: ['DATE', 'TIME', 'DATETIME'] },
  { label: '包含', value: 'in', usedFieldType: ['DATE', 'TIME', 'DATETIME'] }
]

// const needHide = ['is_empty', 'is_not_empty']
// const needRange = ['between', 'not_between']
export function getTableColumn (props) {
  return computed(() => {
    return generateFieldList(defineTableFieldConfig({
      field: {
        outDependOn: ['fields'],
        dynamic: true,
        type: 'select',
        writable: true,
        withObject: true,
        otherKey: 'left',
        optionProps: { label: 'title', value: 'name' },
        asyncOptions: (_, { fields }) => {
          return (fields || [])
        }
      },
      op: {
        dynamic: true,
        writable: true,
        dependOn: ['left'],
        type: 'select',
        defaultValue: 'eq',
        asyncOptions ({ left }) {
          return opOptions.filter(v => v.usedFieldType.includes(left?.dataType))
        }
      },
      value: {
        writable: true,
        type: 'setFx',
        dependOn: ['field'],
        changeValue ({ field }) {
          const _item = props.config.parentState.rootNode.inputParams.find(p => p.name === field)
          if (_item) {
            return {
              value: [{
                type: 'var',
                desc: _item.title,
                value: `inputParams.${_item.name}`
              }]
            }
          }
        }
      }
    }))
  })
}

export const fieldList = generateFieldList(defineFormFieldConfig({
  logic: {
    label: '逻辑条件',
    type: 'radio',
    options: [{ label: '且', value: 'and' }, { label: '或', value: 'or' }]
  }
}))
