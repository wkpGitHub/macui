import { generateFieldList, defineFormFieldConfig, defineTableFieldConfig } from 'd-render'

// {
//   id: '',
//   type: '',
//   title: '',
//   conditions: {},
//   children: [],
//   outputType: '', // global|numbers
//   output: '', // outputType === global 显示
//   outputParams: [{ key: '', value: '' }], // outputType === numbers 显示
//   outputPreview: {
//     status: 0,
//     msg: '',
//     data: '' // output存在时 等于 output；outputParams存在时为对象{ key: value } key就是outputParams中的key字段 value为value字段
//   }
// }

export default {
  type: 'end',
  title: '结束',
  formField: ({ parentState }) => generateFieldList(defineFormFieldConfig({
    outputType: {
      label: '',
      type: 'radio',
      defaultValue: 'global',
      options: [
        { label: '出参赋值', value: 'global' },
        { label: '出参成员赋值', value: 'numbers' }
      ]
    },
    output: {
      dependOn: ['outputType'],
      type: 'setFx',
      otherKey: ['outputStr'],
      changeConfig (config, { outputType }) {
        config.writable = outputType === 'global'
        config.readable = outputType === 'global'
        return config
      },
      onConfirm ({ children }) {
        if (children?.length) {
          parentState.selectNode.config.fields = children.map(item => ({
            title: item.label,
            name: item.value.split('.').at(-1),
            dataType: item.dataType
          }))
        }
      }
    },
    outputParams: {
      type: 'table',
      readable: false,
      dependOn: ['outputType'],
      resetValue: true,
      changeConfig (config, { outputType }) {
        config.writable = outputType === 'numbers'
        return config
      },
      options: generateFieldList(defineTableFieldConfig({
        title: { label: '键', writable: true },
        name: { label: '值', writable: true, type: 'fx', parentState }
      }))
    },
    outputPreview: {
      type: 'codemirrorInput',
      label: '预览',
      readonly: 'nocursor',
      resetValue: true,
      dependOn: ['outputStr', 'outputParams', 'outputType'],
      mode: 'json',
      defaultValue: JSON.stringify(
        {
          status: 0,
          msg: '',
          data: ''
        },
        null,
        2
      ),

      changeValue ({ outputStr, outputParams, outputType }) {
        const val = {
          status: 0,
          msg: '',
          data: ''
        }
        if (outputType === 'global') {
          val.data = outputStr || ''
        } else {
          try {
            val.data = Object.fromEntries(outputParams.map(v => [v.key, v.value]))
          } catch (err) {
            val.data = {}
          }
        }
        return {
          value: JSON.stringify(val, null, 2)
        }
      }
    },
    fields: {
      label: '字段描述',
      type: 'field-table'
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'end',
    title: '结束',
    conditions: {},
    children: []
  }
}
