import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'
// {
//   id: '',
//   type: 'mapping',
//   title: '数据映射',
//
//   validateFailed: Boolean,
//   children: [],
//   source: '',
//   sourceType: '',
//   objectKey: '',
//   mappingType: '',
//   staticMapping: [{key: '', value: ''}],
//   targetName: '',  // 暂时不知道干什么的 猜测是节点出参
// }

export default {
  category: '变量活动',
  type: 'mapping',
  title: '数据映射',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    source: {
      label: '数据来源',
      required: true
    },
    sourceType: {
      type: 'select',
      label: '数据类型',
      options: [
        { label: '字符串', value: 'primitive' },
        { label: '数组', value: 'array' },
        { label: '对象数组', value: 'array-object' }
      ]
    },
    objectKey: {
      label: '对象中的Key',
      required: true,
      readable: false,
      dependOn: ['sourceType'],
      changeConfig (config, { sourceType }) {
        config.writable = sourceType === 'array-object'
        return config
      }
    },
    mappingType: {
      type: 'select',
      label: '映射为',
      options: [
        { label: '静态值', value: 'static' },
        { label: '部门名称', value: 'department' },
        { label: '用户名', value: 'username' },
        { label: '邮箱', value: 'email' }
      ]
    },
    staticMapping: {
      label: '静态映射',
      type: 'table',
      required: true,
      readable: false,
      dependOn: ['mappingType'],
      changeConfig (config, { mappingType }) {
        config.writable = mappingType === 'static'
        return config
      },
      options: generateFieldList(defineTableFieldConfig({
        key: { label: '键', placeholder: '键', writable: true },
        value: { label: '值', placeholder: '值', writable: true }
      }))
    }
    // targetName: { label: '节点出参' }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'mapping',
    title: '数据映射',

    children: []
  }
}
