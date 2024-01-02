import { dataFieldEntityEntity, dataInfoEntityEntity } from '@lc/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'
import { baseDicService } from '@lc/api'
import { v4 as uuid } from 'uuid'

export const formFieldList = generateFieldList(defineFormFieldConfig({
  _layout: {
    type: 'classifyLayout',
    span: 24,
    options: [
      {
        children: generateFieldList(defineFormFieldConfig({
          name: { required: true, span: 6 },
          tableName: { required: true, label: '数据表名称', span: 6 },
          idStrategy: {
            required: true,
            type: 'select',
            span: 6,
            optionProps: { label: 'name' },
            asyncOptions: async () => {
              const { data } = await baseDicService.idStrategy()
              return data
            }
          },
          titleTpl: { span: 6 },
          _systemAttrs: {
            label: '系统属性',
            span: 6,
            type: 'compositionCheckbox',
            otherKey: ['saveOperator', 'saveTimestamp', 'logicDelete', 'isTree'],
            option: {
              saveOperator: '记录操作人',
              saveTimestamp: '记录时间',
              logicDelete: '是否逻辑删除',
              isTree: '树形结构'
            }
          },
          remark: { span: 6, type: 'textarea', autosize: { minRows: 6, maxRows: 6 } }
        }), dataInfoEntityEntity)
      },
      {
        children: generateFieldList(defineFormFieldConfig({
          fields: {
            span: 24,
            type: 'tableForm',
            tableColumnStatus: 'writable',
            height: '300px',
            size: 'small',
            required: true,
            hideIndex: true,
            defaultValue: [{}],
            createInitValue: () => ({
              name: `property${uuid().substr(0, 6)}`
            }),
            dependOn: ['dbId'],
            options: generateFieldList(defineTableFieldConfig({
              isPk: { align: 'center', type: 'tableRadio', writable: true, label: '主键', width: '60px' },
              name: { label: '字段名称', writable: true },
              title: { label: '显示名称', writable: true },
              typeScope: {
                type: 'dataType',
                label: '类型',
                outDependOn: ['dbId'],
                otherKey: [
                  'typeName', // 基础类型
                  'refDataId',
                  'refDataName'
                ],
                writable: true
              }, // 此处需要一个自定义组件来处理
              length: {
                writable: true,
                step: 1,
                min: 1
              },
              scale: {
                step: 1,
                min: 0,
                writable: true
              },
              nullable: {
                align: 'center',
                type: 'singleCheckbox',
                option: { value: true, label: '' },
                writable: true,
                dependOn: ['isPk'],
                width: '92px',
                changeValue: ({ isPk }) => {
                  if (isPk) {
                    return { value: false }
                  }
                },
                changeConfig: (config, { isPk }) => {
                  config.disabled = isPk
                  return config
                }
              },
              isUnique: {
                align: 'center',
                type: 'singleCheckbox',
                option: { value: true, label: '' },
                writable: true,
                width: '92px',
                dependOn: ['isPk'],
                changeValue: ({ isPk }) => {
                  if (isPk) {
                    return { value: true }
                  }
                },
                changeConfig: (config, { isPk }) => {
                  config.disabled = isPk
                  return config
                }
              }
            }), dataFieldEntityEntity),
            formFieldList: generateFieldList(defineFormFieldConfig({
              name: { label: '字段名称', span: 6 },
              title: { label: '显示名称', span: 6 },
              typeScope: {
                type: 'dataType',
                otherKey: [
                  'typeName', // 基础类型
                  'refDataId',
                  'refDataName'
                ],
                dependOn: ['dbId'],
                span: 6
              }, // 此处需要一个自定义组件来处理
              defaultValue: {
                span: 6
              }, // 默认值
              _configuresAttrs: {
                span: 6,
                type: 'compositionCheckbox',
                label: '其他配置',
                otherKey: ['editable', 'multiable'],
                option: {
                  editable: '是否可编辑',
                  multiable: '允许多选'
                }
              }
            }), dataFieldEntityEntity)
          }
        }), dataInfoEntityEntity)
      }
    ]
  }
}))
