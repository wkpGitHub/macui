import { apiConfigService } from '@/api'
import { defineFormFieldConfig, generateFieldList } from 'd-render'

export const formFieldList = generateFieldList(defineFormFieldConfig({
  name: {
    label: '分类名称',
    required: true,
    limit: 10,
    customValidators: [
      async function (name, { id }) {
        const res = await apiConfigService.checkName({ id, name })
        return res
      }
    ]
  },
  path: {
    label: '路径',
    required: true,
    regexpValidate: /[0-9|a-z|A-Z|-|_]+/g,
    dependOn: ['id'],
    regexpValidateErrorMessage: '只支持数字、字母、下划线和中横线',
    customValidators: [
      async function (path, { id }) {
        const res = await apiConfigService.checkPath({ id, path })
        return res
      }
    ]
  },
  remark: { label: '备注', limit: 30 }
}))
