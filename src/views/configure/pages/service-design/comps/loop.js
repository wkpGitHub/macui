import { generateFieldList, defineFormFieldConfig } from 'd-render'

// {
//   id: '' 唯一id
//   type: '' 节点类型
//   title: '' 节点标题
//   conditions: '' 条件
//   validateFailed: '' form是否通过验证
//   children: '' 子节点
//   loopName: '' 循环数组
//   loopItemName: '' 循环变量
//   loopIndexName: '' 循环下标名
//   firstIndex: '' 起始下标
//   lastIndex: '' 最大下标
// }
export default {
  category: '逻辑控制',
  type: 'loop',
  title: '循环',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题', defaultValue: '循环' },
    loopName: { label: '循环数组', required: true, type: 'setFx' },
    loopItemName: { label: '循环变量', placeholder: '循环的时候使用的字段名，默认使用_item' },
    loopIndexName: { label: '循环下标名', placeholder: '循环的时候使用的下标名，默认使用_index' },
    firstIndex: { label: '起始下标' },
    lastIndex: { label: '最大下标' }
  })),
  initData: {
    id: '', // 不重复 前端生成 建议使用 uuid
    type: 'loop',
    title: '循环',

    validateFailed: true, // fornField是否通过验证
    children: []
  }
}
