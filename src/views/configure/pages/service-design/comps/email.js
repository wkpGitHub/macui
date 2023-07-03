import { generateFieldList, defineFormFieldConfig } from 'd-render'

// {
//   "id": "0976f1d45c8c",
//   "type": "email",
//   "title": "发送邮件",
//   "conditions": {},
//   "validateFailed": false,
//   "children": [],
//   "to": [ // 收件人 -必填
//       "李四",
//       "王五"
//   ],
//   "subject": "标题111", // 邮件标题
//   "body": "<p fr-original-style=\"\" style=\"margin: 0px 0px 10px; box-sizing: inherit;\">内容222222</p>", // 邮件内容
//   "from": "张三", // 发件人
//   "bcc": [    // 抄送
//       "赵六",
//       "七七"
//   ]
// }

export default {
  category: '反馈与消息',
  type: 'email',
  title: '发送邮件',
  formField: generateFieldList(defineFormFieldConfig({
    title: { label: '节点标题' },
    from: { label: '发件人' },
    to: { label: '收件人', required: true },
    bcc: { label: '抄送' },
    subject: { label: '邮件标题', required: true },
    body: {
      label: '邮件内容',
      required: true
    }
  })),
  initData: {
    id: '0976f1d45c8c',
    type: 'email',
    title: '发送邮件',
    conditions: {},
    validateFailed: true,
    children: [],
    to: []
  }
}
