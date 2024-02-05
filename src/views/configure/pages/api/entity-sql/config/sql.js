import { defineFormFieldConfig, generateFieldList, defineTableFieldConfig } from 'd-render'
import { basicInfoConfig } from './basic-info'
import { paramsTableEntity, displaysTableColumns } from './table-columns'
import { staticInfoStyle } from '../constant'

export const sqlFormFieldList = generateFieldList(defineFormFieldConfig({
  staticInfo1: { type: 'staticInfo', staticInfo: '基础信息', span: 24, ...staticInfoStyle },
  name: { span: 8 },
  dbId: { span: 8 },
  remark: { span: 8 },
  sql: {
    required: true,
    label: 'Sql语句',
    type: 'sqlInput',
    // type: 'textarea',
    // eslint-disable-next-line no-template-curly-in-string
    description: '书写sql时,比较符左右两侧需要加上空格;占位符格式为 ${变量名称} ，变量名称使用英文',
    descriptionEffect: 'dark',
    span: 24
  },
  _parse: {
    type: 'parseSql',
    span: 24,
    dependOn: ['dbId', 'sql']
  },
  staticInfo3: { type: 'staticInfo', staticInfo: '请求参数', span: 24, ...staticInfoStyle },
  inputParams: {
    type: 'table',
    span: 24,
    defaultValue: [],
    dependOn: [
      { key: 'inputParams' },
      {
        key: '_parse',
        effect: {
          changeValue ({ inputParams, _parse }) {
            const temp = []
            console.log(_parse, '_parse_parse')
            const exitParamNames = (inputParams || []).map(v => v.name)
            ;(_parse.inputParams || []).forEach(v => {
              if (!exitParamNames.includes(v.name)) {
                temp.push(v)
              }
            })
            return {
              value: [...inputParams, ...temp]
            }
          }
        }
      }
    ],
    options: generateFieldList(defineTableFieldConfig({
      name: { writable: true, required: true },
      type: {
        type: 'select',
        writable: true,
        defaultValue: 'STRING',
        clearable: false,
        options: [
          'INTEGER',
          'FLOAT',
          'DOUBLE',
          'LONG',
          'STRING',
          'BOOLEAN',
          'DATE'
        ]
      },
      operator: {
        defaultValue: 'eq'
      },
      nullable: {
        defaultValue: true
      },
      permissionRuleId: {},
      defaultValue: {},
      remark: {}
    }), paramsTableEntity)
  },
  staticInfo4: { type: 'staticInfo', staticInfo: '返回参数', ...staticInfoStyle, span: 24 },
  outParams: {
    span: 24,
    type: 'table',
    required: true,
    requiredErrorMessage: '请设置返回参数',
    hideDelete: true,
    hideAdd: true,
    dependOn: ['_parse'],
    changeValue ({ _parse }) {
      return {
        value: _parse?.outParams || []
      }
    },
    defaultValue: [],
    options: displaysTableColumns
  }
}), basicInfoConfig)
