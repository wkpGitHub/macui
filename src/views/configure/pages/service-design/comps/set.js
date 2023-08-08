import { generateFieldList, defineFormFieldConfig } from 'd-render'
import { ElIcon } from 'element-plus'
import { MoreFilled } from '@element-plus/icons-vue'
// {
//   id: '',
//   type: 'set',
//   title: '设置变量',
//   conditions: {},
//   validateFailed: Boolean,
//   children: [],
//   source: '', // 变量值
//   targetName: '', // 变量名
//   dataType: '', // 变量类型 string|number|boolean|object|array 如果变量名是引用的 dataType不允许手动选择 禁用此下拉选择
//   dataTypeDisabled: Boolean // 如果变量名是引用的此处为true其他为false
// }
export default {
  category: '变量活动',
  type: 'set',
  title: '设置变量',
  formField: ({ showFx }) => generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    targetName: {
      label: '变量名',
      required: true,
      slots: {
        suffix: () => <ElIcon style="cursor: pointer" onClick={() => showFx({ label: 'targetName', dataType: 'dataType', value: 'source' })}><MoreFilled /></ElIcon>
      }
    },
    dataType: {
      label: '变量类型',
      required: true,
      type: 'select',
      options: [
        {
          label: '文本',
          value: 'string'
        },
        {
          label: '数字',
          value: 'number'
        },
        {
          label: '布尔',
          value: 'boolean'
        },
        {
          label: '对象',
          value: 'object'
        },
        {
          label: '数组',
          value: 'array'
        }
      ]
    },
    source: {
      label: '变量值', description: `手动录入静态值时，如果变量类型为对象或者数组，需要以JSON字符串的形式录入。
    例如：
    对象类型：可以输入{"key1": "val1", "key2": "val2"}，{key1: "val1", key2: "val2"} 将不能正确解析为对象；
    数组类型：可以输入["val1", "val2"]或[{"key":"val1"},{"key":"val2"}]`
    }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'set',
    title: '设置变量',
    conditions: {},
    children: []
  }
}
