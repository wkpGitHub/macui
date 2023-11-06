import { dataFieldEntityEntity, dataInfoEntityEntity } from '@/api/entity/chr'
import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'
import { baseDicService } from '@/api'

export const formFieldList = generateFieldList(defineFormFieldConfig({
  title: { required: true, span: 6 },
  name: {
    required: true,
    label: '数据表名称',
    span: 6,
    regexpValidate: /^[a-zA-Z][0-9a-zA-Z]+$/,
    regexpValidateErrorMessage: '只能以字母开头，允许输入数字、字母'
  },
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

export const tableColumns = generateFieldList(defineFormFieldConfig({
  fields: {
    type: 'table',
    hideLabel: true,
    options: generateFieldList(defineTableFieldConfig({
      name: {
        label: '字段名称',
        writable: true,
        required: true,
        regexpValidate: /^[a-zA-Z][0-9a-zA-Z]+$/,
        regexpValidateErrorMessage: '只能以字母开头，允许输入数字、字母'
      },
      title: { label: '显示名称', writable: true },
      typeScope: {
        type: 'dataType2',
        width: 250,
        label: '类型',
        otherKey: 'refDataId',
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
      isPk: { align: 'center', type: 'tableRadio', writable: true, label: '主键', width: '60px' },
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
    }), dataFieldEntityEntity)
  }
}))
