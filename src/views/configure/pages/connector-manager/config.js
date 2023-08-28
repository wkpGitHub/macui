import { baseDicService } from '@/api'
import { connectorEntity } from '@/api/entity/chr'
import {
  generateFieldList,
  defineFormFieldConfig,
  defineTableFieldConfig,
  defineSearchFieldConfig
} from 'd-render'

export const searchFieldList = generateFieldList(defineSearchFieldConfig({
  name: {},
  type: {}
}), connectorEntity)
export const tableColumns = generateFieldList(defineTableFieldConfig({
  name: {},
  type: {}
}), connectorEntity)

const httpDependOn = {
  dependOn: ['type'],
  readable: false,
  changeConfig (config, { type }) {
    config.readable = type === 'http'
    config.writable = type === 'http'
    return config
  }
}

const emailDependOn = {
  dependOn: ['type'],
  readable: false,
  changeConfig (config, { type }) {
    config.readable = type === 'email'
    config.writable = type === 'email'
    return config
  }
}

export const formFieldList = generateFieldList(defineFormFieldConfig({
  staticInfo: {
    type: 'staticInfo',
    staticInfo: '基本信息',
    fontWeight: 'bold',
    span: 24
  },
  divider: { type: 'divider', span: 24 },
  name: { required: true, span: 24 },
  type: { required: true, span: 24 },
  staticInfo1: {
    dependOn: ['type'],
    readable: false,
    changeConfig (config, { type }) {
      config.readable = !!type
      config.writable = !!type
      return config
    },
    fontWeight: 'bold',
    type: 'staticInfo',
    staticInfo: '环境配置',
    span: 24
  },
  divider1: {
    dependOn: ['type'],
    readable: false,
    changeConfig (config, { type }) {
      config.readable = !!type
      config.writable = !!type
      return config
    },
    type: 'divider',
    span: 24
  },
  'env.host': {
    dependOn: ['type'],
    readable: false,
    changeConfig (config, { type }) {
      config.readable = !!type
      config.writable = !!type

      switch (type) {
        case 'http':
          config.label = '主机地址'
          config.span = 24
          break
        case 'email':
          config.label = '域名服务器'
          config.span = 20
          break
        default:
          break
      }

      return config
    },
    required: true,
    label: '主机地址'

  },
  /** http环境配置 */
  'env.props': {
    ...httpDependOn,
    label: '属性配置',
    type: 'table',
    tableColumnStatus: 'writable',
    options: generateFieldList(defineTableFieldConfig({
      name: {
        label: '英文名称',
        required: true,
        regexpValidate: /^[0-9|a-z|A-Z|_]+$/,
        regexpValidateErrorMessage: '英文名称由英文字母、数字、下划线组成'
      },
      title: {
        label: '字段显示名称',
        width: '130px',
        required: true
      },
      dataType: {
        required: true,
        label: '字段类型',
        type: 'select',
        optionProps: {
          value: 'id',
          label: 'name'
        },
        async asyncOptions () {
          const { data } = await baseDicService.basicType()
          return data || []
        }
      },
      value: {
        label: '值',
        required: true
      }
    })),
    span: 24
  },
  /** email环境配置 */
  'env.port': {
    label: '端口号',
    required: true,
    type: 'number',
    min: 0,
    max: 65535,
    span: 4,
    ...emailDependOn
  },
  'env.username': {
    required: true,
    label: '用户名',
    span: 24,
    ...emailDependOn
  },
  'env.password': {
    ...emailDependOn,
    required: true,
    label: '密码',
    type: 'password',
    span: 24
  }
}), connectorEntity)
