import { safeBaseService } from '@/api/service/base/safe'
import { opOptions } from '@/components/custom-form-input/filter-condition/config'
import { defineTableFieldConfig, generateFieldList } from 'd-render'

export const fieldSelectTableColumns = generateFieldList(defineTableFieldConfig({
  isParam: {
    label: '设置为请求参数',
    writable: true,
    columnType: 'checkbox',
    type: 'singleCheckbox',
    option: { label: '', value: true },
    selectable () {
      return true
    }
  },
  isDisplay: {
    label: '设置为返回参数',
    writable: true,
    columnType: 'checkbox',
    type: 'singleCheckbox',
    option: { label: '', value: true },
    selectable () {
      return true
    }
  },
  name: { label: '字段名称' },
  typeName: { label: '字段类型' },
  remark: { label: '字段描述' }
}))

export const paramsTableEntity = {
  name: { label: '字段名称' },
  type: {
    label: '数据类型'
  },
  operator: {
    label: '比较符',
    writable: true,
    clearable: false,
    type: 'select',
    options: opOptions,
    description: <>
      当比较符为=时，如果传递的参数为数组[1,2,3]的形式则该比较符自动转为in
      <br />
      当比较符为between时，参数可以传递数组[1,2]; TO分割1TO2;逗号分隔1,2的方式传递
    </>,
    descriptionEffect: 'dark'
  },
  nullable: {
    label: '是否必填',
    writable: true,
    type: 'select',
    clearable: false,
    options: [
      {
        label: '是',
        value: false
      },
      {
        label: '否',
        value: true
      }
    ]
  },
  permissionRuleId: {
    label: '数据权限',
    writable: true,
    type: 'select',
    clearable: true,
    filterable: true,
    optionProps: {
      label: 'name',
      value: 'id'
    },
    async asyncOptions () {
      const { data } = await safeBaseService.rowList()
      return data || []
    }
  },
  defaultValue: {
    label: '默认测试值',
    description: '用于接口自检时使用',
    descriptionEffect: 'dark',
    writable: true
  },
  remark: { label: '参数说明', writable: true }
}

export const displaysTableColumns = generateFieldList(defineTableFieldConfig({
  name: { label: '字段名称' },
  typeName: { label: '字段类型' },
  markId: {
    label: '脱敏规则',
    writable: true,
    type: 'select',
    clearable: true,
    filterable: true,
    optionProps: {
      label: 'name',
      value: 'id'
    },
    async asyncOptions () {
      const { data } = await safeBaseService.maskList()
      return data || []
    }
  },
  example: { label: '示例值', writable: true },
  remark: { label: '参数说明', writable: true }
}))
