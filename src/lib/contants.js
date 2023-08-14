export const dataTypeOpts = [
  {
    label: 'Boolean布尔值',
    value: 'BOOLEAN'
  },
  {
    label: 'Integer 整数',
    value: 'INT'
  },
  {
    label: 'Long 长整数',
    value: 'BIGINT'
  },
  {
    label: 'Double 小数',
    value: 'DOUBLE'
  },
  {
    label: 'Decimal 精度小数',
    value: 'DECIMAL'
  },
  {
    label: 'String 字符串',
    value: 'STRING'
  },
  {
    label: 'Text 长文本',
    value: 'TEXT'
  },
  {
    label: 'Binary 二进制流',
    value: 'BINARY'
  },
  {
    label: 'Date 日期',
    value: 'DATE'
  },
  {
    label: 'Time 时间',
    value: 'TIME'
  },
  {
    label: 'DateTime 日期时间',
    value: 'DATETIME'
  },
  {
    label: '用户',
    value: 'USER'
  },
  {
    label: '部门',
    value: 'DEPT'
  },
  {
    label: 'Email 电子邮件',
    value: 'EMAIL'
  },
  {
    label: '(地理)经度',
    value: 'LATITUDE'
  },
  {
    label: '(地理)纬度',
    value: 'LONGITUDE'
  }
]

export const dateTypeMap = dataTypeOpts.reduce((total, current) => {
  total[current.value] = current
  return total
}, {})
