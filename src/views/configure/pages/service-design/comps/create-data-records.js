import { generateFieldList, defineFormFieldConfig } from 'd-render'
import { cloneDeep } from 'lodash-es'
// {
//   id: '' 唯一id
//   type: '' 节点类型
//   title: '' 节点标题
//   conditions: '' 条件
//   validateFailed: '' form是否通过验证
//   children: '' 子节点
//   targetName:''
//   otherKey:''指定节点
//   fields:[
//    {
//      id: '' 唯一id,
//      fid:''
//      label:''
//      type:''
//      name:''
//      isNullable:''
//      tag:''
//      typeLabel
//    }
//    ]
// }
export default {
  category: '实体活动',
  type: 'create-data-records',
  title: '新增记录',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    objectKey: {
      label: '数据源',
      required: true,
      otherKey: 'fields',
      type: 'dataSource'
    },
    dataMode: {
      label: '新增模式',
      required: true,
      type: 'radio',
      defaultValue: 'single',
      options: [
        { label: '新增一条记录', value: 'single' },
        { label: '新增多条记录', value: 'multi' }
      ]
    },
    targetName: { label: '节点出参' },
    relationFields: {
      hideItem: true,
      defaultValue: []
    },
    mFields: {
      hideItem: true,
      defaultValue: []
    },
    rFields: {
      hideItem: true,
      defaultValue: []
    },
    initFields: {
      type: 'selectField',
      label: '字段赋值',
      readable: false,
      dependOn: ['fields'],
      changeConfig (config, { fields }) {
        config.writable = !!fields
        return config
      },
      async asyncOptions ({ fields }) {
        const temp = (fields || []).filter(v => !v.isPrimaryKey)
        return cloneDeep(temp)
      }
    },
    fieldLabel: {
      dependOn: ['objectKey'],
      hideItem: true,
      changeValue ({ objectKey }) {
        if (!objectKey) return
        return { value: objectKey.split(':')[1] }
      }
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'create-data-records',
    title: '新增记录',
    conditions: {},
    children: [],
    validateFailed: false
  }
}
