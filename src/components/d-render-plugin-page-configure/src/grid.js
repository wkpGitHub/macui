import { generateFieldList } from 'd-render'
export default {
  gap: {
    label: '列间隙',
    type: 'css-gap'
  },
  direction: {
    label: '排列方向',
    size: 'small',
    type: 'select',
    options: [
      { label: '横向', value: 'row' },
      { label: '纵向', value: 'column' },
      { label: '横向反向', value: 'row-reverse' },
      { label: '纵向反向', value: 'column-reverse' }
    ]
  },
  options: {
    label: '列配置',
    type: 'table',
    hideIndex: true,
    options: generateFieldList({
      flexBasis: { label: '空间占比', type: 'set-css-value', writable: true },
      children: { realArray: true, defaultValue: [], width: '0px', writable: true }
    })
  }
  // options: {
  //   label: '列配置',
  //   type: 'simpleCurd',
  //   infoRender: (h, { item }) => h(ElInputNumber, {
  //     modelValue: item.flexBasic,
  //     'onUpdate:modelValue': (val) => {
  //       item.flexBasic = val
  //     }
  //   }, {}),
  //   itemType: 'col',
  //   itemKey: '$index',
  //   dialogProps: {
  //     size: 'small'
  //   },
  //   formProps: {
  //     fieldList: generateFieldList({
  //       flexBasic: { type: 'set-css-value' },
  //       children: { type: 'select', realArray: true, defaultValue: [], hideItem: true }
  //     })
  //   }
  // }
}
