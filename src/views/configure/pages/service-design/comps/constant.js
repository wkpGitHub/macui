export const intervalOptions = [
  {
    label: '分',
    value: 'minute',
    children: [1, 2, 5, 10, 15, 20, 30].map(v => ({
      label: `每 ${v} 分`,
      value: `${v}minute`
    }))
  },
  {
    label: '时',
    value: 'hour',
    children: [1, 2, 3, 4, 6, 8, 12].map(v => ({
      label: `每 ${v} 时`,
      value: `${v}hour`
    }))
  },
  {
    label: '天',
    value: 'day',
    children: [1, 2, 3, 5, 10, 15].map(v => ({
      label: `每 ${v} 天`,
      value: `${v}day`
    }))
  },
  {
    label: '周',
    value: 'week',
    children: [1, 2, 3, 4, 5, 6, 7].map(v => ({
      label: `每周 ${v}`,
      value: `${v}week`
    }))
  }
]

export const weekOptions = [
  { label: '周一', value: 1 },
  { label: '周二', value: 2 },
  { label: '周三', value: 3 },
  { label: '周四', value: 4 },
  { label: '周五', value: 5 },
  { label: '周六', value: 6 },
  { label: '周日', value: 7 }
]

export const monthOptions = (new Array(31).fill(1)).map((v, index) => {
  return {
    label: `第${index + 1}日`,
    value: index + 1
  }
})

export const minuteOptions = (new Array(60).fill(1)).map((v, index) => {
  return (index + '').padStart(2, '0')
})

export const recordOpts = [
  { label: '新增记录前', value: 'beforeInsert' },
  { label: '新增记录后', value: 'afterInsert' },
  { label: '更新记录前', value: 'beforeUpdate' },
  { label: '更新记录后', value: 'afterUpdate' },
  { label: '删除记录前', value: 'beforeDelete' },
  { label: '删除记录后', value: 'afterDelete' }
]
