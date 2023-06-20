
// 字段校验规则
export const validateRuleEntityEntity = {
  id: { type: String, _renderConfig: { label: '主键' } },
  name: { type: String, _renderConfig: { label: '名称' } },
  regex: { type: String, _renderConfig: { label: '正则表达式' } },
  remark: { type: String, _renderConfig: { label: '描述' } }
}
