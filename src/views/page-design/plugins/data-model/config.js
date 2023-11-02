import { defineFormFieldConfig, defineTableFieldConfig, generateFieldList } from "@cip/utils/config-util.js";

export const formField = generateFieldList(defineFormFieldConfig({
  fields: {
    type: 'table',
    tableColumnStatus: 'writable',
    options: generateFieldList(defineTableFieldConfig({
      ename: {
        label: '英文名称',
        required: true,
        regexpValidate: /^[a-zA-Z_$][0-9a-zA-Z_$]+$/,
        regexpValidateErrorMessage: '变量名只能以字母、下划线、$开头，允许输入数字、字母、下划线、$'
      },
      name: {
        required: true,
        label: '中文名称'
      },
      type: {
        label: '类型',
        type: 'select',
        required: true,
        withObject: true,
        otherKey: 'typeInfo',
        options: [
          {
            label: '数字',
            value: 'number',
            transFrom(val) {
              return Number(val)
            },
            validate(val) {
              return !isNaN(Number(val))
            },
            errorMsg: '请输入合法数字'
          },
          { 
            label: '字符串',
            value: 'string',
            transFrom(val) {
              return val
            },
            validate(val) {
              return true
            },
          },
          {
            label: '对象',
            value: 'object',
            transFrom(val) {
              return JSON.parse(val)
            },
            validate(val) {
              try {
                JSON.parse(val)
                return true
              } catch (error) {
                return false
              }
            },
            errorMsg: '请输入合法对象'
          },
          {
            label: '数组',
            value: 'array',
            transFrom(val) {
              console.log(val, 'kkk');
              return JSON.parse(val)
            },
            validate(val) {
              try {
                return Array.isArray(JSON.parse(val))
              } catch (error) {
                return false
              }
            },
            errorMsg: '请输入合法数组'
          },
        ]
      },
      data: {
        label: '值',
        required: true,
        dependOn: ['typeInfo'],
        customValidators: [
          function validateValue(val, { typeInfo }) {
            if (!typeInfo) {
              return {
                data: true
              }
            }
            return {
              data: typeInfo.validate(val),
              message: typeInfo.errorMsg
            }
          }
        ]
      },
    }))
  }
}))
