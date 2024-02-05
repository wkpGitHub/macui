import { defineFormFieldConfig, generateFieldList, defineTableFieldConfig } from 'd-render'
import { cloneDeep } from '@d-render/shared'
import { dataInfoService } from '@/api'
import { basicInfoConfig } from './basic-info'
import { fieldSelectTableColumns, paramsTableEntity, displaysTableColumns } from './table-columns'
import { staticInfoStyle } from '../constant'

const patchArrayByPrimaryKey = (primaryKey, target, source) => {
  const targetKeys = target.map(v => v[primaryKey])
  const sourceKeys = source.map(v => v[primaryKey])
  // 原有的数据中需要删除的数据
  const oldValues = target.filter(v => !sourceKeys.includes(v[primaryKey]))
  // 新加入的数据
  const newValues = source.filter(v => !targetKeys.includes(v[primaryKey]))

  oldValues.forEach(v => {
    const index = target.findIndex(innerValue => innerValue.name === v.name)
    if (index !== -1) {
      target.splice(index, 1)
    }
  })
  target.push(...newValues)

  return target
}

export const guidFormFieldList = generateFieldList(defineFormFieldConfig({
  staticInfo1: { type: 'staticInfo', staticInfo: '基础信息', span: 24, ...staticInfoStyle },
  name: { span: 6 },
  dbId: { span: 6 },
  tableId: { span: 6 },
  remark: { span: 6 },
  divider: { type: 'divider', span: 24 },
  staticInfo2: { type: 'staticInfo', staticInfo: '字段信息', ...staticInfoStyle, span: 24 },
  $fieldSelect: {
    span: 24,
    type: 'table',
    immediateChangeValue: true,
    dependOn: [
      'dbId',
      {
        key: 'tableId',
        effect: {
          changeValue: async ({ dbId, tableId, inputParams = [], $fieldSelect, outParams = [] }) => {
            if (dbId && tableId) {
              const { data } = await dataInfoService.detail({ dbId: dbId, id: tableId })
              const paramsTemp = inputParams.map(i => i.name)
              const displaysTemp = outParams.map(i => i.name)
              const needIsParams = !($fieldSelect?.length)
              const temp = (data?.fields || []).map((v) => {
                return {
                  name: v.name,
                  nullable: v.nullable,
                  remark: v.remark,
                  typeName: v.typeName,
                  markId: v.maskRuleId,
                  permissionRuleId: v.rowRuleId,
                  isParam: needIsParams ? paramsTemp.includes(v.name) : false,
                  isDisplay: needIsParams ? displaysTemp.includes(v.name) : false
                }
              })
              return {
                value: temp
              }
            }
            return {
              value: []
            }
          }
        }
      },
      '$fieldSelect',
      { key: 'inputParams' },
      { key: 'outParams' },
      {
        key: 'paramsReverseChecked',
        effect: {
          changeValue: ({ paramsReverseChecked = '', $fieldSelect }) => {
            const temp = paramsReverseChecked.split(',')
            ;($fieldSelect || []).forEach(i => {
              i.isParam = temp.includes(i.name)
            })
            return {
              value: $fieldSelect || []
            }
          }
        }
      },
      {
        key: 'displaysReverseChecked',
        effect: {
          changeValue: ({ displaysReverseChecked = '', $fieldSelect, outParams }) => {
            const temp = displaysReverseChecked.split(',')
            ;($fieldSelect || []).forEach(i => {
              i.isDisplay = temp.includes(i.name)
            })
            return {
              value: $fieldSelect || []
            }
          }
        }
      }
    ],
    hideAdd: true,
    hideDelete: true,
    options: fieldSelectTableColumns
  },
  staticInfo3: { type: 'staticInfo', staticInfo: '请求参数', span: 24, ...staticInfoStyle },
  inputParams: {
    span: 24,
    type: 'table',
    dependOn: [
      {
        key: '$fieldSelect',
        effect: {
          changeValue: ({ $fieldSelect, inputParams }) => {
            if ($fieldSelect && $fieldSelect.length > 0) {
              const temp = cloneDeep($fieldSelect.filter(v => v.isParam === true)).map(v => {
                v.type = v.typeName
                v.markId = undefined
                return v
              })
              let value = []
              if (!inputParams || inputParams.length === 0) {
                value = temp
              } else {
              // 需要进行比较
                value = patchArrayByPrimaryKey('name', inputParams || [], temp)
              }
              return { value: value }
            } else {
              return { value: [] }
            }
          }
        }
      },
      {
        key: 'tableId',
        effect: {
          changeValue: () => {
            return {
              value: []
            }
          }
        }
      },
      { key: 'inputParams', effect: false }
    ],
    hideAdd: true,
    options: generateFieldList(defineTableFieldConfig({
      name: {},
      type: {},
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
  // 反选
  paramsReverseChecked: {
    hideItem: true,
    dependOn: ['inputParams'],
    changeValue ({ inputParams }) {
      const str = (inputParams || [])
      return {
        value: str.map(v => v.name).join(',')
      }
    }
  },
  staticInfo4: { type: 'staticInfo', staticInfo: '返回参数', ...staticInfoStyle, span: 24 },
  outParams: {
    span: 24,
    required: true,
    requiredErrorMessage: '请设置返回参数',
    dependOn: [
      {
        key: '$fieldSelect',
        effect: {
          changeValue: ({ $fieldSelect, outParams }) => {
            // 需要与当前数据进行对比 不然会无限循环
            if ($fieldSelect && $fieldSelect.length > 0) {
              const temp = cloneDeep($fieldSelect.filter(v => v.isDisplay === true)).map(v => {
                v.permissionRuleId = undefined
                return v
              })
              let value = []
              if (!outParams || outParams.length === 0) {
                value = temp
              } else {
              // 需要进行比较
                value = patchArrayByPrimaryKey('name', outParams || [], temp)
              }
              return { value: value }
            } else {
              return { value: [] }
            }
          }
        }
      },
      {
        key: 'outParams'
      },
      { key: 'tableId', effect: { changeValue: () => ({ value: [] }) } }
    ],
    type: 'table',
    hideAdd: true,
    options: displaysTableColumns
  },
  // 反选
  displaysReverseChecked: {
    hideItem: true,
    dependOn: ['outParams'],
    changeValue ({ outParams }) {
      const str = (outParams || [])
      return {
        value: str.map(v => v.name).join(',')
      }
    }
  }
}), basicInfoConfig)
