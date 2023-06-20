import { dbInfoEntityEntity } from '@/api/entity/chr'
import { dbInfoService, baseDicService } from '@/api/service/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig } from 'd-render'
import { keysToConfigMap } from '@d-render/shared'

export const searchFieldList = generateFieldList(defineSearchFieldConfig(keysToConfigMap([
  'name' /* 'host',  */
])), dbInfoEntityEntity)

export const tableColumns = generateFieldList(defineTableFieldConfig(keysToConfigMap([
  'name', 'dbType', 'username', 'url', 'remark', 'createTime'
].map(key => ({ key, showOverflowTooltip: true })))), dbInfoEntityEntity)

console.log('tableColumns', tableColumns)

export const formFieldList = generateFieldList(
  // 需要展示的数据库
  keysToConfigMap([
    'name', 'dbType', 'username', 'password', 'url', 'remark'
  ]),
  // 通用实体配置
  dbInfoEntityEntity,
  // 特殊配置
  defineFormFieldConfig({
    name: {
      dependOn: ['id'],
      validateExistRemote: async (value, { id }) => {
        // 本接口为是否可用校验，与实际需要的是否已创建校验相反故需要对结果取反
        const { data } = await dbInfoService.checkName({ name: value, id })
        return { data: !data }// dbInfoService.checkName({ name: value, id })
      }
    },
    dbType: {
      type: 'select',
      optionProps: { value: 'id', label: 'id' },
      otherKey: '_dbI',
      withObject: true,
      asyncOptions: async () => {
        const { data } = await baseDicService.dbType()
        return data
      }
    },
    url: {
      type: 'textarea',
      span: 2,
      dependOn: ['_dbI'],
      changeValue: ({ _dbI }) => {
        console.log('_dbI', _dbI)
        if (_dbI.url) {
          return { value: _dbI.url }
        }
      }
    },
    remark: {
      type: 'textarea', span: 2
    }
  }),
  // 必填配置
  keysToConfigMap(['name', 'dbType', 'username', 'password', 'url'].map(key => ({ key, required: true })))
)
