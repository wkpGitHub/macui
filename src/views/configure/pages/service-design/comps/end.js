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
  formField: generateFieldList(defineFormFieldConfig({
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
      resetValue: true,
      changeConfig (config, { outputType }) {
        config.writable = outputType === 'global'
        config.readable = outputType === 'global'
        return config
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
        key: { label: '键', writable: true },
        value: { label: '值', writable: true }
      }))
    },
    outputPreview: {
      type: 'codemirrorInput',
      label: '预览',
      resetValue: true,
      dependOn: ['output', 'outputParams'],
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
      changeValue ({ output, outputParams }) {
        const val = {
          status: 0,
          msg: '',
          data: ''
        }
        if (output) {
          val.data = output
        }
        if (outputParams) {
          val.data = Object.fromEntries(outputParams.map(v => [v.key, v.value]))
        }
        return {
          value: JSON.stringify(val, null, 2)
        }
      }
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
