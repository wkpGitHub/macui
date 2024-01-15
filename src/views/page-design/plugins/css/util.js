import { DRender, generateFieldList } from 'd-render'

const dRender = new DRender()
export const getComponentCssConfigure = async (val, type) => {
  const {
    cssConfigure = {
      __collapse1: {
        type: 'collapse',
        options: [
          {
            title: '基础样式',
            children: generateFieldList({
              width: {
                label: '宽度',
                type: 'set-css-value'
              },
              height: {
                label: '高度',
                type: 'set-css-value'
              },
              padding: {
                label: '内边距',
                type: 'set-css-value',
                otherKey: ['padding-top', 'padding-bottom', 'padding-left', 'padding-right']
              },
              margin: {
                label: '外边距',
                type: 'set-css-value',
                otherKey: ['margin-top', 'margin-bottom', 'margin-left', 'margin-right']
              },
              border: {
                label: '描边',
                type: 'css-border',
                otherKey: ['border-top', 'border-bottom', 'border-left', 'border-right']
              },
              borderRadius: {
                label: '圆角',
                type: 'set-css-value'
              },
              overflow: {
                label: '溢出显示方式',
                size: 'small',
                type: 'select',
                options: [
                  { label: '可见', value: 'visible' },
                  { label: '隐藏', value: 'hidden' },
                  { label: '滚动条', value: 'auto' }
                ]
              },
              boxSizing: {
                label: '盒模型',
                size: 'small',
                type: 'select',
                options: [
                  { label: 'IE 盒模型', value: 'border-box' },
                  { label: '标准盒模型', value: 'content-box' }
                ]
              },
              background: {
                label: '背景',
                type: 'css-background'
              },
              'background-position': {
                label: '背景图位置',
                type: 'background-props',
                placeholders: ['左边距', '上边距'],
                options: [
                  { label: '靠上', value: 'top' },
                  { label: '靠下', value: 'bottom' },
                  { label: '靠左', value: 'left' },
                  { label: '靠右', value: 'right' },
                  { label: '居中', value: 'center' }
                ]
              },
              'background-repeat': {
                label: '背景图重复方式',
                size: 'small',
                type: 'select',
                options: [
                  { label: '不重复', value: 'no-repeat' },
                  { label: '重复', value: 'repeat' },
                  { label: 'x重复', value: 'repeat-x' },
                  { label: 'y重复', value: 'repeat-y' }
                ]
              },
              'background-size': {
                label: '背景图大小',
                type: 'background-props',
                options: [
                  { label: '覆盖', value: 'cover' },
                  { label: '包含', value: 'contain' }
                ]
              }
            })
          }
        ]
      },
      __collapse2: {
        type: 'collapse',
        options: [
          {
            title: '布局方式',
            children: generateFieldList({
              display: {
                label: '展示方式',
                type: 'css-display',
                otherKey: ['justify-content', 'align-items']
              },
              'flex-direction': {
                label: '排列方向',
                size: 'small',
                type: 'select',
                dependOn: ['display'],
                readable: false,
                options: [
                  { label: '横向', value: 'row' },
                  { label: '纵向', value: 'column' },
                  { label: '横向反向', value: 'row-reverse' },
                  { label: '纵向反向', value: 'column-reverse' }
                ],
                changeConfig (config, { display }) {
                  if (display === 'flex') {
                    config.writable = true
                    config.readable = true
                  }
                  return config
                }
              },
              'flex-wrap': {
                label: '换行',
                size: 'small',
                type: 'select',
                dependOn: ['display'],
                readable: false,
                options: [
                  { label: '横向', value: 'row' },
                  { label: '换行', value: 'wrap' },
                  { label: '换行反向', value: 'wrap-reverse' }
                ],
                changeConfig (config, { display }) {
                  if (display === 'flex') {
                    config.writable = true
                    config.readable = true
                  }
                  return config
                }
              },
              gap: {
                label: '间距',
                type: 'css-gap',
                dependOn: ['display'],
                readable: false,
                changeConfig (config, { display }) {
                  if (display === 'flex') {
                    config.writable = true
                    config.readable = true
                  }
                  return config
                }
              },
              flex: {
                label: '弹性元素空间',
                size: 'small',
                type: 'select',
                options: [
                  { label: '不可伸缩', value: 'none' },
                  { label: '自适应', value: 'auto' }
                ]
              }
            })
          }
        ]
      },
      __collapse3: {
        type: 'collapse',
        options: [
          {
            title: '字体',
            children: generateFieldList({
              'font-size': {
                label: '字体大小',
                type: 'set-css-value'
              },
              color: {
                label: '字体颜色',
                size: 'small',
                type: 'color'
              },
              'font-weight': {
                label: '字体粗细',
                type: 'radio',
                size: 'small',
                isButton: true,
                options: [
                  { label: '常规', value: 'normal' },
                  { label: '加粗', value: 'bold' }
                ]
              }
            })
          }
        ]
      },
      __collapse4: {
        type: 'collapse',
        options: [
          {
            title: '定位',
            children: generateFieldList({
              position: {
                label: '类型',
                type: 'css-position',
                mainType: 'radio',
                otherKey: ['top', 'bottom', 'left', 'right']
              }
            })
          }
        ]
      }
    }
  } = await dRender.componentDictionary[val]('/configure')()
  return type === 'css' ? cssConfigure : {}
}
